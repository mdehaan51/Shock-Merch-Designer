const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
// Load input validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");
const validateAdminInput = require("../../validation/admin");
// Load User model
const User = require("../../models/User");

const Sentry = require("@sentry/node");
Sentry.init({
  dsn: "https://76fec3dbdee74020b39db7be061b0b54@sentry.io/1729628"
});

// @route POST api/users/register
// @desc Register user
// @access Public
router.post("/register", (req, res) => {
  // Form validation
  const { errors, isValid } = validateRegisterInput(req.body);
  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.status(400).json({ email: "Email already exists" });
    } else {
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
      });
      // Hash password before saving in database
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

router.get("/reset", (req, res) => {
  let token = req.query.resetPasswordToken;
  User.findOne({ resetPasswordToken: token }).then(user => {
    if (user === null) {
      console.log("password reset link is invalid or has expired");
      return res.status(400).json({ expired: "Reset Link Has Expired" });
    } else {
      return res.status(200).send({
        email: user.email,
        message: "User Checks Out"
      });
    }
  });
});

router.post("/updatePassword", (req, res) => {
  var email = req.body.email;
  var password = req.body.password;
  console.log("updating password");
  User.findOne({ email }).then(user => {
    if (user !== null) {
      console.log("User exists in db");
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, (err, hash) => {
          if (err) throw err;
          password = hash;
          let newPass = {
            password: password,
            resetPasswordToken: null,
            resetPasswordExpires: null
          };
          User.updateOne({ email }, newPass).then(() => {
            console.log("PasswordUpdated");
            return res.status(200).json({
              message: "Password Updated"
            });
          });
        });
      });
    } else {
      console.log("No User In Db");
      return res.status(404).send({
        message: "User Does Not Exist"
      });
    }
  });
});

// @route POST api/users/login
// @desc Login user and return JWT token
// @access Public
router.post("/login", (req, res) => {
  // Form validation
  const { errors, isValid } = validateLoginInput(req.body);
  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const email = req.body.email;
  const password = req.body.password;
  // Find user by email
  User.findOne({ email }).then(user => {
    // Check if user exists
    if (!user) {
      return res.status(404).json({ emailnotfound: "Email not found" });
    }
    // Check password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        // User matched
        // Create JWT Payload
        const payload = {
          id: user.id,
          name: user.name,
          email: user.email
        };
        // Sign token
        jwt.sign(
          payload,
          keys.secretOrKey,
          {
            expiresIn: 31556926 // 1 year in seconds
          },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token
            });
          }
        );
      } else {
        return res
          .status(400)
          .json({ passwordincorrect: "Password incorrect" });
      }
    });
  });
});

router.post("/admin", (req, res) => {
  // Form validation
  const { errors, isValid } = validateAdminInput(req.body);
  // Check validation
  if (!isValid) {
    console.log("Invalid");
    return res.status(400).json(errors);
  }
  const email = req.body.email;
  const password = req.body.password;
  // Find user by email
  User.findOne({ email }).then(user => {
    // Check if user exists
    if (!user) {
      return res.status(404).json({ emailnotfound: "Email not found" });
    }
    // Check password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        // User matched
        // Create JWT Payload
        const payload = {
          id: user.id,
          name: user.name
        };
        // Sign token
        jwt.sign(
          payload,
          keys.secretOrKey,
          {
            expiresIn: 31556926 // 1 year in seconds
          },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token
            });
          }
        );
      } else {
        return res
          .status(400)
          .json({ passwordincorrect: "Password incorrect" });
      }
    });
    if (!user.admin) {
      console.log("Not Admin");
      return res.status(404).json({ notadmin: "User is not an Admin" });
    }
  });
});

router.get("/users", (req, res) => {
  User.find({}).then(user => {
    res.send(user);
  });
});

router.post("/save_user", (req, res) => {
  var email = req.body.email;
  var details = {
    business: req.body.business,
    phone: req.body.phone,
    location: req.body.location
  };
  User.updateOne({ email }, details)
    .then(user => res.json(user))
    .catch(err => console.log(err));
});

module.exports = router;
