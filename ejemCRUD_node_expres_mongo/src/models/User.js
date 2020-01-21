const mongoose = require("mongoose");
const { Schema } = mongoose;
const bcrypt = require("bcryptjs");

const UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  date: { type: Date, default: Date.now }
});


//CIFRAR CONTRASE;A
UserSchema.methods.encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10); //APLICA EL ENCRIPTADO 10 VECES
  const hash = await bcrypt.hash(password, salt);
  return hash;
};

//COMPARAR SI LAS CONTRASE;AS SON IGUALES PARA EL INGRESO DEL USUARIO
//aqui no se usa la funcion flecha porque se necesita que se puedan acceder a los parametros propios de UserSchema
UserSchema.methods.matchPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};
module.exports = mongoose.model("User", UserSchema);











