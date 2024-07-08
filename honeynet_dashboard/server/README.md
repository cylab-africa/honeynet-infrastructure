# Backend

## Running the backend locally
- Clone the git repository and navigate to the `server` directory

- Run the command `npm run dev` to start the server

## Running the backend via Docker file
- Clone the git repository and navigate to the `server` directory

- Run the command `docker build -t backend .` to build the client component

- Execute the command `docker run -d --restart unless-stopped -p <'ip_of_hosting_device'>:<'port'>:<'port'>  backend` to run the container and make it available on the ip_address and port of your choosing
