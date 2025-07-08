var usuarios = [
	{id: 1, nombre: "Ale", pass: "abc", calif: "admin"},
	{id: 2, nombre: "Spiderman", pass: "cba", calif: "admin"},
	{id: 3, nombre: "Obed", pass: "7siuuuu", calif: "admin"},
	{id: 4, nombre: "Pancho", pass: "no se", calif: "normal"},
	{id: 5, nombre: "Pancho2.0", pass: "sisisialcocosi", calif: "normal"},
];

function Aceptar(){
	//Obtiene los valores de los campos de usuario y contraseña
	var user = document.getElementById("user").value;
	var pass = document.getElementById("pass").value;
	var encontrado = false;

	usuarios.forEach(function(u){
		// aqui verifica si usuario y contraseña coinciden
		if(u.nombre == user && u.pass == pass){
			encontrado = true;
			sessionStorage.setItem("usuarioActivo", u.nombre);
			sessionStorage.setItem("rol", u.calif);
			//te dirige según tu rol
			if(u.calif == "admin"){
				window.location = "admin.html";
			}else{
				window.location = "normal.html";
			}
		}
	});

	if(!encontrado){
		alert("Usuario y/o contraseña incorrectos.");
	}
}

// Esta función lo que hará será proteger a los administradores, si no cumple con el rol no te deja entrar. 
function validarAdmin(){
	var rol = sessionStorage.getItem("rol");//da seguridad
	if(rol != "admin"){
		alert("Lo siento, no eres administrador.");
		window.location = "index.html";
	} else {
		LlenarTabla();
	}
}

// Esta función lo que hará será proteger los usuarios normales.
//si no cumple con el rol entonces no te deja ver.
function validarNormal(){
	var rol = sessionStorage.getItem("rol");
	if(rol != "normal"){
		alert("Lo siento, no cuentas con el rol de un usuario normal.");
		window.location = "index.html";
	} else {
		var nombre = sessionStorage.getItem("usuarioActivo");
		document.getElementById("nombreUsuario").innerHTML = nombre;
	}
}
function LlenarTabla(){
	var tabla = document.getElementById("tabla");
	tabla.innerHTML = ""; //limpia la tabla
	//recorre todos los usuarios
	for(var i = 0; i < usuarios.length; i++){
		var tr = document.createElement("tr");
		var td = document.createElement("td");
		var td2 = document.createElement("td");
		var td3 = document.createElement("td");

		if(i % 2 == 0){
			tr.className = "par";
		}else{
			tr.className = "non";
		}
			//llena los datos
		td.innerHTML = usuarios[i].nombre;
		td2.innerHTML = usuarios[i].calif;
		td3.innerHTML = "Eliminar usuario";
			//se le da funcion al boton eliminar
		td2.onclick = function(){};
		td3.onclick = (function(index){
			return function(){
				Quitar(index);
			}
		})(i);

		tr.appendChild(td);
		tr.appendChild(td2);
		tr.appendChild(td3);
		tabla.appendChild(tr);
	}
}
//agrega nuevos usuarios
function Add(){
	var uno = prompt("¿Cúal es su nombre?");
	var dos = prompt("¿Cúal será su contraseña?");
	var tres = prompt("¿Cúal será su Rol?");
	var di = usuarios.length + 1;

	usuarios.push({id: di, nombre: uno, pass: dos, calif: tres});
	LlenarTabla();
}
//elimina el ultimo usuario del arreglo 
function Del(){
	usuarios.pop();
	LlenarTabla();
}
//elimina el usuario que desees 
function Quitar(indice){
	usuarios.splice(indice, 1);
	LlenarTabla();
}