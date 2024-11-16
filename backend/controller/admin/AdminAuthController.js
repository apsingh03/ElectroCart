const db = require("../../models/");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");

// Tables
const AdminAuth = db.adminAuth;
const Sequelize = db.Sequelize;
const sequelize = db.sequelize;

const adminSignUp = async (req, res) => {
  try {
    // console.log("User Req.body - ", req.body);
    const emailExistQuery = await AdminAuth.findOne({
      where: { email: req.body.email },
    });

    if (emailExistQuery) {
      if (emailExistQuery.email === req.body.email) {
        return res.status(200).send({ msg: "Email Already Exist" });
      }
    } else {
      const saltRounds = 10;

      bcrypt.hash(req.body.password, saltRounds, async function (err, hash) {
        const query = await AdminAuth.create({
          fullName: req.body.fullName,
          email: req.body.email,
          password: hash,
          createdAt: Date.now(),
        });

        return res.status(200).send({ msg: "Sign Up Successful" });
      });
    }
  } catch (error) {
    // console.log("createUser Error - ", error);
    return res.status(500).send({ error: error.message });
  }
};

const adminLogIn = async (req, res) => {
  try {
    const emailExistQuery = await AdminAuth.findOne({
      where: { email: req.body.email },
    });

    if (emailExistQuery) {
      bcrypt.compare(
        req.body.password,
        emailExistQuery.password,
        function (err, result) {
          if (err) {
            return res.status(500).send({ msg: "Something went wrong" });
          }

          if (result) {
            const { id, fullName, email } = emailExistQuery;
            const userObject = {
              isUserLogged: true,
              id,
              fullName,
              email,
            };

            var token = jwt.sign(userObject, "itsASecretKey");

            return res
              .status(200)
              .send({ msg: "Logged In Successfull", token });
          } else {
            return res.status(200).send({ msg: "Password Wrong" });
          }
        }
      );
    } else {
      return res.status(200).send({ msg: "Incorrect Email" });
    }
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

module.exports = {
  adminSignUp,
  adminLogIn,
};
