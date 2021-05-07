//TODO: Agregar rutas para la autenticacion
//TODO: Agregar rutas para los productos
//TODO: Probar agregar un id con pk en el managment

require('dotenv').config();
const Server = require('./models/server');

const server = new Server();

server.listen();