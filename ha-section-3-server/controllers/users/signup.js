const { user } = require('../../models');
const { generateAccessToken, sendAccessToken } = require('../tokenFunctions');

module.exports = (req, res) => {
  // TODO: 회원가입 및 사용자 생성 로직을 작성하세요.
  const {username,email,password,mobile} = req.body;
  if (!username || !email || !password || !mobile) {

    return res.status(422).send("insufficient parameters supplied");
  }

  user.findOrCreate({
    where: {
      email
    },
    default: {
      email,
      password,
      username,
      mobile
    }
  })
  .then(([newuser, created]) => {
    delete newuser.dataValues.password;
    if (created) {
      const newAccessToken = generateAccessToken(newuser.dataValues);
      sendAccessToken(res,newAccessToken);
      res.status(201).send({message: 'ok'});
    } else {
      res.status(409).send("email exists");
    }
  });
};
