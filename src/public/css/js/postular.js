// Your web app's Firebase configuration

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
    }, function(){
        //var downloadURL= task.snapshot.downloadURL;
        //CrearEnStorage()
    });
    };
    
    function Descargar(){
        Name=document.getElementById("TituloParaDescargar");
        var storageRef=firebase.storage().ref().child('images/stars.jpg');
        storageRef.getDownloadURL().then(function(url) {
          // Or inserted into an <img> element:
          document.getElementById('download').click();
        }).catch(function(error) {
          alert(error.code)
          // Handle any errors
        });
    }

    function Visualizar(){
      Name=document.getElementById("TituloParaDescargar");
      var storageRef=firebase.storage().ref().child(Name.innerHTML);
      storageRef.getDownloadURL().then(function(url) {
        var win = window.open(url, '_blank');
        if (win) {
           win.focus();
        } else {
          alert('Please allow popups for this website');
}
      }).catch(function(error) {
        alert(error.code)
        // Handle any errors
      });
  }

  function VisualizarPostulaciones(){
    var NombreDocumentoPostulaciones=document.getElementById("NombreDocumentoPostulaciones");
    var storageRef=firebase.storage().ref().child(NombreDocumentoPostulaciones.value);
    storageRef.getDownloadURL().then(function(url) {
      var win = window.open(url, '_blank');
      if (win) {
         win.focus();
      } else {
        alert('Please allow popups for this website');
}
    }).catch(function(error) {
      alert(error.code)
      // Handle any errors
    });
}

  
    function AgregarAutorInput(){
        ContadorAutores.value=c
        c++;
        var label=document.createElement("LABEL");
        var input=document.createElement("INPUT");
        var label1=document.createElement("LABEL");
        var input1=document.createElement("INPUT");
        input.type='text';
        input.name='NombreAutores'+c;
        input.className="form-control form-control-user"
        input1.type='text';
        input1.name='ApellidoAutores'+c;
        input1.className="form-control form-control-user"
        label.innerHTML="Nombres";
        label1.innerHTML="Apellidos";

        DivForm.appendChild(label);
        DivForm.appendChild(input);
        DivForm.appendChild(label1);
        DivForm.appendChild(input1);  
    }

    

 

    