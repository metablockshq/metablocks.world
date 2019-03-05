server {
  listen 80;
  server_name krimlabs.com;
  root /root/krimlabs.com/build;
  index index.html;

  access_log /var/log/nginx/krimlabs.com.access.log;
  error_log /var/log/nginx/krimlabs.com.error.log;
  location / {
    try_files $uri $uri/ =404;
  }
}
