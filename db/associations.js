

const Usuario  = require('../models/usuario'); 
const Producto = require('../models/producto'); 

// Producto tiene un usuario
// Añade una clave foranea productoId a la tabla Usuario
Usuario.hasOne(Producto);

// Añade una clave UsuarioId a la tabla Productos
Producto.belongsTo(Usuario);