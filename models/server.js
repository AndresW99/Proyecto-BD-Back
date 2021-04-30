const express = require('express');
const cors = require('cors');

const db = require('../db/connection');
 
class Server {

    constructor() {

        this.app = express();
        this.port = process.env.PORT;

        // Rutas del endpoint
        this.paths = {

            usuario: '/api/usuarios',

        }

        // Base de datos
        this.dbConnection();

        // Rutas de mi aplicacion
        this.routes();

        // Middlewares
        this.middlewares();
    }


        listen() {
            this.app.listen( this.port, () => {
            console.log('Sevidor corriendo en puerto', this.port );
        });
    }

    // Conexion a la base de datos
    async dbConnection() {

        try {
            
            await db.authenticate();
            console.log('Database online');

        } catch (error) {
            throw new Error( error );
        }

    }

    middlewares() {

        // CORS 
        this.app.use( cors() );

        // Lectura y parseo del body
        this.app.use( express.json() );

        // Directorio publico que buscara el backend 
        this.app.use( express.static('public') );

    }

    routes() {

        this.app.use( this.paths.usuario, require('../routes/usuario') );

    }
}

module.exports = Server;