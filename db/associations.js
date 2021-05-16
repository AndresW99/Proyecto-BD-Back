

const Usuario   = require('../models/usuario'); 
const Producto  = require('../models/producto'); 
const Proveedor = require('../models/proveedor');

// Producto tiene un usuario
// Añade una clave foranea productoId a la tabla Usuario
Usuario.hasOne(Producto);

// Añade una clave UsuarioId a la tabla Productos
Producto.belongsTo(Usuario);

// Añade una clave foraneo productoId a la tabla proveedor
Proveedor.hasOne(Producto);

// Añade una clave ProveedorId a la tabla de productos
Producto.belongsTo(Proveedor);