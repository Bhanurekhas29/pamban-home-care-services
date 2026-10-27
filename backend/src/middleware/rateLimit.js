// Tiny in-memory limiter: at most `max` requests per `windowMs` for each IP (enough to stop form spam)
module.exports = function rateLimit({ max = 5, windowMs = 10 * 60 * 1000 } = {}) {
  const hits = new Map();

  return (req, res, next) => {
    const now = Date.now();
    const recent = (hits.get(req.ip) || []).filter((time) => now - time < windowMs);
    if (recent.length >= max) {
      return res.status(429).json({ message: 'Too many requests. Please try again in a few minutes.' });
    }
    recent.push(now);
    hits.set(req.ip, recent);
    next();
  };
};
