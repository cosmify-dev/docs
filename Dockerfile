# ---------- Build ----------
FROM node:20 AS builder

WORKDIR /app

RUN corepack enable

COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile

COPY . .

RUN yarn build

# ---------- Prod ----------
FROM nginx:stable-alpine

COPY --from=builder /app/.output/public /usr/share/nginx/html

COPY nginx/default.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
