const { verifyToken } = require('../helpers/jwt');
const { User } = require('../models/index');

const verifyMiddleware = async (req, res, next) => {
  try {
    const { id, token } = req.params;
    const payload = verifyToken(token);
    if (!payload) {
      throw { name: 'invalidtoken' };
    }
    const response = await User.findOne({
      where: { id, email: payload.email },
    });
    if (!response) {
      throw { name: 'notauthenticated' };
    }
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = verifyMiddleware;
