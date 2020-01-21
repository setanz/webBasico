const router = require("express").Router();//Permite la creacion de rutas


//INICIO
router.get('/',(req, res)=>{
    res.render('index')
})

//SOBRE NOSOTROS
router.get('/about',(req, res)=>{
    res.render('about')
})


module.exports = router;
