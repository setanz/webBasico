//AQUI SE REALIZARA EL REGISTRO DEL USUARIO

const router = require("express").Router(); //Permite la creacion de rutas
const passport = require("passport");

const User = require("../models/User");


router.get("/users/signin", (req, res) => {
  res.render("users/signin");
});

router.post(
  "/users/signin",
  passport.authenticate("local", {
    successRedirect: "/notes",
    failureRedirect: "/users/signin",
    failureFlash: true
  })
); //Aqui esto llama lo que se creo en config/passport y realiza las consultas por nosotros

//CREAR USUARIO
router.get("/users/signup", (req, res) => {
  res.render("users/signup");
});

//GUARDAR AL USUARIO EN LA DB
router.post("/users/signup", async (req, res) => {
  const { name, email, password, confirm_password } = req.body;
  const errors = [];
  if (name.length <= 0 || email.length <= 0) {
    errors.push({ text: "All fields are required" });
  }
  if (password != confirm_password) {
    errors.push({ text: "password do not math" });
  }
  if (password.length < 4) {
    errors.push({ text: "password must be at least 4 characters" });
  }
  if (errors.length > 0) {
    res.render("users/signup", {
      errors,
      name,
      email,
      password,
      confirm_password
    });
  } else {
    //Coincidencia de correo
    const emailUser = await User.findOne({ email: email });
    if (emailUser) {
      req.flash("error_msg", "The Email is alredy in use");
      res.redirect("/users/signup");
    } else {
      //Guardando al nuevo usuario
      const newUser = new User({ name, email, password });
      //Aqui cifra la contrase;a antes de guardarla
      newUser.password = await newUser.encryptPassword(password);
      await newUser.save();
      req.flash("success_msg", "You are registred");
      res.redirect("/users/signin");
    }
  }
});

//SALIR DE LA SECCION
router.get('/users/logout', (req, res) => {
  req.logout();
  req.flash('success_msg', 'You are logged out now.');
  res.redirect('/users/signin');
});



module.exports = router;
