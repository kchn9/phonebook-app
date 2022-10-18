const morgan = require("morgan");
const isRequestBody = (request) => {
  return (
    request.body &&
    Object.keys(request.body).length !== 0 &&
    Object.getPrototypeOf(request.body) === Object.prototype
  );
};

module.exports = morgan(function (tokens, req, res) {
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    "-",
    tokens["response-time"](req, res),
    "ms",
    isRequestBody(req) ? `| body: ${JSON.stringify(req.body)}` : "",
  ].join(" ");
});
