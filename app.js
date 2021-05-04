//TODO: Agregar el script de start
//TODO: Agregar rutas para la autenticacion
//TODO: Agregar rutas para los productos

require('dotenv').config();
const Server = require('./models/server');

const server = new Server();

server.listen();