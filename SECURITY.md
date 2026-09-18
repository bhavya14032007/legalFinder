# Security Policy & Architecture

## Security Architecture Overview

LegalFinder AI adheres to security-in-depth principles across both client and server boundaries:

### 1. HTTP Security Headers (Helmet CSP)
- Content-Security-Policy (CSP) restricting scripts, inline styles, and origins.
- `X-Content-Type-Options: nosniff` preventing MIME-type sniffing.
- `X-Frame-Options: SAMEORIGIN` protecting against Clickjacking.
- `Strict-Transport-Security` (HSTS) enforcing HTTPS.

### 2. Multi-Tiered Rate Limiting
- **Global API Rate Limiter**: 150 requests per 15-minute window per IP to defend against DoS.
- **Sensitive AI Routes Rate Limiter**: 60 requests per 15-minute window per IP on `/api/advisor/chat` and `/api/documents/simplify` to prevent quota depletion and automated scraping.

### 3. Prompt Injection & Input Sanitization
- **Payload Size Restrictions**: Enforced 5MB request caps and 100,000 character document boundaries.
- **XSS Stripping**: All JSON inputs undergo null-byte elimination and `<script>` tag neutralization.
- **Sanitized Error Responses**: Internal stack traces and backend error details are suppressed in production mode.

### 4. Zero Secret Leakage
- API key previews and raw environment variables are stripped from public health check endpoints (`/api/health`).

## Reporting a Vulnerability

If you discover a potential security issue in LegalFinder AI, please contact the maintainer through the GitHub repository issues or email.
