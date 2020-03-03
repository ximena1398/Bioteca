const express = require('express');
const app = express();
const path = require('path');//une directorios

//servidor, plantillas, etc
app.set('port', process.env.PORT || 4000); //busca un puerto en el pc sino encuentra usa 4000

//midlawares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//control de vistas
app.set('view engine', 'ejs');
app.engine('html',require('ejs').renderFile);
app.set('views', path.join(__dirname, 'views')); //dirname me da la ruta desde el so del archivo desde donde se ejecuta

//impotar routas
const customerRoutes = require('./routes/customer');

//rutas
app.use('/',customerRoutes);

//static files
app.use(express.static(path.join(__dirname, 'public')));


//inicializar el servidor
//app.listen(app.get('port'), () =>{
  //  console.log('server on port 4000');
//})

app.listen(app.get('port'));
console.log('Servidor iniciado en puerto', app.get('port'));