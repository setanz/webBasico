const helpers = {};

helpers.isAuthenticated = (req, res, next) => { //esta es una funcion propia de passport. devuelve true si hay una sesion false sino la hay
  if (req.isAuthenticated()) {
    return next();
  }
  req.flash('error_msg', 'Not Authorized.');
  res.redirect('/users/signin');
};

module.exports = helpers; //cuando se hace la exportacion, los demas modulos pueden acceder a los metodos que hay aqui
