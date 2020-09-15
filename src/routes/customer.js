//se colocan las rutas de nuestro servidor

const { Router } = require('express');
const router = Router();

const {controller, session, UsuarioPrincipal, postularDocumento, InformacionDocumento, EvaluadorPrincipal,
     RevisarPostulaciones, SubirArchivoEvaluador, Evaluar, Registrar, OlvidasteContrasena, RegistrarPersona, RegistrarDocumento, 
     getDocumento, IniciarSesion, BorrarPersona, actualizar, Actualizarpersona, BorrarDocumento, SubirDocumento, EvaluarDocumento,
     InformacionDocumentoEvaluador, InformacionDocumentoOut, clasificacion, inicio, Buscar}= require('../controllers/index');

//rutas vistas
router.get('/', controller);
router.get('/login', session);
router.get('/index/:id', inicio);
router.get('/index', inicio);

//router.get('/mispostulacione', MisPostulaciones);
router.get('/postular/:id', postularDocumento);
router.post('/infodocumento', InformacionDocumento);
router.post('/infodocumentoadmin/:id', InformacionDocumentoEvaluador);
router.get('/PrincipalEvaluador/:id', EvaluadorPrincipal);
router.get('/Postulaciones/:id', RevisarPostulaciones);
router.get('/subirarchivo/:id', SubirArchivoEvaluador);
router.post('/evaluacion/:id', Evaluar);
router.post('/index/:id', clasificacion);
router.post('/index', clasificacion);
router.get('/infodocumentoout', InformacionDocumentoOut);

router.get('/RegistroUsuario', Registrar);
router.get('/forgot-password', OlvidasteContrasena);
router.get('/mispostulacione/:id', getDocumento);

//rutas metodos
router.post('/Registrar', RegistrarPersona);
router.post('/EvaluarDocumento/:idpersona', EvaluarDocumento);
router.post('/PostularDocumento2/:id', RegistrarDocumento);
router.post('/subirDocumento/:id', SubirDocumento);
router.post('/IniciarSesion', IniciarSesion);
router.post('/BorrarPersona/:idpersona', BorrarPersona);
router.post('/Buscar/:id', BorrarPersona);
router.get('/Actualizar/:idpersona', actualizar);
router.post('/Actualizarpersona', Actualizarpersona);
router.post('/BorrarDocumento/:idpersona', BorrarDocumento);
//router.get('/BorrarDocumento/:id', BorrarDocumento);

router.get('/PrincipalUsuario/:id', UsuarioPrincipal);
module.exports = router;