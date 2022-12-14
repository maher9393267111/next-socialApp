const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      return res.status(401).send(`No Authorization`);
    }
   // const { Authorization } = req.headers;
   // const token = Authorization.slice(7, Authorization.length);
  const token = req.headers.authorization.split(' ').pop()
  .trim();
  //  console.log('token ๐ ๐ ๐ ๐งบ๐งบ๐งบ๐งบ' , token)
    const { userId } = jwt.verify(token, process.env.jwtSecret);

    req.userId = userId;
    next();
  } catch (error) {
    console.error(error);
    return res.status(401).send(`No Autorizado`);
  }
};