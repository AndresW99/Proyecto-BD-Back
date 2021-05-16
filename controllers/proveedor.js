/*
    path: /api/proveedor
*/

const { response } = require('express');

const Proveedor = require('../models/proveedor');

const obtenerProveedor = async( req, res = response ) => {

    // Buscamos a los proveedores
    const proveedor = await Proveedor.findAll({
        where: {
            estado: true
        }
    });

    res.json( {proveedor} );

}

const crearProveedor = async( req, res = response ) => {

    const nombre = req.body.nombre.toUpperCase();

    try {

        // Verifica si existe el proveedor
        const existeProveedor = await Proveedor.findOne({
            where: {
                nombre: nombre
            }
        }); 
        
        // Si existe entonces devuelve error
        if( existeProveedor ) {
            return res.status(400).json({
                msg: `Ya existe el proveedor: ${ existeProveedor.nombre }`
            });
        }
    
        // Generar data a guardar con el uid el JWT
        const data = {
            nombre,
            usuario: req.usuario.id
        }
        
        // Creamos el nuevo proveedor
        const proveedor = new Proveedor( data );
        
        // Lo guardamos
        await proveedor.save();
    
        res.status(201).json( proveedor );
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
        msg: 'Hable con el administrador'
        });
    }
}

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

    // Eliminacion logica
    await proveedor.update({ estado: false })

    res.json( proveedor );

}

module.exports = {
    crearProveedor,
    eliminarProveedor,
    actualizarProveedor,
    obtenerProveedor,
}