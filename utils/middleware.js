const logger = require("./logger");
const morgan = require("morgan");

// Request logger operated by morgan
const requestLogger = morgan(function (tokens, req, res) {
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    "-",
    tokens["response-time"](req, res),
    "ms",
    Object.keys(req.body).length === 0
      ? ""
      : `| body: ${JSON.stringify(req.body)}`,
  ].join(" ");
});

// Unknown endpoint handler
const unknownEndpoint = (req, res) => {
  res.status(404).json({ error: "Page not found" });
};

// Error handling
function errorHandler(error, req, res, next) {
  logger.error(error.message);

  if (error.name === "ValidationError") {
    return res.status(400).json({
      error: error.message,
    });
  }
  if (error.name === "CastError") {
    return res.status(400).json({
      error: "Malformatted id",
    });
  }
  next(error);
}

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
};
