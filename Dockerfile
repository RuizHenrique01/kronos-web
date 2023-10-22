FROM node:16.13-alpine AS builder

WORKDIR /app

COPY package.json .
RUN npm i

COPY . .

RUN npm run build 

FROM nginx:1.23.2-alpine

COPY --from=builder /app/nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=builder /app/dist /usr/share/nginx/html

COPY --from=builder /app/.env /usr/share/nginx/html

RUN touch /var/run/nginx.pid

RUN chown -R nginx:nginx /var/run/nginx.pid /usr/share/nginx/html /var/cache/nginx /var/log/nginx /etc/nginx/conf.d

USER nginx

EXPOSE 5173

CMD ["nginx", "-g", "daemon off;"]