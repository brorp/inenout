const {User} = require('../../models')

export class UserController {
    static async getUserInfo(req,res,next){
      try {
        const response = User.findByPk(req.user.id)
        res.status(200).json(response)
      } catch (err) {
        next(err)
      }
    }

    static async updateProfile(req, res, next){
      try {
        const {username, email, phoneNumber, fullName, profilePic} = req.body
        User.update({username, email, phoneNumber, fullName, profilePic},{where: {id: req.user.id}})
        res.status(201).json({msg: 'Profil berhasil diubah'})
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
              name: 'passowrdnotfound'
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
              message: 'Password changed.'
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
            User.update({isSubscribed: true},{where: {email}})
            res.status(201).json({msg: 'Terima kasih telah berlangganan newsletter dari InEnOut'})
        } catch (err) {
            next(err)
        }
    }
};
