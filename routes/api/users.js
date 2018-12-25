const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const { secretOrKey } = require('../../config/keys');
const User = require('../../models/User');
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');

const router = express.Router();

router.post('/register', (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  if (!isValid) {
    res.status(400).json(errors);
    return;
  }

  User.findOne({ email: req.body.email })
    .then((user) => {
      if (user) {
        errors.email = 'User already exists';
        res.status(400).json(errors);
        return;
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

              jwt.sign(payload, secretOrKey, { expiresIn: 3600 }, (jwtErr, token) => {
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
  const { errors, isValid } = validateLoginInput(req.body);

  if (!isValid) {
    res.status(400).json(errors);
    return;
  }

  const { email, password } = req.body;

  User.findOne({ email })
    .then((user) => {
      if (!user) {
        errors.email = 'This user does not exist';
        res.status(404).json(errors);
        return;
      }

      bcrypt.compare(password, user.password)
        .then((isMatch) => {
          if (isMatch) {
            const payload = { id: user.id, handle: user.handle, email: user.email };

            jwt.sign(payload, secretOrKey, { expiresIn: 3600 }, (err, token) => {
              res.json({
                success: true,
                token: `Bearer ${token}`,
              });
            });
          } else {
            errors.password = 'Incorrect password';
            res.status(400).json(errors);
          }
        });
    });
});

router.get('/current', passport.authenticate('jwt', { session: false }, (req, res) => {
  res.json({
    id: req.user.id,
    handle: req.user.handle,
    email: req.user.email,
  });
}));

module.exports = router;
