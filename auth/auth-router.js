const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const AuthRoute = require('./auth/auth-router-model.js');
const restricted = require('./authenticate-middleware.js');

router.post('/register', async (req, res) => {
  // implement registration
  try {
    let newUserInfo = req.body;
    newUserInfo.password = bcrypt.hashSync(newUserInfo.password, 15);

    AuthRoute.add(newUserInfo).then(newUser => {
      const token  = generateToken(newUser)
  
      res.status(201).json({
        user: newUser,
        token
      })    
    })
  } catch(err) {
    res.status(500).json({ error: err })
  }
});

router.post('/login', (req, res) => {
  // implement login
  const { username, password } = req.body;

  try {
    AuthRoute.findById({username}).then(user => {
      if(user && bcrypt.compareSync(password, user.password)) {
        const token = generateToken(user);
        res.status(200).json({ 
          message: `Welcomne Back ${user.username}!`,
          token
        })
      } else {
        res.status(401).json({ message: "invalid credentials!" })
      } 
    })
  } catch(err) {
    res.status(500).json({ error: err })
  }
});

router.get('/', restricted, async (req, res) => {
  try {
    const users = AuthRoute.findAll();
    res.status(200).json(users);
  } catch(err) {
    res.status(500).json({ error: err })
  }
})

function generateToken(user) {
  const payload = {
    sub: user.id,
    username: user.username
  };

  const options = {
    expiresIn: "8d"
  }

  return jwt.sign(payload, process.env.SECRETS, options);
}

module.exports = router;
