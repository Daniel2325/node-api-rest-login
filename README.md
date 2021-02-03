# Servicio-Rest-Infitny-Plus
Ejecucion Local
* `npm start` o `node server.js`
Ruta para autenticarse y acceder a los servicios de la API REST
* Ruta: http://localhost:3000/login
})

---------------------- LOGIN / AUTENTICACION DEL USUARIO ADMIN --------------------
La api cuenta con diferentes peticiones, para poder hacer uso de las mismas se debera autenticar al usuario, y solo aquel con el rol de: ADMIN _ROLE podra acceder a los peticiones, la peticion configurada para este proposito es POST, y el usuario obtendra mediante una peticion una respuesta, de no ser un usuario registrado se notificara al usuario del error encerrando en parentesis al usuario o contrasenia que no coincidan o si no existe el registro.

