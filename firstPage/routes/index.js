module.exports = (app) => {
  let users = [];
  app.locals.users = users;

  app.get('/', (req, res) => {
    res.render('index',{
        title: 'Home',
        inicio: false
    });
  });

  app.get('/signIn', (req, res) => {
    res.render('singIn',{
        title: 'Sing In'
    });
  });

      
  app.post('/singIn', (req, res) => {
    if(!req.body.email || !req.body.password || !req.body.name || !req.body.lastName){
      res.send(400).send('Todos los campos son obligatrios');
    }

    let newUser = {
      nombre: req.body.name,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password
    }

    users.push(newUser);
    console.log(newUser);
    res.render('index',{
      title: 'Home',
      inicio:true
    })
  });

  app.get('/signUp',(req, res) =>{
    res.render('signUp',{
      title: 'Sign Up '
    })
  });

  app.post('/signUp', (req, res) =>{
    if(users.length != 0){
      for (let user = 0; user < users.length; user++) {
        let correo = users[user].email;
        console.log(req.body.email)
        if (correo == req.body.email) {
          console.log('if correo')
          if (users[user].password == req.body.password) {
            res.send('<h1>Usuario ingresado</h1>');
          }else{  
            res.send('<h1>Datos incorrectos</h1>');
          };
        } else {
          res.send('<h1>Usuario no registrado</h1>');
          
        };
        
      };
    }else{
      res.send('<h1>No hay usuarios registrados</h1>');
    }
  });  
};
