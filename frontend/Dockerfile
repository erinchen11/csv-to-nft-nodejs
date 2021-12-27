# multi-stage build : node and web server

# FROM node:latest as build-stage
# FROM node:latest
# WORKDIR /usr/src/app
# COPY . .


# # Apache HTTP Server
# # FROM httpd:2.4 as production-stage
# # COPY --from=build-stage /usr/src/app/build /usr/local/apache2/htdocs/
# # EXPOSE 3000
# # CMD ["httpd-foreground"]
# # FROM nginx:alpine
# # COPY --from=build-stage /usr/src/app/build /usr/share/nginx/frontend

# COPY package.json ./
# COPY package-lock.json ./
# RUN npm install && npm run build
# CMD ["npm", "run", "start"]

FROM node:14 AS builder
# Set working directory
WORKDIR /app
# Copy all files from current directory to working dir in image
COPY . .
# install node modules and build assets
RUN npm install && npm run build

# nginx state for serving content
FROM nginx:alpine
# Set working directory to nginx asset directory

WORKDIR /usr/share/nginx/html
# Remove default nginx static assets
RUN rm -rf ./*
# Copy static assets from builder stage
COPY --from=builder /app/build .
# Containers run nginx with global directives and daemon off
ENTRYPOINT ["nginx", "-g", "daemon off;"]