const { response } = require('express');

const Producto  = require('../models/producto');
const Usuario   = require('../models/usuario');
const Proveedor = require('../models/proveedor');


const tablasPermitidas = [
    'usuarios',
    'productos',
    'proveedor'
];

const buscarUsuarios = async( termino = '', res = response ) => {

    // Busca al usuario por su nombre
    const usuarios = await Usuario.findOne({
        where: {
            nombre: termino,
            estado: true
        },
    })

    res.json({
        results: (usuarios) ? [usuarios] : []    
    });
}

const buscarProductos = async( termino = '', res = response ) => {

    // Busca los productos por su nombre
    const productos = await Producto.findOne({
        where: {
            nombre: termino,
            estado: true
        }
    });

    res.json({
        results: ( productos ) ? [ productos ] : []
    });
}

const buscarProveedor = async( termino = '', res = response ) => {

    // Busca los proveedores
    const proveedores = await Proveedor.findOne({
        where: {
            nombre: termino,
            estado: true
        }
    });

    res.json({
        results: ( proveedores ) ? [ proveedores ] : []
    });
}

const buscar = ( req, res = response ) => {

    const { tabla, termino } = req.params;

    // Verifica que existan las tablas que deseamos buscar
    if( !tablasPermitidas.includes( tabla ) ) {
        return res.status(400).json({
            msg: `Las tablas permitidas son: ${ tablasPermitidas }`
        });
    }

    switch ( tabla ) {
        case 'usuarios':
            buscarUsuarios( termino, res );
        break;

        case 'productos':
            buscarProductos( termino, res );
        break;

        case 'proveedor':
            buscarProveedor( termino, res );
        break;
        
        default:
            res.status(500).json({
                msg: 'No pense en esa buscada inge :('
            })
    }
}

module.exports = {
    buscar
}