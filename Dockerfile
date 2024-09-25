FROM node:18-alpine as build

WORKDIR /app

COPY package*.json .

RUN NODE_OPTIONS="--max-old-space-size=10192" npm install

COPY . .

FROM nginx:alpine

COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]