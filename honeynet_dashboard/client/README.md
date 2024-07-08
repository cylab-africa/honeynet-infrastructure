# Frontend

## Running the frontend locally
- Clone the git repository and navigate to the `client` directory

- Run the command `npm start` to start the server

## Running the frontend via Docker file
- Clone the git repository and navigate to the `client` directory

- Run the command `docker build -t frontend .` to build the client component

- Execute the command `docker run -d --restart unless-stopped -p <'ip_of_hosting_device'>:<'port'>:<'port'> frontend` to run the container and make it available on the ip_address and port of your choosing
