const db = require("../models");
const jwt = require("jsonwebtoken");
const ClientAuth = db.clientAuth;

const authenticateUser = async (req, res, next) => {
  try {
    const token = req.header("Authorization");
    // const userId = JSON.parse(userObject).id;
    const userObject = jwt.verify(token, "itsASecretKey");
    // console.log("id - ", userObject);
    const query = await ClientAuth.findByPk(userObject.id).then((user) => {
      if (user === null) {
        return res
          .status(401)
          .json({ success: false, error: "User Authentication Failed" });
      } else {
        // console.log("query - ", user);ā
        req.user = user;
        next();
      }
    });
  } catch (error) {
    return res.status(401).json({ success: false, error: error.message });
    // throw new Error(error);
  }
};

module.exports = {
  authenticateUser,
};
