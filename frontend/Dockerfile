# multi-stage build : node and web server

FROM node:latest as build-stage
WORKDIR /usr/src/app
COPY . .
RUN npm install && npm run build

# Apache HTTP Server
FROM httpd:2.4 as production-stage
COPY --from=build-stage /usr/src/app/build /usr/local/apache2/htdocs/
EXPOSE 80
CMD ["httpd-foreground"]


