const Usuario = require('../models/usuario');


const existeUsuarioPorId = async( id ) => {

    const usuario = await Usuario.findByPk( id );

    // Busca al usuario por su id en la BD 
    // Si el usuario no existe devuelve error 404
    if( !usuario ) {
        return res.status(404).json({
            msg: 'No existe un usuario con el id ' + id
        });
    }
} 

module.exports = {
    existeUsuarioPorId,
}