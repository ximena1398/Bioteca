const { Pool } = require('pg');
const localStorage = require('localStorage')

const pool = new Pool({
    host: 'ec2-184-72-236-3.compute-1.amazonaws.com',
    database: 'dajcmih02nn8h3',
    user: 'tfoifjxiegxqlz',
    password: '319b2abb789a58e7ca790c4095fd0ab27d9daa9ddd7dd93cc044bc6a10ed209b',
    port: 5432,
    ssl: {
        rejectUnauthorized: false
    }
});

//consultas persona

const consulta = async (req, res) => {
    const response = await pool.query('SELECT * FROM persona');
    return response.rows;
};
const consultaIdDocumento = async (id) => {
    const documento = await pool.query('SELECT * FROM documento WHERE iddocumento=$1', [id]);
    return documento.rows;
};
const consultaRepetida = async (correoc) => {
    const response = await pool.query('SELECT * FROM persona where correo = $1', [correoc]);
    return response.rows;
};

const consultaId = async (id) => {
    const persona = await pool.query('SELECT * FROM persona WHERE idpersona=$1', [id]);
    return persona.rows;
};

const consultaLogin = async (correoc, contrasenac) => {
    const response = await pool.query('SELECT * FROM persona WHERE correo = $1 and contrasena = $2', [correoc, contrasenac]);
    return response.rows;
};

//consultas documento

const consultaUsuarioDocumento = async (req, res) => {
    const response = await pool.query('SELECT * from documento inner join persona on documento.idpersona = persona.idpersona');
    return response.rows;
};

const consultaUsuarioDocumentoId = async (idpersona) => {
    const response = await pool.query('SELECT * from documento inner join persona on documento.idpersona = persona.idpersona');
    return response.rows;
};

//crud persona

const RegistrarPersona = async (req, res) => {
    const { nombres, apellidos, correo, contrasena} = req.body;
    const validarcorreo = await consultaRepetida(correo);
    console.log("holaaa");
    if (validarcorreo == 0) {
        const response = await pool.query('INSERT INTO persona (nombres, apellidos, correo, contrasena, rol) VALUES ($1, $2, $3, $4, $5)', [nombres, apellidos, correo, contrasena, 2]);
        console.log('Emtro aqui');
        res.render('RegistroUsuario.html');
    } else if (validarcorreo != 0) {
        res.render('RegistroUsuario.html');
    }

};

const actualizar = async (req, res) => {
    const id = req.params.idpersona;
    const response2 = await consulta();
    const response3 = await consultaId(id);
    const response = await pool.query('SELECT * FROM persona WHERE idpersona=$1', [id]);
    res.render('persona.html', { datos: response2, registro: response.rows, datospersona: response3 });
};

const Actualizarpersona = async (req, res) => {
    const { id, rol } = req.body;
    const response3 = await consultaId(id);
    const response = await pool.query('UPDATE persona SET rol = $1 WHERE idpersona = $2', [rol, id]);
    const response2 = await consulta();
    res.render('persona.html', { datos: response2, datospersona: response3 });
}

const IniciarSesion = async (req, res) => {
    const { correo, contrasena } = req.body;
    const validarsesion = await consultaLogin(correo, contrasena);
    const response = await consultaDocumento();
    if (correo == '' || contrasena == '') {
        ms="No digitó nada";
        res.render('login.html');
    } else if (validarsesion == 0) {
        ms="No coinciden los datos con una cuenta"
        res.render('login.html');
    } else if (validarsesion[0].rol == 2) {
        res.render('index.html', { datospersona: validarsesion, datos: response });
    } else if (validarsesion[0].rol == 3) {
        res.render('index.html', { datospersona: validarsesion, datos: response });
    } else if (validarsesion[0].rol == 1) {
        const consulta2 = await consulta();
        res.render('persona.html', { datospersona: validarsesion, datos: consulta2 });
    }
};

const BorrarPersona = async (req, res) => {
    const id = req.params.id;
    const response = await pool.query('DELETE FROM persona WHERE idpersona=$1', [id]);
    const response2 = await consulta();
    res.render('persona.html', { datos: response2 });
};


const BorrarDocumento = async (req, res) => {
    console.log('holaa');
    const id = req.params.id;
    const idpersona = req.params.idpersona;
    const response = await pool.query('DELETE FROM documento WHERE iddocumento=$1', [id]);
    const persona = await consultaId(idpersona);
    const DocumentoUsuario = await consultaUsuarioDocumento();
    console.log(persona);
    // const persona = await consultaId(DocumentoUsuario[0].idpersona);
    res.render('Postulaciones.html', { datos: DocumentoUsuario, datospersona: persona });
};



const UsuarioPrincipal = async (req, res) => {
    const response2 = await consultaDocumento();
    const id = req.params.id;
    console.log(id);
    const response = await consultaId(id);
    res.render('PrincipalUsuario.html', { datospersona: response, datos: response2 });
};

const EvaluadorPrincipal = async (req, res) => {
    const response2 = await consultaDocumento();
    const id = req.params.id;
    console.log(id);
    const response = await consultaId(id);
    res.render('PrincipalEvaluador.html', { datospersona: response, datos: response2 });
};

const controller = async (req, res) => {
    const response2 = await consultaDocumento();
    res.render('index.html', { datos: response2 });
};


//documento
const consultaDocumento = async (req, res) => {
    const response = await pool.query('SELECT * FROM documento');
    return response.rows;
};

const consultaMisPostulaciones = async (idpersona) => {
    const response = await pool.query('SELECT * FROM documento where documento.idpersona = $1', [idpersona]);
    return response.rows;
};


const getDocumento = async (req, res) => {
    const id = req.params.id;
    const persona = await consultaId(id);
    const response = await consultaMisPostulaciones(id);
    //console.log(response.rows);
    res.render('mispostulacione.html', { datos: response, datospersona: persona });
};

const RegistrarDocumento = async (req, res) => {
    console.log('hola');
    const id = req.params.id;
    const persona = await consultaId(id);
    const { titulo, fecha, descripcion, tipo } = req.body;
    const response = await pool.query('INSERT INTO documento (titulo, fecha_publicacion, descripcion, tipo_idtipo, idpersona) VALUES ($1, $2, $3, $4, $5)', [titulo, fecha, descripcion, tipo, id]);
    res.render('postular.html', { datospersona: persona });
};

const SubirDocumento = async (req, res) => {
    const id = req.params.id;
    const persona = await consultaId(id);
    const { titulo, fecha, descripcion, tipo,NombreAutores1,ApellidoAutores1,contador} = req.body;
    const response = await pool.query('INSERT INTO documento (titulo, fecha_publicacion, descripcion, tipo_idtipo, idpersona) VALUES ($1, $2, $3, $4, $5)', [titulo, fecha, descripcion, tipo, id]);
    const buscarautor = await pool.query('SELECT * FROM autor WHERE nombres_autor=$1 and apellidos_autor=$2', [NombreAutores1.trim().toLowerCase(),ApellidoAutores1.trim().toLowerCase()]);
    if (buscarautor.rows==0){  
        await pool.query('INSERT INTO autor (nombres_autor, apellidos_autor) VALUES ($1, $2)', [NombreAutores1.trim().toLowerCase(),ApellidoAutores1.trim().toLowerCase()]);
    }
    const buscardocumento = await pool.query('SELECT * FROM documento WHERE titulo=$1 and fecha_publicacion=$2 and descripcion=$3 and tipo_idtipo=$4', [titulo, fecha, descripcion, tipo]);
    const buscarautorr = await pool.query('SELECT * FROM autor WHERE nombres_autor=$1 and apellidos_autor=$2', [NombreAutores1.trim().toLowerCase(),ApellidoAutores1.trim().toLowerCase()]);
    await pool.query('INSERT INTO autoresdocumento (autor_idautor, documento_iddocumento, estado_autor) VALUES ($1, $2,$3)', [buscarautorr.rows[0].idautor,buscardocumento.rows[0].iddocumento,"Activo"]);
    res.render('index.html', { datospersona: persona });
};

const postularDocumento = async (req, res) => {
    const id = req.params.id;
    const persona = await consultaId(id);
    res.render('postular.html', { datospersona: persona });
};


const RevisarPostulaciones = async (req, res) => {
    const id = req.params.id;
    const persona = await consultaId(id);
    const response = await consultaUsuarioDocumento();
    res.render('Postulaciones.html', { datos: response, datospersona: persona });
};


const SubirArchivoEvaluador = async (req, res) => {
    const id = req.params.id;
    const boolsubir=true;
    const persona = await consultaId(id);
    res.render('index.html', { datospersona: persona,boolsubir:boolsubir});
};

const InformacionDocumento = async (req, res) => {
    const { documento } = req.body;
    const bool=true;
    const infodocumento = await consultaIdDocumento(documento);
    res.render('index.html', { datos: infodocumento, bool:bool });
};

const InformacionDocumentoEvaluador = async (req, res) => {
    const { documento } = req.body;
    const id = req.params.id;
    const bool=true;
    const persona = await consultaId(id);
    const infodocumento = await consultaIdDocumento(documento);
    res.render('index.html', { datospersona: persona, datos: infodocumento,bool:bool });
};

const InformacionDocumentoOut =  (req, res) => {
    res.render('infodocumentoout.html');
};

const Evaluar = async (req, res) => {
    const { documentoid } = req.body;
    console.log('shi ' + documentoid);
    const id = req.params.id;
    const response = await pool.query('SELECT * FROM documento WHERE iddocumento=$1', [documentoid]);
    console.log(response.rows);
    const persona = await consultaId(id);
    const DocumentoUsuario = await consultaUsuarioDocumento();
    res.render('evaluacion.html', { datos: DocumentoUsuario, datospersona: persona, documento: response.rows });
};

const InsertarEvaluacion = async (fecha, nota, comentarios, iddocumento, estado) => {
    const evaluacion = await pool.query('INSERT INTO EVALUACION (fecha_evaluacion, nota_final, comentarios, iddocumento, estado_idestado) VALUES ($1, $2, $3, $4, $5)', [fecha, nota, comentarios, iddocumento, estado]);
    return evaluacion.rows;
};

const evaluacion = async (req, res) => {
    const evaluacion = await pool.query('SELECT * FROM EVALUACION');
    return evaluacion.rows;
};

const Promedio = async (idevaluacion) => {
    const prom = await pool.query('select avg(notas) from tipocriteriosevaluacion where evaluacion_idevaluacion=$1', [idevaluacion]);
    return prom.rows;
};

const NotaFinal = async (idevaluacion, nota) => {
    const notaf = await pool.query('update evaluacion set nota_final=$2 where idevaluacion=$1', [idevaluacion, nota]);
    return notaf.rows;
};

const TipoDocumento = async (tipo) => {
    const documento = await pool.query('SELECT * FROM documento WHERE tipo_idtipo=$1', [tipo]);
    return documento.rows;
};

const ClasificacionDocumento = async (clasificacion) => {
    const documento = await pool.query('SELECT * FROM documento WHERE clasificacion_idclasificacion=$1', [clasificacion]);
    return documento.rows;
};

const EvaluarDocumento = async (req, res) => {
    const { documentoid, criterio1, criterio2, criterio3, criterio4, criterio5, criterio6, comentarios } = req.body;
    var fecha = new Date();
    const idpersona = req.params.idpersona;
    console.log(idpersona);
    const persona = await consultaId(idpersona);
    const DocumentoUsuario = await consultaUsuarioDocumento();
    const consdocumento = await consultaIdDocumento(documentoid);
    console.log(consdocumento[0].tipo_idtipo);
    const Insertarevaluacion = await InsertarEvaluacion(fecha.toUTCString(), 0, comentarios, documentoid, 1);
    const evaluacion2 = await evaluacion();
    console.log(evaluacion2[evaluacion2.length-1].idevaluacion);
    if (evaluacion2[evaluacion2.length-1].idevaluacion != null) {
      const response1 = await pool.query('INSERT INTO TIPOCRITERIOSEVALUACION (evaluacion_idevaluacion, tipo_idtipo, criterios_idcriterios, notas) VALUES ($1, $2, $3, $4)', [evaluacion2[evaluacion2.length-1].idevaluacion, consdocumento[0].tipo_idtipo, 1, criterio1]);
      const response2 = await pool.query('INSERT INTO TIPOCRITERIOSEVALUACION (evaluacion_idevaluacion, tipo_idtipo, criterios_idcriterios, notas) VALUES ($1, $2, $3, $4)', [evaluacion2[evaluacion2.length-1].idevaluacion, consdocumento[0].tipo_idtipo, 2, criterio2]);
      const response3 = await pool.query('INSERT INTO TIPOCRITERIOSEVALUACION (evaluacion_idevaluacion, tipo_idtipo, criterios_idcriterios, notas) VALUES ($1, $2, $3, $4)', [evaluacion2[evaluacion2.length-1].idevaluacion, consdocumento[0].tipo_idtipo, 3, criterio3]);
      const response4 = await pool.query('INSERT INTO TIPOCRITERIOSEVALUACION (evaluacion_idevaluacion, tipo_idtipo, criterios_idcriterios, notas) VALUES ($1, $2, $3, $4)', [evaluacion2[evaluacion2.length-1].idevaluacion, consdocumento[0].tipo_idtipo, 4, criterio4]);
      const response5 = await pool.query('INSERT INTO TIPOCRITERIOSEVALUACION (evaluacion_idevaluacion, tipo_idtipo, criterios_idcriterios, notas) VALUES ($1, $2, $3, $4)', [evaluacion2[evaluacion2.length-1].idevaluacion, consdocumento[0].tipo_idtipo, 5, criterio5]);
      const response6 = await pool.query('INSERT INTO TIPOCRITERIOSEVALUACION (evaluacion_idevaluacion, tipo_idtipo, criterios_idcriterios, notas) VALUES ($1, $2, $3, $4)', [evaluacion2[evaluacion2.length-1].idevaluacion, consdocumento[0].tipo_idtipo, 6, criterio6]);
      const promedio = await Promedio(evaluacion2[evaluacion2.length-1].idevaluacion);
      const nota = await NotaFinal(evaluacion2[evaluacion2.length-1].idevaluacion, promedio[0].avg);
    }
    res.render('evaluacion.html', { datos: DocumentoUsuario, datospersona: persona, documento: consdocumento });
};

const clasificacion = async (req, res) => {
    const { libros, revistas, articulos, animales, plantas, botanica, zoologia, ecologia, conservacion, genetica } = req.body;
    const id = req.params.id;
    const response = await consultaId(id);
    var tipo = 0;
    var clasifi = 0;
    if (libros) {
        tipo = 1;
        const documentos = await TipoDocumento(tipo);
        res.render('PrincipalEvaluador.html', { datospersona: response, datos: documentos });
    } else if (revistas) {
        tipo = 2;
        const documentos = await TipoDocumento(tipo);
        res.render('PrincipalEvaluador.html', { datospersona: response, datos: documentos });
    } else if (articulos) {
        tipo = 3;
        const documentos = await TipoDocumento(tipo);
        res.render('PrincipalEvaluador.html', { datospersona: response, datos: documentos });
    } else if (animales) {
        clasifi = 1;
        const documentos = await ClasificacionDocumento(clasifi);
        res.render('PrincipalEvaluador.html', { datospersona: response, datos: documentos });
    } else if (plantas) {
        clasifi = 2;
        const documentos = await ClasificacionDocumento(clasifi);
        res.render('PrincipalEvaluador.html', { datospersona: response, datos: documentos });
    } else if (botanica) {
        clasifi = 3;
        const documentos = await ClasificacionDocumento(clasifi);
        res.render('PrincipalEvaluador.html', { datospersona: response, datos: documentos });
    } else if (zoologia) {
        clasifi = 4;
        const documentos = await ClasificacionDocumento(clasifi);
        res.render('PrincipalEvaluador.html', { datospersona: response, datos: documentos });
    } else if (ecologia) {
        clasifi = 5;
        const documentos = await ClasificacionDocumento(clasifi);
        res.render('PrincipalEvaluador.html', { datospersona: response, datos: documentos });
    } else if (conservacion) {
        clasifi = 6;
        const documentos = await ClasificacionDocumento(clasifi);
        res.render('PrincipalEvaluador.html', { datospersona: response, datos: documentos });
    } else if (genetica) {
        clasifi = 7;
        const documentos = await ClasificacionDocumento(clasifi);
        res.render('PrincipalEvaluador.html', { datospersona: response, datos: documentos });
    }
};

//vistas



const session = (req, res) => {
    res.render('login.html');
};


const Registrar = (req, res) => {
    res.render('RegistroUsuario.html');
};

const OlvidasteContrasena = (req, res) => {
    res.render('forgot-password.html');
};

//exportar
module.exports = {
    controller, session, UsuarioPrincipal, postularDocumento, InformacionDocumento, EvaluadorPrincipal,
    RevisarPostulaciones, SubirArchivoEvaluador, Evaluar, Registrar, OlvidasteContrasena, RegistrarPersona,
    RegistrarDocumento, getDocumento, IniciarSesion, BorrarPersona, actualizar, Actualizarpersona,
    BorrarDocumento, SubirDocumento, EvaluarDocumento, InformacionDocumentoEvaluador, InformacionDocumentoOut, clasificacion
};
