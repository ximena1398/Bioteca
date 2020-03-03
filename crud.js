const conexion = require("conexion");

var nombres = document.getElementById('Nombres');
var apellidos = document.getElementById('Apellidos');
var Correo = document.getElementById('Correo');
var Contrasena = document.getElementById('Contrasena');

module.exports = {
    insertar(nombres, apellidos, Correo, Contrasena) {
        return new Promise((resolve, reject) => {
            conexion.query(`insert into persona
            (nombres, apellidos, correo, contrasena)
            values
            (?, ?)`,
                [nombres, apellidos, correo, contrasena], (err, resultados) => {
                    if (err) reject(err);
                    else resolve(resultados.insertId);
                });
        });
    },
    
}