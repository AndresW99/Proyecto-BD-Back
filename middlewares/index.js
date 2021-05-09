
const validaCampos = require('../middlewares/validar-campos');
const validarJWT   = require('../middlewares/validar-jwt');
const validaRol    = require('../middlewares/validar-roles');

module.exports = {
    ...validaCampos,
    ...validarJWT,
    ...validaRol,
}

