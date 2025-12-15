import { type Request, type Response, type NextFunction } from 'express';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import { v4 as uuidv4 } from 'uuid';

// Security middleware function
export const securityHeaders = (req: Request, res: Response, next: NextFunction) => {
  // Generate nonce for CSP
  const nonce = Buffer.from(uuidv4()).toString('base64');
  res.locals.cspNonce = nonce;

  // Security headers with Helmet
  helmet({
    contentSecurityPolicy: {
      useDefaults: true,
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: [
          "'self'",
          `'nonce-${nonce}'`,
          'https://*.tawk.to',
          'https://www.google-analytics.com',
          'https://www.googletagmanager.com'
        ],
        styleSrc: [
          "'self'",
          "'unsafe-inline'",
          'https://fonts.googleapis.com',
          'https://cdn.jsdelivr.net'
        ],
        imgSrc: [
          "'self'",
          'data:',
          'https:', 'http:', // Allow all image sources (consider restricting in production)
          'https://*.tawk.to',
          'https://images.unsplash.com',
          'https://www.google-analytics.com',
          'https://www.googletagmanager.com'
        ],
        fontSrc: [
          "'self'",
          'data:',
          'https://fonts.gstatic.com',
          'https://cdn.jsdelivr.net'
        ],
        connectSrc: [
          "'self'",
          'https://*.tawk.to',
          'https://*.contentful.com',
          'https://www.google-analytics.com',
          'https://region1.google-analytics.com'
        ],
        frameSrc: [
          "'self'",
          'https://*.tawk.to',
          'https://www.google.com',
          'https://www.youtube.com'
        ],
        mediaSrc: ["'self'"],
        objectSrc: ["'none'"],
        upgradeInsecureRequests: process.env.NODE_ENV === 'production' ? [] : []
      }
    },
    crossOriginEmbedderPolicy: { policy: 'require-corp' },
    crossOriginOpenerPolicy: { policy: 'same-origin' },
    crossOriginResourcePolicy: { policy: 'same-site' },
    dnsPrefetchControl: { allow: true },
    frameguard: { action: 'deny' },
    hidePoweredBy: true,
    hsts: {
      maxAge: 31536000,
      includeSubDomains: true,
      preload: process.env.NODE_ENV === 'production'
    },
    ieNoOpen: true,
    noSniff: true,
    permittedCrossDomainPolicies: { permittedPolicies: 'none' },
    referrerPolicy: { policy: 'strict-origin-when-cross-origin' },
    xssFilter: true
  })(req, res, next);
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
