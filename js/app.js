
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

var Nombres = document.getElementById('Nombres');
var Apellidos = document.getElementById('Apellidos');
var Correo = document.getElementById('Correo');
var Contrasena = document.getElementById('Contrasena');
var RContrasena = document.getElementById('RContrasena');

function InsertarUsuario() {
    alert("holi");
    db.collection("Usuarios").add({
        Nombres: Nombres.value,
        Apellidos: Apellidos.value,
        Correo: Correo.value,
        Contrasena: Contrasena.value,
        RContrasena: RContrasena.value
    })
        .then(function (docRef) {
            console.log("Usuario agregado", docRef.id);
        })
        .catch(function (error) {
            console.error("Error", error);
        });
}



