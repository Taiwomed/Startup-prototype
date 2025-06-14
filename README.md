CLOUD ENGINEERING SECOND SEMESTER EXAMINATION PROJECT
Startup Prototype Landing Page
Overview
This project is a landing page for "MEDOYE TAIWO OMOLARA - Cloud Developer" for AltSchool Task 4. It’s hosted on an AWS EC2 instance with Nginx at http://54.247.7.11 (redirects to HTTPS) and https://54.247.7.11.
Features

Title: "MEDOYE TAIWO OMOLARA - Cloud Developer" with animation (color #408EC6).
Pitch: "The Future of Sustainable Urban Mobility" with bounce effect.
Bio: Hidden, toggled with a button (color #7A2048).
Styling: CSS animations with colors #1E2761, #408EC6, #7A2048.
Files: index.html, styles.css, script.js.

Setup
1. Server Setup
Launched an AWS EC2 instance:

Ubuntu 22.04 LTS, t2.micro, public IP 54.247.7.11.
Allowed SSH (port 22), HTTP (port 80), HTTPS (port 443).

Secured key pair:
mv ~/Downloads/Eng.pem ~/.ssh/
chmod 400 ~/.ssh/Eng.pem

Connected to the server:
ssh -i ~/.ssh/Eng.pem ubuntu@54.247.7.11

Updated system:
sudo apt update
sudo apt upgrade -y

2. Web Server (Nginx)
Installed Nginx:
sudo apt update
sudo apt install nginx

Started Nginx:
sudo systemctl enable nginx
sudo systemctl start nginx

Configured Nginx:
sudo nano /etc/nginx/sites-available/default

Nginx configuration:
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

Generated SSL certificate:
sudo openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout /etc/ssl/private/selfsigned.key -out /etc/ssl/certs/selfsigned.crt

Reloaded Nginx:
sudo nginx -t
sudo systemctl reload nginx

3. SSL Configuration (Let’s Encrypt)
Installed Certbot:
sudo apt update
sudo apt install certbot python3-certbot-nginx

Obtained SSL certificate:
sudo certbot --nginx -d domain

Verified certificate:
certbot certificates

4. Deployment
Developed index.html, styles.css, script.js locally in ~/landing-page. Tested using VS Code Live Server.
Uploaded files to EC2:
scp -i ~/.ssh/Eng.pem index.html styles.css script.js ubuntu@54.247.7.11:/var/www/html/

Resolved "Permission denied" error:
chmod 400 ~/.ssh/Eng.pem
scp -i ~/.ssh/Eng.pem index.html styles.css script.js ubuntu@54.247.7.11:~/temp-files/
ssh -i ~/.ssh/Eng.pem ubuntu@54.247.7.11
mkdir ~/temp-files
sudo mv ~/temp-files/* /var/www/html/

Set permissions:
sudo chown www-data:www-data /var/www/html/*
sudo chmod 644 /var/www/html/index.html /var/www/html/styles.css /var/www/html/script.js

Removed default files:
sudo rm /var/www/html/index.nginx-debian.html /var/www/html/test.txt

Cleared Nginx cache:
sudo rm -rf /var/cache/nginx/*
sudo systemctl restart nginx

5. Git Version Control
Initialized local Git repository:
git init
git branch -m main

Committed files:
git add README.md index.html screenshot.png script.js styles.css
git commit -m "Initial commit for Task 4: landing page with screenshot and README"

Fixed file permissions:
chmod 644 index.html styles.css script.js screenshot.png README.md
git add .
git commit -m "Fixed file permissions to 644"

Configured GitHub with a Personal Access Token (PAT):
git remote add origin https://github.com/Taiwomed/Startup-prototype.git

Pushed to GitHub:
git push -u origin main

6. Networking & Security
Configured EC2 Security Group to allow:

SSH (Port 22, source: 0.0.0.0/0).
HTTP (Port 80, source: 0.0.0.0/0).
HTTPS (Port 443, source: 0.0.0.0/0).
ICMP (All ICMP - IPv4, source: 0.0.0.0/0) to enable ping.

Implemented HTTPS using a self-signed SSL certificate due to lack of a registered domain. Note: Browser displays a security warning; users must click "Advanced" to proceed.
Troubleshooting

Issue: scp failed with "Permission denied (publickey)".
Solution: Verified Eng.pem permissions, username (ubuntu), key pair, and security group SSH rule.


Issue: ping 54.247.7.11 failed.
Solution: Added ICMP rule to security group; verified EC2 instance status and public IP in AWS Console.


Issue: Webpage not reflecting changes.
Solution: Cleared browser cache, removed default files (index.nginx-debian.html, test.txt), verified file paths, and restarted Nginx:sudo systemctl restart nginx




Issue: Screenshot not displaying in README.md.
Solution: Moved screenshot line outside code blocks and verified raw URL:git add screenshot.png
git commit -m "Re-added screenshot.png"
git push origin main




Issue: GitHub push failed with authentication error.
Solution: Used Personal Access Token with repo scope for Taiwomed/Startup-prototype.



Public IP

http://54.247.7.11 (redirects to HTTPS)
https://54.247.7.11

Technologies Used

Front-End: HTML, CSS, JavaScript
Server: AWS EC2 (Ubuntu 22.04), Nginx
Version Control: Git, GitHub

## Screenshot
![Landing Page](https://raw.githubusercontent.com/Taiwomed/Startup-prototype/main/screenshot.png)
