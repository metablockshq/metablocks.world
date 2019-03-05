# install nginx
apt update
apt install nginx

# fix permissions
chown -R $USER:www-data /root/krimlabs.com
chmod 755 -R /root/krimlabs.com

chmod +x /root
chmod +x /root/krimlabs.com


# copy nginx config to site-available
cp etc/nginx/sites-available/krimlabs.com /etc/nginx/sites-available/krimlabs.com

# make a symlink to enable site
cd /etc/nginx/sites-enabled
ln -s ../sites-available/krimlabs.com .

# test if everything works
nginx -t

# restart nginx
/etc/init.d/nginx restart
