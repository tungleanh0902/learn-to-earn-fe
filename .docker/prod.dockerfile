FROM node:20-alpine AS build

RUN mkdir -p /app

WORKDIR /app

COPY package*.json ./

RUN npm install --legacy-peer-deps

COPY . .

RUN npm install -g typescript

RUN npm run build

FROM nginx:alpine AS run

WORKDIR /app 

COPY --from=build /app/dist/ /usr/share/nginx/html
COPY --from=build /app/.nginx/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]