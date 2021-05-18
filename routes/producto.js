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
const { esAdminRole } = require('../middlewares');

const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

// Crear producto
router.post(
    '/', 
    [
        validarJWT,
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('precio', 'El precio es obligatorio').not().isEmpty(),
        check('stock', 'El stock es obligatorio').not().isEmpty(),
        validarCampos,
    ], 
    crearProducto );

//Obtener productos
router.get('/', obtenerProductos);

// Obtener producto por ID
router.get('/:id', obtenerProductosPorId );

// Actualizar producto
router.put(
    '/:id', 
    [   
        validarJWT,
        check('precio', 'El precio es obligatorio').not().isEmpty(),
        check('stock', 'El stock es obligatorio').not().isEmpty(),
        validarCampos 
    ], actualizarProducto );

// Eliminación de productos
router.delete(
    '/:id', 
    [ 
        validarJWT,
        esAdminRole,
    ], eliminarProducto );


module.exports = router;