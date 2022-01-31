const { comparePassword } = require('../../helpers/bcrypt')
const { signToken, signPasswordLink } = require('../../helpers/jwt')
const { getSalt } = require('../../helpers/bcrypt')
const {User} = require('../../models/index')
const {transporter, mailOtp, resetPasswordMail} = require('../../helpers/nodemailer')
const { getRedis } = require('../../config/redis')
const { makeCode } = require('../../helpers/uniqueCode')
class AuthController {
    static async userLogin (req,res,next){
        try {
            const {email, password} = req.body
            let response = await User.findOne({
                where: {email, status: 'Active'}
            })
            if(response && comparePassword(password, response.password)){
                const access_token = signToken({
                    id: response.id,
                    email: response.email
                })
                res.status(200).json({
                    message: `Welcome back ${response.email} !`,
                    access_token: access_token
                })
            }
            else{
                throw({name: 'invalidlogin'})
            }
        } 
        catch (err) {
            next(err)
        }
    }

    static async registerUser(req, res, next){
        try {
            const {username, email, password, phoneNumber, fullName} = req.body
            const {status} = "Active"
            const response = await User.create({username, email, password, phoneNumber, fullName, status})
            const OTP = makeCode(6);
            transporter.sendMail(mailOtp(response.email, OTP), async (error) => {
              try {
                if(error){
                  await User.destroy({where: {id: response.id}})
                  throw {
                    name: 'errorsendmail',
                  };
                } else{
                  const otpToken = signToken({
                    id: response.id,
                    email: response.email,
                  });
                  await getRedis().set(`${response.id}`, OTP, 'ex', 120);
                  res.status(201).json({
                    message: `OTP dikirim ke ${response.email}.`,
                    id: response.id,
                    token: otpToken,
                  });
                };
              } catch (error) {
                next(error);
              };
            });
        } catch (err) {
            next(err)
        }
    }

    static async resendOtp(req, res, next){
      try {
        const response = await User.findByPk(req.params.id)
        await getRedis().del(`${response.id}`);
        const OTP = makeCode(6)
        transporter.sendMail(mailOtp(response.email, OTP), async (error) => {
          try {
            if(error){
              throw {
                name: 'errorsendmail',
              };
            } else{
              await getRedis().set(`${response.id}`, OTP, 'ex', 120);
              res.status(201).json({
                message: `OTP dikirim ke ${response.email}.`,
                id: response.id,
                token: otpToken,
              });
            };
          } catch (error) {
            next(error);
          };
        });
      } catch (err) {
        next(err)
      }
    }

    static async verifyUser(req, res, next) {
      //ambil otp dan email dari redis
      try {
        const { otp } = req.body;
        const redisOtp = await getRedis().get(`${req.params.id}`);
        if (redisOtp !== otp) {
          throw { name: 'invalidotp' };
        }
  
        const { id } = req.params;
        let date = new Date ().toISOString()
        const verified_at = date.slice(0, 10)
        const response = await User.update(
          { verified_at: verified_at,
            status: 'Active' },
          { where: { id } },
        );
        if (!response) {
          throw { name: 'notauthenticated' };
        }
        res.status(200).json({
          message:
            'Registrasi Berhasil! Mohon login',
        });
      } catch (error) {
        next(error);
      }
    }

    static async forgotPassword(req, res, next){
        try {
          const { email, url } = req.body;
          const response = await User.findOne({ where: { email } });
          if(!email) {
            throw { name: 'mailnotfound' }
          }
          if(!response){
            throw { name: 'usernotfound'}
          }
          const payload = {
              id: response.id,
              email: response.email,
              password: response.password,
          };
          const token = signPasswordLink(payload, response.password);
          let link = `https://${url}/${response.id}/${token}`
        //   send this by email
          transporter.sendMail(resetPasswordMail(response.email, link), (err) => {
            if(err){
              throw {
                name: 'errorsendmail',
              }
            } else{
              console.log(`email sent to ${response.email}`)
              res.status(201).json({ 
                message: 'Link untuk mengubah password sudah dikirim melalui email anda'
              })
            }
          })
        } catch (err) {
          next(err)
        } 
    }
  
    static async resetPassword(req, res, next){
      try {
        const { id } = req.params
        const { password, password2 } = req.body
        if(!req.body){
          throw {name: 'passwordnotfound'}
        }
        if(password !== password2){
          throw {name: "passwordnotmatch"}
        }
        let params = { password: getSalt(password) }
        await User.update(params, {
          where: { id }
        })
        res.status(201).json({ 
          message: 'Kata sandi berhasil diubah, mohon login kembali'
        })
      } catch (err) {
        next(err)
      }
    }
}

module.exports = AuthController