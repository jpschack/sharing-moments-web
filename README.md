# Sharing Moments - Web

## Project idea / intention

Providing a service for users to share their moments / photos of events with their friends, family and colleagues.
The main intention of developing this app for me is to keep enhancing my skills and get to learn new technologies.

## Technologies used

* AngularJS
* Bootstrap 3
* SASS
* GulpJS
* Bower
* nginx - as a web server for serving the static web files

## nginx config
```
http {
    server {
        listen 80;
        server_name smweb;
        return 301 https://$host$request_uri;
    }

    server { 
        listen 443;
        server_name smweb;
        access_log /sharing-moments-web/logs/nginx.access.log;
        error_log /sharing-moments-web/logs/nginx.error.log;
        root /sharing-moments-web;
        ssl on;
        ssl_certificate /ssl_cert/fullchain.pem;
        ssl_certificate_key /ssl_cert/privkey.pem;
        charset utf-8;
        index index.html;

        location / {
            try_files $uri$args $uri$args/ /index.html;
        }

        location /api/v1/resource/ {
            proxy_pass http://localhost:9000/api/v1/resource/;
        }

        location /api/v1/uaa/ {
            proxy_pass http://localhost:9999/api/v1/uaa/;
        }

        location /api/google/maps/places/ {
            proxy_pass https://maps.googleapis.com/maps/api/place/;
        }
    }
}
```

## env.js

The environment file is located at /assets/src/js/env.js.
The API key for google maps needs to be set up there.