
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/User'); 

passport.use(new LocalStrategy({
  usernameField: 'email'
}, async (email, password, done) => {//done es un callback
  // Match Email's User
  const user = await User.findOne({email: email});
  if (!user) {
    return done(null, false, { message: 'Not User found.' });// null para el error, false para el usuario porque no hay, y un mensage
  } else {
    // Match Password's User
    const match = await user.matchPassword(password);
    if(match) {
      return done(null, user);//null para el error, y el usuario que se encontro. el correo y la contrase;a coinsiden
    } else {
      return done(null, false, { message: 'Incorrect Password.' });
    }
  }

}));

passport.serializeUser((user, done) => { //para guardar en sesion al usuario
  done(null, user.id);
});

passport.deserializeUser((id, done) => {// para quitarlo de la sesion
  User.findById(id, (err, user) => {
    done(err, user);
  });
});
