//========================== Load Modules Start ===========================

//========================== Load internal Module =========================

const express = require('express');
const dotenv = require('dotenv');
const server = express();
const cookieParser = require('cookie-parser');

//========================== Load Modules End =============================

//============================= Config File Path =============================
dotenv.config({path: './config.env'});

//============================= Load Database Connection File =============================
require('./database/dbconnection');

//passes the cookie which is realated to user
// server.use(cookieParser());

//============================= Convert Data to Json data =============================
server.use(express.json());

//============================= Link Router File =============================
server.use(require('./Routers/routes'));

//============================= server Port =============================
const PORT = process.env.PORT;

//============================= Run server =============================
server.listen(PORT, () => {
    console.log(`server is running in port ${PORT}`);
});