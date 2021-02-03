# Servicio-Rest-Infitny-Plus
Ejecucion Local
* `npm start` o `node server.js`
Ruta para autenticarse y acceder a los servicios de la API REST
* Ruta: http://localhost:3000/login
})

---------------------- LOGIN / AUTENTICACION DEL USUARIO ADMIN ------------------
La api cuenta con diferentes peticiones, para poder hacer uso de las mismas se debera autenticar al usuario, y solo aquel con el rol de: ADMIN _ROLE podra acceder a los peticiones, la peticion configurada para este proposito es POST, y el usuario obtendra mediante una peticion una respuesta, de no ser un usuario registrado se notificara al usuario del error encerrando en parentesis al usuario o contrasenia que no coincidan o si no existe el registro.

Metodo POST Login

    app.post('/login', (req, res) => {

    let body = req.body;

    Usuario.findOne({email: body.email}, (err, usuarioDB) => {
        // Errores en la conexión o consulta con la BDD
        if (err) {
            return res.status(400).json({
                ok: false,
                err,
            });
        }
        // El usuario no existe en la BDD
        if ( !usuarioDB ) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: "(Usuario) o contraseña incorrectos"
                }
            });
        }
        // La contraseña no coincide
        if (!bcrypt.compareSync(body.password, usuarioDB.password)){
            return res.status(400).json({
                ok: false,
                err: {
                    message: "Usuario o (contraseña) incorrectos"
                }
            });
        }
        // Genrar el token
        let token = jwt.sign({
            usuario: usuarioDB
        },   process.env.SEED , {expiresIn: process.env.CADUCIDAD_TOKEN}
        )
        // Si todo va bien
        res.json({
            ok: true,
            token
        })         

    });

});


-------------------- Registro de Usuario ---------------
Para registrar diferentes usuarios se configuro una petidcion post ademas de la anterior, en la cual especificamos los campos necesarios que debe tener cada usuario y tomando en cuenta que la autenticacion esta implementada en una api rest de infinity plus, que se encarga de registrar cuando se presiona el boton de cada una de sus cajas, sera necesario añadir dichios campos, de no ser necesario deberan ser eliminados.

    app.post('/caja',[verificaToken, verificaAdminRole], function(req, res) {
    let body = req.body;
    let dt = dateTime.create();
    let date = new Date()
    let fecha = dt.format('Y-m-d');
    let anio = dt.format('Y');
    let mes = dt.format('m');
    let dia = dt.format('d');
    let hora = date.getHours() + ":" + date.getMinutes()

    let info = new Datos({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        role: body.role,
        caja: body.caja,
        fecha: fecha,
        anio: anio,
        mes: mes,
        dia: dia,
        hora: hora
    })
    info.save((err, cajaDB) => {
        if (err) {
            res.status(400).json({
                ok: false,
                err
            })
        } else {
            res.json({
                ok: true,
                informacion: cajaDB
            })
        }

    })
})

---------------- PETICION GET DE REGISTROS ----------------
Para obtener los registros de la base de datos, para lo cual se establecio una peticion GET que solo funcionara si previamente el usuario fue autenticado.

    app.get('/caja',[verificaToken, verificaAdminRole], function(req, res) {
    let desde = req.query.desde || 0;
    desde = Number(desde);

    let hasta = req.query.hasta || 5;
    hasta = Number(hasta);
    
    
    let caja = req.body.informacion || '';

    Datos.find({}, 'caja fecha hora')
        .skip(desde)
        .limit(hasta)
        .exec((err, cajas) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err,
                })
            }

            Datos.countDocuments({}, (err, conteo) => {
                res.json({
                    ok: true,
                    registros: conteo,
                    cajas
                })
            })
        })
})

--------- Eliminar Registro ---------
Para poder eliminar una caja o usuario registrado se utilizo una peticion delete, que ademas de funcionar solo si el usuario fue autenticado, sera necesario conocer el id del registro o usuario que se desea eliminar de la base de datos, la sintaxis para eliminar el registro es la siguiente:

`localhost:3000/usuario/78532186218`

Si el registro se eliminar de manera correcta se indicara al usuario, caso contraria notificara del error.

    app.delete('/caja/:id', [verificaToken, verificaAdminRole],function(req, res) {
    let id = req.params.id;

    Datos.findByIdAndDelete(id, (err, regCajaEliminado) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }
        if (regCajaEliminado === null) {
            return res.status(400).json({
                ok: false,
                error: {
                    message: 'Este registro no existe'
                }
            })
        }
        res.json({
            ok: true,
            message: 'Registro eliminado correcto'
        })
    })
})
