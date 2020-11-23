// const Express = require('Express');
// const router = Express.Router();
const router = require('Express').Router();
const User = require('../db').import('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.post('/user', (req, res) => {
  User.create({
    username: req.body.username,
    password: bcrypt.hashSync(req.body.password, 12)
  })
    .then(user => {
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "7d" });
 
      res.status(200).json({
        // user: user,
        message: 'user created successfully',
        sessionToken: token
      });
    })
    .catch(err => res.status(500).json({ error: err }));
});

router.post('/login', (req, res) => {
  User.findOne({ where: { username: req.body.username }})
  .then(user => {
    if (user) {
      bcrypt.compare(req.body.password, user.password, (err, matches) => {
        if (matches) {
          const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "7d" });

          res.status(200).json({
            user: user,
            message: "user login successful",
            sessionToken: token
          })

        } else {
          res.status(500).json({ error: "incorrect password" })
        }
      })
    } else {
      res.status(500).json({ error: "user does not exist" })
    }
  })
  .catch(err => res.status(500).json({ error: "database error "}));
})

module.exports = router;