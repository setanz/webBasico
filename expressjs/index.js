const express = require('express');
const morgan = require('morgan');

const app = express(); //Este es el servidor

//Configuraciones
app.set('appName', 'Daniela app');
app.set('port', 3000);
app.set('view engine','ejs');// ejs es un gestor de plantillas para las vistas, se tiene que instalar con npm pero no hay que llamarlo




//Middleware, permite manejar la peticion antes de que llegue a su destino original/final
//el modulo de Morgan hace esto mismo
// function logger(req,res,next){
//     console.log(`Route recived ${req.protocol}://${req.get('host')}${req.originalUrl}`);
//     next();

// }


//los middleware se manejan con el .use
app.use(express.json());//para que express entienda los json
// app.use(logger);
app.use(morgan('dev'))


//Escuchar el get de la ruta inicial. Es como decir, eh! servidor cuando entre a la pagina muestra esto
//EL req (request) es la petición que llega del navegador
//El res (response) es la respuesta que se manda al navegador
app.get('/', (req,res) =>{
    const data = [{name:'john'},{name: 'joe'},{name:'cameron'}];
    res.render('index.ejs',{people: data}); // en esta parte se le pasan los datos en data con el nombre people a la vista
})

app.get('/index', (req, res) => {
    res.send('Peticion get recibida');
});

app.post('/about', (req, res) => {
    res.send('post recibido');
});

//tomar los datos del front para actualizarlos
app.put('/contact', (req, res) => {
    res.send('<h1>actualizacion recibida</h1> ');
});

app.delete('/buenas', (req, res) => {
    res.send('delete recibido ');
});

//Esta funcion hace que todo lo que va para /user primero pase por ella
//Si se crea esto las demas funciones de /user no se ejecutan
// app.all('/user',(req,res)=>{
//     console.log('Por aqui paso');
//     res.send('finalizado');
// })

//para que las demás se ejecuten se pone next
app.all('/user', (req, res, next) => {
    console.log('Por aqui paso');
    next();
})

//--------------------------------
app.get('/user', (req, res) => {
    res.json({
        username: 'Daniela',
        lastname: 'Higuita'
    })
})

//El :id es para hacer rutas dinamicas,solo hay que cambiar el id de nombre
app.post('/user/:id', (req, res) => {
    console.log(req.body); //para recibir el cuerpo del archivo
    console.log(req.params); //para recibir lo parametros de la url dinamica
    res.send('post del user')
})

app.delete('/user/:usuario', (req, res) => {
    res.send(`Usuario ${req.params.usuario} eliminado`);
})

app.put('/user/:usuario', (req, res) => {
    console.log(req.body);
    res.send(`Usuario ${req.params.usuario} actualizado`);
})

app.use(express.static('public'));//se muestra si no esntra en nada



//Para que el servidor empiece a escuchar en el puerto 3000
app.listen(app.get('port'), () => {
    console.log(app.get('appName'));
    console.log('Server on port',app.get('port'))
});



