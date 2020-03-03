// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyBBef4UHTtd4-dJzRgrfoZcm-haFVUIGeU",
    authDomain: "proyecto-bioteca.firebaseapp.com",
    databaseURL: "https://proyecto-bioteca.firebaseio.com",
    projectId: "proyecto-bioteca",
    storageBucket: "proyecto-bioteca.appspot.com",
    messagingSenderId: "357420235789",
    appId: "1:357420235789:web:7bdd709aab91a6deb36944"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var db = firebase.firestore();

var TituloDocumento = document.getElementById('Titulo');
var Descripcion = document.getElementById('Descripcion');
var FechaPublicacion = document.getElementById('FechaPublicacion');
var Categorias = document.getElementById('Categorias');
var Tipos = document.getElementById('Tipos');

var idPostulaciones = "";
var Postular = document.getElementById('Postular');

var MiPostulacion = document.getElementById('MiPostulacion');

function PostularDocumento() {
    alert("holi");
    db.collection("Documentos").add({
        TutuloDocumento: TituloDocumento.value,
        Descripcion: Descripcion.value,
        FechaPublicacion: FechaPublicacion.value,
        Categoria: Categorias.value,
        Tipo: Tipos.value
    })
        .then(function (docRef) {
            console.log("Usuario agregado", docRef.id);
            MisPostulaciones();
        })
        .catch(function (error) {
            console.error("Error", error);
        });
}

function MisPostulaciones() {
    MiPostulacion.innerHTML = "";
    db.collection("Documentos").get().then((querySnapshot) => {
        querySnapshot.forEach(async(doc) => {
            MiPostulacion.innerHTML += `
                <tr>
                    <td>${doc.data().TutuloDocumento}</td>
                    <td>${doc.data().FechaPublicacion}</td>
                    <td>Pendiente</td>
                </tr>
            `;
        });
    });
}

//lee la noticia y la muestra en los input 
function leerPostulacionesID(id) {;
    idPostulaciones = id;
    Postular.classList.add('d-none');
    db.collection("Documentos").doc(id)
        .onSnapshot(async function(doc) {
            TituloDocumento.value = doc.data().TutuloDocumento;
            FechaPublicacion.value = doc.data().FechaPublicacion;
        });
}

MisPostulaciones();