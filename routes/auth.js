
// Rutas de /Auth 
// host + /api/auth

const { Router } = require('express');
const { check } = require('express-validator');
const { crearUsuario, loginUsuario, revalidarToken } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');
const router = Router();

// Crear usuario
router.post(
    '/new',
    [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('correo', 'El correo es obligatorio').isEmail(),
        check('contrasenia', 'La contraseña debe tener 6 caracteres').isLength({min: 6 }),
        validarCampos
    ], 
    crearUsuario );

// Logeo de usuario
router.post(
    '/', 
    [
        check('correo', 'El correo es obligatorio').isEmail(),
        check('contrasenia', 'La contraseña es obligatoria').not().isEmpty(),
        validarCampos
    ], 
    loginUsuario );

// Revalidar token
router.get('/renew', revalidarToken );

module.exports = router;