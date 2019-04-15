
FROM nginx:1.15.9-alpine
VOLUME /tmp
COPY dist /usr/share/nginx/html
