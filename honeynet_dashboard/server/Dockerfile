FROM node:20-alpine

WORKDIR /server_app

ENV DB_HOST=<remote_ip>
ENV DB_USER=<remote_user>
ENV DB_PASSWORD=<remote_db_password>
ENV DB_PORT=<remote_port>
ENV DB_NAME=<remote_db>
ENV PORT=5005
ENV SECRET_KEY=<secret_key>
ENV ORIGIN=http://<remote_ip>:3005
ENV TZ=Africa/<time_zone>

COPY package*.json /server_app/

RUN npm install

COPY . .

EXPOSE 5005

CMD ["npm", "run", "dev"]