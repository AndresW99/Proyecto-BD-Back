//TODO: Agregar el script de start
//TODO: Agregar mssql

require('dotenv').config();
const Server = require('./models/server');

const server = new Server();

server.listen();