# Startup Prototype Landing Page

## Overview
- Landing page for Cloud Developer role.
- Features: Medoye Taiwo Omolara, Cloud Developer role, "The Future of Sustainable Urban Mobility" pitch, bio with toggle button, CSS animations, JavaScript interactivity.
- Deployed on AWS EC2 (Ubuntu 22.04, Nginx).

## Security
- Ports:
  - SSH: TCP 22 (My IP or 0.0.0/0)
  - HTTP: TCP 80 (0.0.0.0/0 and ::/0)
  - HTTPS: TCP 443 (0.0.0.0/0 and ::/0)
- HTTPS: Self-signed certificate, expect browser warnings.
- HTTP redirects to HTTPS for secure access.
- Security group allows public access.

## Deployment
- URL: [http://54.247.7.11](http://54.247.7.11) (redirects to HTTPS), [https://54.247.7.11](https://54.247.7.11)
- Files: `index.html`, `styles.css`, `script.js`
- Served from `/var/www/html` via Nginx.

## Screenshot
![Landing Page](screenshot.png)
