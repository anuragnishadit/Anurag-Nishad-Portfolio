// Protects admin-only routes: requires "Authorization: Bearer <token>"
const jwt = require("jsonwebtoken");
module.exports = function auth(req, res, next) {
  const token = (req.headers.authorization || "").replace("Bearer ", "");
  if (!token) return res.status(401).json({ message: "Not authorised" });
  try { req.admin = jwt.verify(token, process.env.JWT_SECRET); next(); }
  catch { res.status(401).json({ message: "Invalid or expired token" }); }
};
