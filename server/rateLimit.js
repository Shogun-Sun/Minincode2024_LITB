const ratelimiter = require("express-rate-limit")
/**
 * Лимит, для предотвращения перегрузки сервера.
 */
const limiter = ratelimiter({
  windowMs: 5 * 60 * 1000,
  max: 5,
  message: "Слишком много запросов, пожалуйста, попробуйте позже."
});

module.exports = limiter;