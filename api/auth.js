const express = require("express");
const router = express.Router();
const UserModel = require("../models/UserModel");
const FollowerModel = require("../models/FollowerModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const isEmail = require("validator/lib/isEmail");
const authMiddleware = require("../middleware/authMiddleware");
router.post("/", async (req, res) => {
  const { email, password } = req.body.user;
  console.log('req.body-----> 🌟🌟' , req.body)


  if (!isEmail(email)) return res.status(401).send("Invalid Email");

  if (password.length < 6) {
    return res.status(401).send("Password must be atleast 6 characters");
  }

  try {
    const user = await UserModel.findOne({ email: email.toLowerCase() }).select(
      "+password"
    );

    if (!user) {
      return res.status(401).send("Invalid Credentials");
    }

    const isPassword = await bcrypt.compare(password, user.password);
    if (!isPassword) {
      return res.status(401).send("Invalid Credentials");
    }

    const payload = { userId: user._id };
    jwt.sign(payload, process.env.jwtSecret, { expiresIn: "2d" }, (err, token) => {
      if (err) throw err;
    //  console.log('token---- in server🌟🌟🌟' , token )
      res.status(200).json(token);
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send(`Server error`);
  }
});


// get cureent Auth user

router.get("/", authMiddleware, async (req, res) => {
  const { userId } = req;
  let { getFollowingData } = req.query;
  console.log('params---->' , getFollowingData)
  getFollowingData = JSON.parse(getFollowingData);
  

  try {
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).send("User not found in Database");
    }

    let userFollowStats;

    if (getFollowingData) {
      userFollowStats = await FollowerModel.findOne({ user: userId }).select(
        "-followers"
      );
    }

    return res.status(200).json({ user, userFollowStats });
  } catch (error) {
    console.error(error);
    return res.status(500).send(`Server error`);
  }
});





module.exports = router;
