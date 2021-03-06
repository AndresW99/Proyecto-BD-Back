/*
    path: /api/proveedor
*/

const { Router } = require('express');
const { check } = require('express-validator');

const { crearProveedor,
        actualizarProveedor,
        eliminarProveedor, 
        obtenerProveedor} = require('../controllers/proveedor');

const { validarJWT, validarCampos, esAdminRole } = require('../middlewares');

const router = Router();

// Crear proveedor
router.post( 
    '/',
    [
        validarJWT,
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        validarCampos
    ], 
    crearProveedor );

//Obtener proveedores
router.get('/', obtenerProveedor );

// Actualizar proveedor
router.put(
    '/:id', 
    [ 
        validarJWT,
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        validarCampos
    ], 
    actualizarProveedor);

// Eliminación de proveedor
router.delete(
    '/:id', 
    [
        validarJWT,
        esAdminRole,
    ], 
    eliminarProveedor );


module.exports = router;