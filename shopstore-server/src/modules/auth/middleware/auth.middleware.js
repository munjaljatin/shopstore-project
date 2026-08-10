const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Step 1: Check if Authorization header exists
  if (!authHeader) {
    return res.status(401).json({
      message: "Authorization header missing",
    });
  }

  // Step 2: Check Bearer format
  if (!authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      message: "Invalid authorization format",
    });
  }

  // Step 3: Extract the token
  const token = authHeader.split(" ")[1];

  try {
    // Step 4: Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // Step 5: Attach user information to the request
    req.user = decoded;
    // Step 6: Continue to the next middleware or controller
    next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid or expired token",
    });
  }
};

module.exports = authenticate;
