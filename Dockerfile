FROM nginx:stable-alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY index.html robots.txt sitemap.xml /var/www/portfolio/
COPY HTML/ /var/www/portfolio/HTML/
COPY CSS/ /var/www/portfolio/CSS/
COPY JS/ /var/www/portfolio/JS/

RUN nginx -t

EXPOSE 80
