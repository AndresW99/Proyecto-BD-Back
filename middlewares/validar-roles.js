const { response } = require('express');


const esAdminRole = ( req, res = response, next) => {

    // Validamos primero el token
    if( !req.usuario ) {
        return res.status(500).json({
            msg: 'Se quiere verificar el rol sin validar el token primero'
        });
    }

    // Extraemos el rol y nombre de la request 
    const { rol, nombre } = req.usuario;

    // Si el rol es diferente de ADMIN no le permitimos realizar la accion
    if( rol !== 'ADMIN' ) {
        return res.status(401).json({
            msg: `${ nombre } no es administrador - No puede hacer esto`
        });
    }

    next();

}

module.exports = {
    esAdminRole
}