//AQUI SE REALIZARA TODO LO RELACIONADO CON LAS NOTAS QUE SE CREEN

const router = require("express").Router(); //Permite la creacion de rutas

const Note = require("../models/Note"); //con esto ya podemos usar sus metodos
const {isAuthenticated} = require("../helpers/auth");

//AGREGAR NOTA
//Al poner isAuthenticated antes de que se ejecute la funcion ayuda a que no se pueda entrar en cualquier momento
router.get("/notes/add", isAuthenticated,(req, res) => {
  res.render("notes/new-notes.hbs");
});

//AGREGAR NUEVA NOTA DB
router.post("/notes/new-notes", isAuthenticated,async (req, res) => {
  //al poner el async decimos que dentro hay procesos asincronos
  const { title, description } = req.body; //es para separar el title y description del req.body
  const errors = [];
  if (!title) {
    errors.push({ text: "please write a title" });
  }
  if (!description) {
    errors.push({ text: "please write a description" });
  }
  if (errors.length > 0) {
    res.render("notes/new-notes", {
      errors,
      title,
      description
    });
  } else {
    const newNote = new Note({ title, description }); //aqui ya se creo el objeto a guardar
    newNote.user = req.user.id;
    await newNote.save();
    req.flash("success_msg", "Note added successfully");
    res.redirect("/notes");
  }
});

//MOSTRAR TODAS LAS NOTAS

router.get("/notes", isAuthenticated, async (req, res) => {
  //al poner {user: req.user.id} dentri del find hacemos que traiga todas las notas de un usuario en especifico
  const notes = await Note.find({user: req.user.id}).sort({ date: "desc" }); 
  res.render("notes/all-notes", { notes });
});

//EDITAR LAS NOTAS
router.get("/notes/edit/:id", isAuthenticated, async (req, res) => {
  const note = await Note.findById(req.params.id);
  res.render("notes/edit-notes", { note });
});

//EDITAR LAS NOTAS EN LA DB
router.put("/notes/edit-note/:id", isAuthenticated, async (req, res) => {
  const { title, description } = req.body;
  await Note.findByIdAndUpdate(req.params.id, { title, description });
  req.flash("success_msg", "Note updated successfully");
  res.redirect("/notes");
});

//ELIMINAR LAS NOTAS
router.delete("/notes/delete/:id", isAuthenticated, async (req, res) => {
  await Note.findByIdAndDelete(req.params.id);
  req.flash("success_msg", "Note deleted successfully");
  res.redirect("/notes");
});

module.exports = router;
