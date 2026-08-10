const fs = require("fs/promises");

const logger = (req, res, next) => {
  const timestamp = new Date().toISOString();
  const method = req.method;
  const url = req.originalUrl;

  res.on("finish", async () => {
    try {
      const log = `${timestamp} ${method} ${url} ${res.statusCode}\n`;
      await fs.appendFile("./src/logs/requests.log", log);
    } catch (error) {
      console.error("Failed to write log:", error);
    }
  });

  next();
};

module.exports = logger;
