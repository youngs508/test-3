const { user } = require('../../models');
const { isAuthorized } = require('../tokenFunctions');

module.exports = (req, res) => {

  // TODO: 로그인 여부를 판단하고, Access token payload를 이용하여 응답을 제공하세요.
  let accessTokenData = isAuthorized(req);
  
  if (!accessTokenData) {

    return res.json({ data: null, message: "not authorized" });
  }
  
  let userInfo = {
    id: accessTokenData.id,
    email: accessTokenData.email,
    username: accessTokenData.username,
    mobile: accessTokenData.mobile,
    createdAt: accessTokenData.createdAt,
    updatedAt: accessTokenData.updatedAt
  }
  
  res.status(200).send({ data: { userInfo: userInfo } });
};
