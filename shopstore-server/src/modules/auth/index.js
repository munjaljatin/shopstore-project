const routes = require("./routes/auth.routes");
const authenticate = require("./middleware/auth.middleware");
const authorize = require("./middleware/authorize.middleware");

module.exports = {
  routes,
  authenticate,
  authorize,
};
