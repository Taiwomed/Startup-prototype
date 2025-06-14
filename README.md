#CLOUD ENGINEERING SECOND SEMESTER EXAMINATION PROJECT

# Startup Prototype Landing Page

## Overview
This project is a landing page for the Cloud Developer role, showcasing "MEDOYE TAIWO OMOLARA - Cloud Developer". It is deployed on an AWS EC2 instance running Ubuntu 22.04 with Nginx as the web server. The page is accessible at [http://54.247.7.11](http://54.247.7.11) (redirects to HTTPS) and [https://54.247.7.11](https://54.247.7.11).

### Features
- **Title**: "MEDOYE TAIWO OMOLARA - Cloud Developer" with font scaling animation (color `#408EC6`).
- *Pitch*: "The Future of Sustainable Urban Mobility" with pulsing animation and bounce effect on click.
- *Bio*: Hidden by default, toggled with a button (background color #7A2048).
- *Styling*: CSS animations (color pulse, slide-in) with colors #1E2761, #408EC6, #7A2048.
- *Interactivity*: JavaScript for button toggle and bounce effect.
- *Files*: index.html, styles.css, script.js.

## Project Setup

### 1. Server Setup (AWS EC2)
- *Launched an AWS EC2 instance*:
  - AMI: Ubuntu Server 22.04 LTS.
  - Instance Type: t2.micro.
  - Key Pair: Created Eng.pem for SSH access.
  - Configured Security Group to allow:
    - SSH (Port 22, source: 0.0.0.0/0).
    - HTTP (Port 80, source: 0.0.0.0/0).
    - HTTPS (Port 443, source: 0.0.0.0/0).
  - Assigned Public IP: 54.247.7.11 (Private IP: 172.31.33.70).
- *Secured Key Pair*:
  ```bash
  mv ~/Downloads/Eng.pem ~/.ssh/
  chmod 400 ~/.ssh/Eng.pem

```markdown
- Connected to the instance:
```bash
ssh -i ~/.ssh/Eng.pem ubuntu@54.247.7.11
 
```markdown
- Updated system:
```bash
sudo apt update
sudo apt upgrade -y

### 2. Web Server Configuration (Nginx)
```markdown
- Installed Nginx:
```bash
sudo apt update
sudo apt install nginx

```markdown
- Enabled and started Nginx:
```bash
sudo systemctl enable nginx
sudo systemctl start nginx

```markdown
- Configured Nginx to serve the landing page from /var/www/html:
```bash
sudo nano /etc/nginx/sites-available/default

- Updated with:
```nginx
server {
    listen 80;
    listen [::]:80;
    server_name 54.247.7.11;

    root /var/www/html;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}

server {
    listen 443 ssl;
    server_name 54.247.7.11;
    root /var/www/html;
    index index.html;

    ssl_certificate /etc/ssl/certs/selfsigned.crt;
    ssl_certificate_key /etc/ssl/private/selfsigned.key;

    location / {
        try_files $uri $uri/ /index.html;
    }
}

```markdown
- Generated self-signed SSL certificate:
```bash
sudo openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout /etc/ssl/private/selfsigned.key -out /etc/ssl/certs/selfsigned.crt

```markdown
-Tested configuration and reloaded nginx:
```bash
sudo nginx -t
sudo systemctl reload nginx

### 3. SSL Configuration (Let’s Encrypt)

Installed Certbot for Let’s Encrypt SSL:
```bash
sudo apt update
sudo apt install certbot python3-certbot-nginx

Obtained and installed SSL certificate:
```bash
sudo certbot --nginx -d domain

Provided email for renewal notifications.
Agreed to terms and configured HTTP-to-HTTPS redirection.

Verified certificate:
```bash
certbot certificates
Ensured automatic renewal with Certbot’s cron job.

### 4. Deployment

Local Development:
-Developed in ~/landing-page on WSL Ubuntu (taiwomed@Omolara).
-Created index.html, styles.css, script.js for a responsive landing page.

Features:
-Title: "MEDOYE TAIWO OMOLARA - Cloud Developer" with font scaling (color #408EC6).
-Pitch: "The Future of Sustainable Urban Mobility" with pulsing animation and bounce on click.
-Bio: Hidden, toggled with button (background #7A2048).
-Colors: #1E2761, #408EC6, #7A2048.

-- Tested locally using VS Code Live Server to ensure functionality and responsiveness.
-- Captured screenshot.png of the rendered page.
-- Wrote README.md to document the process.

File Upload to EC2:
```markdown
Attempted to upload files via scp::
```bash
scp -i ~/.ssh/Eng.pem index.html styles.css script.js ubuntu@54.247.7.11:/var/www/html/

Resolved "Permission denied (publickey)" error by:
Verifying Eng.pem permissions:
```bash
chmod 400 ~/.ssh/Eng.pem

-- Confirming username (ubuntu) and key pair in AWS Console.
-- Ensuring security group allowed SSH (Port 22).

```markdown
Used alternative approach due to permissions:
```bash
scp -i /.ssh/Eng.pem index.html styles.css script.js ubuntu@54.247.7.11:/temp-files/
ssh -i ~/.ssh/Eng.pem ubuntu@54.247.7.11
mkdir ~/temp-files
sudo mv ~/temp-files/* /var/www/html/

```markdown
Set permissions for Nginx:
```bash
sudo chown www-data:www-data /var/www/html/*
sudo chmod 644 /var/www/html/index.html /var/www/html/styles.css /var/www/html/script.js

```markdown
Removed default and test files:
```bash
sudo rm /var/www/html/index.nginx-debian.html /var/www/html/test.txt

```markdown
Cleared Nginx cache:
```bash
sudo rm -rf /var/cache/nginx/*
sudo systemctl restart nginx

Git Version Control:
```markdown
- Initialized local Git repository:
```bash
git init
git branch -m main

```markdown
- Committed files:
```bash
git add README.md index.html screenshot.png script.js styles.css
git commit -m "Initial commit for Task 4: landing page with screenshot and README"

- Fixed file permissions:
```bash
chmod 644 index.html styles.css script.js screenshot.png README.md
git add .
git commit -m "Fixed file permissions to 644"

- Configured GitHub with a Personal Access Token (PAT):
```bash
git remote add origin https://github.com/Taiwomed/Startup-prototype.git

- Pushed to GitHub:
```bash
git push -u origin main

### 5. Networking & Security

-- Configured EC2 Security Group to allow:
-SSH (Port 22, source: 0.0.0.0/0).
- HTTP (Port 80, source: 0.0.0.0/0).
- HTTPS (Port 443, source: 0.0.0.0/0).
- ICMP (All ICMP - IPv4, source: 0.0.0.0/0) to enable ping.

HTTPS Implementation:
Used self-signed SSL certificate due to lack of a registered domain.

Note: Browser displays a security warning; users must click "Advanced" to proceed.

Troubleshooting

Issue: scp failed with "Permission denied (publickey)".
Solution: Verified Eng.pem permissions, username (ubuntu), key pair, and security group SSH rule.

Issue: ping 54.247.7.11 failed.
Solution: Added ICMP rule to security group; verified EC2 instance status and public IP in AWS Console.

Issue: Webpage not reflecting changes.
Solution: Cleared browser cache, removed default files (index.nginx-debian.html, test.txt), verified file paths, and restarted Nginx:
```bash
sudo systemctl restart nginx

Issue: Screenshot not displaying in README.md.
Solution: Verified screenshot.png filename (case-sensitive), re-pushed file, and updated README.md with correct path:
```bash
git add screenshot.png
git commit -m "Re-added screenshot.png"
git push origin main

Issue: GitHub push failed with authentication error.
Solution: Used Personal Access Token with repo scope for Taiwomed/Startup-prototype.

Screenshot
Landing Page
Captured at https://54.247.7.11 on June 13, 2025.

Public IP
URL: http://54.247.7.11 (redirects to HTTPS), https://54.247.7.11

Technologies Used
Front-End: HTML, CSS, JavaScript

Server: AWS EC2 (Ubuntu 22.04), Nginx

Version Control: Git, GitHub

