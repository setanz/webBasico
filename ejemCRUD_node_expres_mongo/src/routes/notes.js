//AQUI SE REALIZARA TODO LO RELACIONADO CON LAS NOTAS QUE SE CREEN

const router = require("express").Router(); //Permite la creacion de rutas

const Note = require("../models/Note"); //con esto ya podemos usar sus metodos

router.get("/notes/add", (req, res) => {
  res.render("notes/new-notes.hbs");
});

router.post("/notes/new-notes", async (req, res) => {
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
    await newNote.save();
    req.flash("success_msg", "Note added successfully");
    res.redirect("/notes");
  }
});

router.get("/notes", async (req, res) => {
  const notes = await Note.find().sort({ date: "desc" });
  res.render("notes/all-notes", { notes });
});

router.get("/notes/edit/:id", async (req, res) => {
  const note = await Note.findById(req.params.id);
  res.render("notes/edit-notes", { note });
});

router.put("/notes/edit-note/:id", async (req, res) => {
  const { title, description } = req.body;
  await Note.findByIdAndUpdate(req.params.id, { title, description });
  req.flash('success_msg', 'Note updated successfully')
  res.redirect("/notes");
});

router.delete("/notes/delete/:id", async (req, res) => {
  await Note.findByIdAndDelete(req.params.id);
  req.flash('success_msg', 'Note deleted successfully')
  res.redirect("/notes");
});

module.exports = router;
