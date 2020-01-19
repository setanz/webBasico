const express = require('express');

//iniciando el servidor
const app = express();

//configuracion
app.set('port',3000);
app.set('view engine', 'ejs' );


app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
//metodos

app.get('/', (req,res)=>{
    res.render('index.ejs');
})

app.post('/', (req,res)=>{
    const name = req.body.name;
    console.log(name);
    
    res.redirect('/inicio')
    // res.send(`nothing to see here ${name} ${req.body.lastName}`)
    
})
app.get('/inicio', (req,res)=>{
    res.send('hola')
})

app.listen(app.get('port'), () =>{
    console.log('I´m working in ', app.get('port'));
})