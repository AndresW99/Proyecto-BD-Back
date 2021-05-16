/*
    path: /api/proveedor
*/

const { response } = require('express');

// const Producto = require('../models/producto');
const Proveedor = require('../models/proveedor');


const crearProveedor = async( req, res = response ) => {

    const { body } = req;

    try {

        // Buscara si ya existe un proveedor
        const existeProveedor = await Proveedor.findOne({
            where: {
                nombre: body.nombre
            }
        });

        // Si ya existe alguien con ese nombre no continua
        if( existeProveedor ) {
            return res.status(400).json({
                msg: 'Ya existe el proveedor: '+ body.nombre
            });
        }

        // Creamos el nuevo proveedor
        const proveedor = new Proveedor( body );
        await proveedor.save();

        res.json( proveedor );

    } catch (error) {
        
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        });

    }
}


// const obtenerProveedor = async( req, res = response ) => {

//     // Buscamos a los proveedores
//     const proveedor = await Proveedor.findAll({
//         where: {
//             estado: true
//         }
//     });

//     res.json( {productos} );

// }

const actualizarProveedor = async( req, res = response ) => {

    const { id } = req.params;
    // Extraemos los campos que no queremos que se puedan actualizar
    const { estado, ...resto } = req.body;

    try {

        // Busca al proveedor por su id en la BD 
        const proveedor = await Proveedor.findByPk( id );
        // Si el proveedor no existe devuelve error 404
        if( !proveedor ) {
            return res.status(404).json({
                msg: 'No existe el proveedor con el id ' + id
            });
        }

        // Actualizamos los datos que estan en nuestro modelo
        await proveedor.update( resto );

        res.json( proveedor );

    } catch (error) {
        
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        });

    }
}

const eliminarProveedor = async( req, res = response ) => {

    const { id } = req.params;

    // Busca al proveedor por su id en la BD 
    const proveedor = await Proveedor.findByPk( id );
    // Si el usuario no existe devuelve error 404
    if( !proveedor ) {
        return res.status(404).json({
            msg: 'No existe el proveedor con el id ' + id
        });
    }

    // Eliminacion fisica
    // await usuario.destroy();

    // Eliminacion logica
    await proveedor.update({ estado: false })

    res.json( proveedor );

}

module.exports = {
    crearProveedor,
    eliminarProveedor,
    actualizarProveedor,

}