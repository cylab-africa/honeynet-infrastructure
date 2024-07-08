const express = require('express');
const { createServer } = require("http");
const dotenv = require('dotenv');
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const { connectDB } = require('./db/db_connection');
const routes = require('./routes/main_route');
const app = express();
const server = createServer(app);

dotenv.config();

app.use(
    cors({
        origin: process.env.ORIGIN,
        credentials: true,
    })
);
app.use(bodyParser.json());
app.use(cookieParser(process.env.SECRET_KEY));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", routes);

connectDB();

let PORT = process.env.PORT || 7000;
server.listen(PORT, () => {
    console.log(`Server is up and running on http://localhost:${PORT}\n`);
});
