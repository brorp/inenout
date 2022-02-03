const {User, Subscriber} = require('../../models/index')

class UserController {
    static async getUserInfo(req,res,next){
      try {
        const response = await User.findByPk(req.user.id)
        if(!response){
          throw {msg: "usernotfound"}
        }
        res.status(200).json(response)
      } catch (err) {
        next(err)
      }
    }

    static async updateProfile(req, res, next){
      try {
        const {username, email, phoneNumber, fullName, profilePic} = req.body
        await User.update({username, email, phoneNumber, fullName, profilePic},{where: {id: req.user.id}})
        res.status(201).json({message: 'Profil berhasil diubah'})
      } catch (err) {
        next(err)
      }
    }

    static async userChangePassword(req, res, next){
        try {
          const { id } = req.user.id;
          const { oldPassword, password, confirmPassword } = req.body;
          const response = await User.findOne({where: {id}})
          if(!req.body){
            throw {
              name: 'passwordnotfound'
            }
          }
          if(comparePassword(oldPassword, response.password)){
            if (password !== confirmPassword) {
              throw {
                name: "passwordnotmatch"
              };
            };
            let params = { password: getSalt(password) }
            await User.update(params, {
              where: { id },
            });
            res.status(200).json({ 
              message: 'Password anda berhasil diubah'
            });
          } else {
            throw {
              name: 'invaliduser'
            }
          }
        } catch (error) {
          next(error);
        };
    };

    static async createSubscription(req, res, next){
        try {
            const {email} = req.body
            const response = await Subscriber.create({email})
            if(!response){
              throw {msg: 'alreadysubscribed'}
            }
            res.status(201).json({message: 'Terima kasih telah berlangganan newsletter dari InEnOut'})
        } catch (err) {
            next(err)
        }
    }
};

module.exports = UserController