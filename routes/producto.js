/*
    path: /api/productos
*/

const { Router } = require('express');
const { obtenerProductos,
        obtenerProductosPorId,
        actualizarProducto,
        eliminarProducto, 
        crearProducto} = require('../controllers/producto');

const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

// Crear producto
router.post('/', crearProducto );

//Obtener productos
router.get('/', obtenerProductos);

// Obtener usuario por ID
router.get('/:id', [ validarCampos ], obtenerProductosPorId );

// Actualizar usuario
router.put('/:id', [ validarCampos ], actualizarProducto );

// Eliminación de usuarios
router.delete('/:id', [ validarCampos ], eliminarProducto );


module.exports = router;