import { type Request, type Response, type NextFunction } from 'express';

// Security middleware function
export const securityHeaders = (req: Request, res: Response, next: NextFunction) => {
  // Security headers
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
  res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
  res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');
  
  // CSP Header - Configure based on your needs
  const csp = [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://*.tawk.to",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "img-src 'self' data: https: blob:",
    "font-src 'self' https://fonts.gstatic.com",
    "connect-src 'self' https://*.tawk.to https://*.contentful.com",
    "frame-src 'self' https://*.tawk.to",
    "media-src 'self' data:",
  ].join('; ');
  
  res.setHeader('Content-Security-Policy', csp);
  
  // HSTS Header - Only enable in production with HTTPS
  if (process.env.NODE_ENV === 'production') {
    res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');
  }
  
  next();
};

// Rate limiting middleware
export const rateLimiter = (req: Request, res: Response, next: NextFunction) => {
  // Simple rate limiting - in production, use something like express-rate-limit
  const rateLimitWindowMs = 15 * 60 * 1000; // 15 minutes
  const maxRequestsPerWindow = 100; // Max requests per window per IP
  
  // This is a basic implementation - consider using express-rate-limit for production
  const ip = req.ip || req.connection.remoteAddress;
  const now = Date.now();
  
  // In a real app, you'd store this in a shared cache like Redis
  if (!req.app.locals.rateLimit) {
    req.app.locals.rateLimit = {};
  }
  
  if (!req.app.locals.rateLimit[ip]) {
    req.app.locals.rateLimit[ip] = {
      count: 0,
      resetTime: now + rateLimitWindowMs,
    };
  }
  
  const rateLimitInfo = req.app.locals.rateLimit[ip];
  
  if (now > rateLimitInfo.resetTime) {
    rateLimitInfo.count = 0;
    rateLimitInfo.resetTime = now + rateLimitWindowMs;
  }
  
  rateLimitInfo.count++;
  
  // Set rate limit headers
  res.set('X-RateLimit-Limit', maxRequestsPerWindow.toString());
  res.set('X-RateLimit-Remaining', Math.max(0, maxRequestsPerWindow - rateLimitInfo.count).toString());
  res.set('X-RateLimit-Reset', Math.ceil(rateLimitInfo.resetTime / 1000).toString());
  
  if (rateLimitInfo.count > maxRequestsPerWindow) {
    return res.status(429).json({
      error: 'Too many requests, please try again later.',
      retryAfter: Math.ceil((rateLimitInfo.resetTime - now) / 1000),
    });
  }
  
  next();
};

// CSRF protection middleware
export const csrfProtection = (req: Request, res: Response, next: NextFunction) => {
  // Skip CSRF for GET, HEAD, OPTIONS
  if (['GET', 'HEAD', 'OPTIONS'].includes(req.method)) {
    return next();
  }
  
  // Verify CSRF token
  const csrfToken = req.headers['x-csrf-token'] || req.body._csrf;
  
  // In a real app, you'd verify this against the session
  if (!csrfToken) {
    return res.status(403).json({ error: 'CSRF token is required' });
  }
  
  // Add CSRF token to response for forms
  res.locals.csrfToken = csrfToken;
  next();
};
