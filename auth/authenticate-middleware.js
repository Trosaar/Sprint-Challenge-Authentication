/* 
  complete the middleware code to check if the user is logged in
  before granting access to the next middleware/route handler
*/

module.exports = (req, res, next) => {

  const token = req.headers.authization;

  if(token) {
    jwt.verify(token, process.env.SECRETS, (err, decodedToken) => {
      if(err) {
        res.satus(401).json({ message: "They climbing in your window. Snatching your people up. Hide your kids, hide your wide, hide your password."})
      } else {
        req.decodedToken = decodedToken;
        next();
      }
    }) 
  } else {
    res.status(401).json({ you: 'shall not pass!' });
  }
};
