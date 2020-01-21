const express = require("express");
const path = require("path"); // para concatenar más facil las direcciones de los archivos
const exphbs = require("express-handlebars"); //gestor de plantillas
const methodOverride = require("method-override");
const session = require("express-session"); //poder crear las sesiones de los usuarios
const flash = require("connect-flash");
const passport = require("passport");

//INITIALIZATIONS
const app = express(); // crea el servidor
require("./database"); // realiza la coneccion con la db
require("./config/passport");

//SETTINGS
app.set("port", process.env.PORT || 3000); // lo de process es en caso de que al desplegarlo nos den otro puerto
app.set("views", path.join(__dirname, "views")); //decimos donde esta la carpeta views ya que no esta en la raiz
app.engine(
  ".hbs",
  exphbs({
    allowProtoMethodsByDefault: true,
    allowedProtoMethods: true,
    allowProtoPropertiesByDefault: true,
    allowedProtoProperties: true,
    defaultLayout: "main", //cual es la vista de inicio
    layoutsDir: path.join(app.get("views"), "layouts"), //donde estan las vistas
    partialsDir: path.join(app.get("views"), "partials"), //donde estan los partials
    extname: ".hbs" //la extension de los archivos
  })
);
app.set("view engine", ".hbs"); //decimos que vamos a usar hbs

//MIDDLEWARES
app.use(express.urlencoded({ extended: false })); //para entender lo que mandan lo formularios
app.use(methodOverride("_method"));
app.use(
  session({
    secret: "mysecretapp", //es como una clave que solo nosotros conocemos
    resave: true,
    saveUninitialized: true
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(flash()); //MANDAR MENSAJES ENTRE LAS VISTAS

//GLOBAL VARIABLES
app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash('error');
  res.locals.user = req.user||null;

  next();
});

//ROUTES
app.use(require("./routes/index"));
app.use(require("./routes/notes"));
app.use(require("./routes/users"));

//STATICS FILES
app.use(express.static(path.join(__dirname, "public"))); //donde se van a guardar los archivos estaticos

//SERVER IS LISTENNING
app.listen(app.get("port"), () => {
  console.log("Server on port", app.get("port"));
});
