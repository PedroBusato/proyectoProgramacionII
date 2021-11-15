var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require("express-session");                                             //Requerimos el paquete de session
const db = require("./database/models"); 

var indexRouter = require('./routes/index');
var postRouter = require("./routes/post");
var perfilRouter = require("./routes/perfiles");

var app = express();
// db.sequelize.sync({alter:true})                                                       //Esta linea sincroniza los modelos con la base de datos

// Configuramos el session -> queremos que la informacion de session este disponible en todas las paginas. En los controladores podriamos poner req.session.nombrePropiedad y guardar informacion en session
app.use(session( 
  { secret: "secret",
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
    } 
  }
));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());                                                              //Nos convierte la informacion ingresada por formulario en formato json
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// app.use(express.static("public"));

// Middleware de Cookies -                                                            // En esta funcion middleware refrescamos nuestra sesion a partir de la cookie de nombre userId! --> No se trata de crear la sesion propiamente, sino refrescarla a partir de nuestr cookie!
app.use( async (req, res, next) => {
  if (req.cookies.userId != undefined && req.session.user == undefined) {             // Pone en la sessión lo que está en la cookie SÓLO si la sesión está vacía --> permite extender la sesion cuando esta se corta, es decir, cuando hacemos cambios en el codigo
    let user = await db.User.findByPk(req.cookies.userId);                            // Buscamos el usuario mediante el nombre de usuario que se ingresa en el input del formulario
    req.session.user = user;                                                          // Se trata de req.cookies.userId ya que esta cookie fue creada en el indexController cuando el usuario se loguea
  }
  next(); 
});

// Middleware de Session -
app.use((req, res, next) => {
  res.locals.userLogedIn = {}                                                         // Si no entra al if de debajo, envia userLogedIn como un objeto vacio, pero debe enviarlo ya que sino el if de la vista de header no funciona!
  if (req.session.user != undefined) {                                                // Si estamos en sesion, guarda la informacion del usuario en sesion res.locals.userLoguedIn para enviarla a todas las vistas
    res.locals.userLogedIn = req.session.user;                                        // "Locals" es una variable global de express que se envia a todas las vistas --> Accedemos a su informacion mediante userLogedIn.loQueNecesitemos
  }                                                                                   // La asignacion de datos a la variable res.locals debe estar siempre antes de la declaracion de las rutas
  next();
});

app.use('/', indexRouter);
app.use("/profile", perfilRouter);
app.use("/post", postRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
}); 

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
