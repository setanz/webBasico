const mongoose = require("mongoose");//permite conectar la db(mongo) con node


// si la db no esta creada, la crea antes de conectarse
mongoose
  .connect("mongodb://localhost/notes-db-app", { //configuraciones para que todo funciones correctamente
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false
  })
  .then(db => console.log("DB is connect")) //promesa de que se muestre al conectarse, esto es asincronico
  .catch(err => console.log(err)); // sino se conecta muestra que error salio

  