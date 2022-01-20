const { comparePassword} = require('../../helpers/bcrypt')
const { signToken, signPasswordLink } = require('../../helpers/jwt')
const {User} = require('../../models')
const {transporter, mailOtp, resetPasswordMail} = require('../../helpers/nodemailer')
const redis = require('../config/redis')
export class AuthController {
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
                throw('invalidlogin')
            }
        } 
        catch (err) {
            next(err)
        }
    }

    static async registerUser(req, res, next){
        try {
            const {username, email, password, phoneNumber, fullName} = req.body
            const {role} = "User"
            const {status} = "Active"
            const response = User.create({username, email, password, phoneNumber, fullName, role, status})
            const OTP = String(Math.floor(Math.random() * 999999));
            transporter.sendMail(mailOtp(response.email, OTP), async (error) => {
              try {
                if(error){
                  throw {
                    name: 'errorsendmail',
                  };
                } else{
                  const otpToken = jwtSign({
                    id: response.id,
                    email: response.email,
                  });
                  await redis.set(`${response.id}`, OTP, 'ex', 120);
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
        const {verified_at} = date.slice(0, 10)
        const response = await User.update(
          { verified_at,
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
          let link = `http://${url}/${response.id}/${token}`
        //   send this by email
          transporter.sendMail(resetPasswordMail(response.email, link), (err) => {
            if(err){
              throw {
                name: 'errorsendmail',
              }
            } else{
              console.log(`email sent to ${response.email}`)
              res.status(201).json({ 
                message: 'A link has been sent to your email'
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
