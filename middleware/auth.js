// const jwt = require("jsonwebtoken");
// const db = require("../models");
// const User = db.user;

// verifyToken = (req, res, next) => {
//   if (!req.headers.authJwt) {
//     return res.status(403).send({
//       message: "No token provided!"
//     });
//   }

//   jwt.verify(token, config.secret, (err, decoded) => {
//     if (err) {
//       return res.status(401).send({
//         message: "Unauthorized!"
//       });
//     }
//     req.userId = decoded.id;
//     next();
//   });
// };

// isAdmin = (req, res, next) => {
//   User.findByPk(req.userId).then(user => {
//   if (user.role === "admin") {
//           next();
//           return;
//         }
//       
//       res.status(403).send({
//         message: "Require Admin Role!"
//       });
//   });
// };

// isModerator = (req, res, next) => {
//   User.findByPk(req.userId).then(user => {
//   if (user.role === "moderator") {
//           next();
//           return;
//         }
//       
//       res.status(403).send({
//         message: "Require Moderator Role!"
//       });
//   });
// };

// isModeratorOrAdmin = (req, res, next) => {
//  User.findByPk(req.userId).then(user => {
//    if ( user.role === "moderator") {
//           next();
//           return;
//         }

//         if (user.role === "admin") {
//           next();
//           return;
//         }
//       
//       res.status(403).send({
//         message: "Require Moderator or Admin Role!"
//       });
//   });
//};

// const authJwt = {
//   verifyToken: verifyToken,
//   isAdmin: isAdmin,
//   isModerator: isModerator,
//   isModeratorOrAdmin: isModeratorOrAdmin
// };
// module.exports = authJwt;