const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const User = require('../../models/User');

const router = express.Router();

router.post('/register', (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email })
    .then((user) => {
      if (user) {
        errors.email = 'User already exists';
        return res.status(400).json(errors);
      }

      const newUser = new User({
        handle: req.body.handle,
        email: req.body.email,
        password: req.body.password,
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (bcryptErr, hash) => {
          if (bcryptErr) throw bcryptErr;
          newUser.password = hash;
          newUser.save()
            .then((savedUser) => {
              const payload = { id: savedUser.id, handle: savedUser.handle };

              jwt.sign(payload, keys.secretOrKey, { expiresIn: 3600 }, (jwtErr, token) => {
                res.json({
                  success: true,
                  token: `Bearer ${token}`,
                });
              });
            })
            .catch(anyErr => console.log(anyErr));
        });
      });
    });
});

router.post('/login', (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const { email, password } = req.body;

  User.findOne({ email })
    .then((user) => {
      if (!user) {
        errors.email = 'This user does not exist';
        return res.status(400).json(errors);
      }

      bcrypt.compare(password, user.password)
        .then((isMatch) => {
          if (isMatch) {
            const payload = { id: user.id, handle: user.handle };

            jwt.sign(payload, keys.secretOrKey, { expiresIn: 3600 }, (err, token) => {
              res.json({
                success: true,
                token: `Bearer ${token}`,
              });
            });
          } else {
            errors.password = 'Incorrect password';
            return res.status(400).json(errors);
          }
        });
    });
});

module.exports = router;
