// Your web app's Firebase configuration

var firebaseConfig = {
    apiKey: "AIzaSyC7rFd7iqWu-w_DD51AihdP4IOLbnHIbYU",
    authDomain: "bioteca-4645c.firebaseapp.com",
    databaseURL: "https://bioteca-4645c.firebaseio.com",
    projectId: "bioteca-4645c",
    storageBucket: "bioteca-4645c.appspot.com",
    messagingSenderId: "68695445537",
    appId: "1:68695445537:web:e906ddc54407fbd1985360",
    measurementId: "G-30E3QJVZFP"
  };
  // Initialize Firebase
    firebase.initializeApp(firebaseConfig);

    var TituloDocumento = document.getElementById('Titulo');
    var Descripcion = document.getElementById('Descripcion');
    var FechaPublicacion = document.getElementById('FechaPublicacion');
    var Categorias = document.getElementById('Categorias');
    var Tipos = document.getElementById('Tipos');
    var Cargar = document.getElementById('Cargar');
    var uploader=document.getElementById('uploader');
    var LabelArchivo=document.getElementById('LabelArchivo');
    var Archivo=document.getElementById('customFileLang');
    var ContadorAutores=document.getElementById('ContadorAutores');
    var DivForm=document.getElementById('DivForm');
    var Agregador=document.getElementById("Agregador");
    var FormSubir=document.getElementById("FormSubir");
    var c=0;


    Archivo.addEventListener('change', function(e){
        TituloDocumento.value=e.target.files[0].name;
        TituloDocumento.disabled=false;
        Descripcion.disabled=false;
        FechaPublicacion.disabled=false;
        Categorias.disabled=false;
        Tipos.disabled=false;
        Cargar.disabled=false;
        Agregador.disabled=false;
        LabelArchivo.innerHTML=e.target.files[0].name;
    }); 

    function Firebase(){
    var file=Archivo.files[0];
    var storageRef=firebase.storage().ref().child(file.name);
    var task=storageRef.put(file);
    
    task.on('state_changed',
    function progress(snapshot){
        var p=(snapshot.bytesTransferred/snapshot.totalBytes)*100;
        uploader.value=p;
        if(p==100){
            FormSubir.submit();
        }
    });
    };

    function AgregarAutorInput(){
        ContadorAutores.value=c
        c++;
        var input=document.createElement("INPUT");
        input.type='text';
        input.name='Autores'+c;
        input.className="form-control form-control-user"

        DivForm.appendChild(input);
    }

    