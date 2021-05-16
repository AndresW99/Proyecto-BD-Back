/*
    path: /api/productos
*/

const { response } = require('express');
const Producto = require('../models/producto');
const Proveedor = require('../models/proveedor');
const Usuario = require('../models/usuario');


const crearProducto = async( req, res = response ) => {

    const { body } = req;

    try {

        // Buscara si ya existe el producto
        const existeProducto = await Producto.findOne({
            where: {
                nombre: body.nombre
            }
        });

        // Si ya existe alguien con ese correo no continua
        if( existeProducto ) {
            return res.status(400).json({
                msg: 'Ya existe el producto: '+ body.nombre
            });
        }

        // Creamos el nuevo producto
        const producto = new Producto( body );
        await producto.save();

        res.json( producto );

    } catch (error) {
        
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        });

    }
}


const obtenerProductos = async( req, res = response ) => {

    // Buscamos a los usuarios
    const productos = await Producto.findAndCountAll({
        where: {
            estado: true
        },
        attributes: ['id', 'nombre', 'precio', 'stock'],
        limit: 5,
        // Busca la relacion para mostrar el usuario y proveedor del producto
        include: [{
            model: Usuario,
            attributes: ['nombre', 'rol']
        },{
            model: Proveedor,
            attributes: ['nombre', 'disponible']
        }],
    });

    res.json( {productos} );

}

const obtenerProductosPorId = async( req, res = response ) => {

    // Extraemos el id de los params
    const { id } = req.params; 

    // Buscmaos al usaurio por su id
    const producto = await Producto.findByPk( id );

    // Si el usuario esta inactivo no lo muestra
    if( producto.estado === false ) {
        return res.status(400).json({
            msg: `El producto con el id ${ id } esta inactivo`
        });
    }

    // Validamos que exista el id
    if ( !producto ) {
        return res.status(400).json({
            msg: `No existe el producto con el id: ${ id }`
        });
    }

    res.json( producto );

}

const actualizarProducto = async( req, res = response ) => {

    const { id } = req.params;
    // Extraemos los campos que no queremos que se puedan actualizar
    const { estado, ...resto } = req.body;

    try {

        // Busca al usuario por su id en la BD 
        const producto = await Producto.findByPk( id );
        // Si el producto no existe devuelve error 404
        if( !producto ) {
            return res.status(404).json({
                msg: 'No existe el producto con el id ' + id
            });
        }

        // Actualizamos los datos que estan en nuestro modelo
        await producto.update( resto );

        res.json( producto );

    } catch (error) {
        
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        });

    }
}

const eliminarProducto = async( req, res = response ) => {

    const { id } = req.params;

    // Busca al producto por su id en la BD 
    const producto = await Producto.findByPk( id );
    // Si el usuario no existe devuelve error 404
    if( !producto ) {
        return res.status(404).json({
            msg: 'No existe el producto con el id ' + id
        });
    }

    // Eliminacion fisica
    // await usuario.destroy();

    // Eliminacion logica
    await producto.update({ estado: false })

    res.json( producto );

}

module.exports = {
    obtenerProductos,
    obtenerProductosPorId,
    actualizarProducto,
    eliminarProducto,
    crearProducto
}