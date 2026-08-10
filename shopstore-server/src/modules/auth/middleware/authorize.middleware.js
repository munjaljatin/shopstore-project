const authorize = (...allowedRoles) => {
  return (req, res, next) => {
    // req.user is set by authenticate middleware
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        message: "Access denied",
      });
    }

    next();
  };
};

module.exports = authorize;
