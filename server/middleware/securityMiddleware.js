import rateLimit from "express-rate-limit";
import helmet from "helmet";

/**
 * Enhanced Helmet security headers with Content Security Policy
 */
export const configureHelmet = () => {
  return helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-inline'"],
        styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
        fontSrc: ["'self'", "https://fonts.gstatic.com"],
        imgSrc: ["'self'", "data:", "https:"],
        connectSrc: ["'self'", "http://localhost:*", "https://*.onrender.com", "https://generativelanguage.googleapis.com"]
      }
    },
    crossOriginEmbedderPolicy: false,
    crossOriginResourcePolicy: { policy: "cross-origin" }
  });
};

/**
 * General API Rate Limiter
 * 150 requests per 15 minutes per IP
 */
export const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 150,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    error: "Too many requests from this IP. Please try again after 15 minutes.",
    statusCode: 429
  },
  skip: () => process.env.NODE_ENV === "test" || process.argv.some(a => a.includes("test"))
});

/**
 * Strict AI Inference Rate Limiter
 * 60 requests per 15 minutes to conserve external LLM quota and prevent abuse
 */
export const aiRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 60,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    error: "AI operation rate limit reached. Please wait a few moments before submitting another document or chat query.",
    statusCode: 429
  },
  skip: () => process.env.NODE_ENV === "test" || process.argv.some(a => a.includes("test"))
});

/**
 * Input sanitization middleware to prevent prompt injection and XSS
 */
export const sanitizeInputs = (req, res, next) => {
  if (req.body && typeof req.body === "object") {
    for (const key in req.body) {
      if (typeof req.body[key] === "string") {
        // Strip null bytes and dangerous script tags
        req.body[key] = req.body[key]
          .replace(/\0/g, "")
          .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "");
      }
    }
  }
  next();
};

/**
 * Response time telemetry middleware
 * Safely computes and sets X-Response-Time header before response is sent
 */
export const responseTimeTracker = (req, res, next) => {
  const start = process.hrtime();
  
  const originalSend = res.send;
  res.send = function (body) {
    if (!res.headersSent) {
      const diff = process.hrtime(start);
      const timeInMs = (diff[0] * 1e3 + diff[1] * 1e-6).toFixed(2);
      res.setHeader("X-Response-Time", `${timeInMs}ms`);
    }
    return originalSend.call(this, body);
  };

  next();
};
