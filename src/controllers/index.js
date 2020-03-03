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

const consultaRepetida = async (correoc) => {
    const response = await pool.query('SELECT * FROM persona where correo = $1', [correoc]);
    return response.rows;
};

const consultaId = async (id) => {
    const persona = await pool.query('SELECT * FROM persona WHERE idpersona=$1', [id]);
    return persona.rows;
};

const consultaLogin = async (correoc, contrasenac) => {
    const response = await pool.query('SELECT * FROM persona where correo = $1 and contrasena = $2', [correoc, contrasenac]);
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
    const { nombres, apellidos, correo, contrasena } = req.body;
    const validarcorreo = await consultaRepetida(correo);
    console.log("holaaa");
    if (validarcorreo == 0) {
        const response = await pool.query('INSERT INTO persona (nombres, apellidos, correo, contrasena) VALUES ($1, $2, $3, $4)', [nombres, apellidos, correo, contrasena]);
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
        res.render('login.html');
        console.log('vaciooo');
    } else if (validarsesion == 0) {
        res.render('login.html');
    } else if (validarsesion[0].rol == 'usuario') {
        res.render('PrincipalUsuario.html', { datospersona: validarsesion, datos: response });
    } else if (validarsesion[0].rol == 'evaluador') {
        res.render('PrincipalEvaluador.html', { datospersona: validarsesion, datos: response });
    } else if (validarsesion[0].rol == 'administrador') {
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
    console.log('hola');
    const id = req.params.id;
    const persona = await consultaId(id);
    const { titulo, fecha, descripcion, tipo } = req.body;
    const response = await pool.query('INSERT INTO documento (titulo, fecha_publicacion, descripcion, tipo_idtipo, idpersona) VALUES ($1, $2, $3, $4, $5)', [titulo, fecha, descripcion, tipo, id]);
    res.render('subirarchivo.html', { datospersona: persona });
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
    const persona = await consultaId(id);
    res.render('subirarchivo.html', { datospersona: persona });
};

const InformacionDocumento = async (req, res) => {
    const id = req.params.id;
    const persona = await consultaId(id);
    res.render('infodocumento.html', { datospersona: persona });
};

const InformacionDocumentoEvaluador = async (req, res) => {
    const id = req.params.id;
    const persona = await consultaId(id);
    res.render('infodocumentoadmin.html', { datospersona: persona });
};

const InformacionDocumentoOut =  (req, res) => {
    res.render('infodocumentoout.html');
};

const Evaluar = async (req, res) => {
    const id = req.params.id;
    console.log('Holaaaa 1');
    const persona = await consultaId(id);
    res.render('evaluacion.html', { datospersona: persona });
};

const EvaluarDocumento = async (req, res) => {
    const { estructura, tematica, contenido, citas, calidad, coherencia, comentarios } = req.body;
    const response = await pool.query('INSERT INTO evaluacion (fechaevaluacion, notafinal, iddocumento, idpersona) VALUES ($1, $2, $3, $4, $5)', [titulo, fecha, descripcion, tipo, id]);
    const id = req.params.id;
    const persona = await consultaId(id);
    res.render('evaluacion.html', { datospersona: persona });
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
    BorrarDocumento, SubirDocumento, EvaluarDocumento, InformacionDocumentoEvaluador, InformacionDocumentoOut
};
