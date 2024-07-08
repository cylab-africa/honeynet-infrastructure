FROM node:20-alpine

WORKDIR /client_app

ENV REACT_APP_API_URL=http://<server_ip>:5005/api/v1
ENV PORT=3005

COPY package*.json /client_app/

RUN npm config set legacy-peer-deps true

RUN npm install

COPY . .

EXPOSE 3005

CMD ["npm", "start"]