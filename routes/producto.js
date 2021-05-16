/*
    path: /api/productos
*/

const { Router } = require('express');
const { check } = require('express-validator');

const { obtenerProductos,
        obtenerProductosPorId,
        actualizarProducto,
        eliminarProducto, 
        crearProducto} = require('../controllers/producto');

const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

// Crear producto
router.post(
    '/', 
    [
        validarJWT,
        // check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('precio', 'El precio es obligatorio').not().isEmpty(),
        check('stock', 'El stock es obligatorio').not().isEmpty(),
        validarCampos,
    ], 
    crearProducto );

//Obtener productos
router.get('/', obtenerProductos);

// Obtener usuario por ID
router.get('/:id', [ validarCampos ], obtenerProductosPorId );

// Actualizar usuario
router.put('/:id', [ validarCampos ], actualizarProducto );

// Eliminación de usuarios
router.delete('/:id', [ validarCampos ], eliminarProducto );


module.exports = router;