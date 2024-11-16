const db = require("../models/");
const jwt = require("jsonwebtoken");

const AdminAuth = db.adminAuth;

const authenticateAdmin = async (req, res, next) => {
  try {
    const token = req.header("Authorization");
    // const userId = JSON.parse(userObject).id;
    const userObject = jwt.verify(token, "itsASecretKey");
    // console.log("id - ", userObject);
    const query = await AdminAuth.findByPk(userObject.id).then((user) => {
      if (user === null) {
        return res
          .status(401)
          .json({ success: false, error: "Admin Authentication Failed" });
      } else {
        // console.log("query - ", user);ā
        req.admin = user;
        next();
      }
    });
  } catch (error) {
    return res.status(401).json({ success: false, error: error.message });
    // throw new Error(error);
  }
};

module.exports = {
  authenticateAdmin,
};
