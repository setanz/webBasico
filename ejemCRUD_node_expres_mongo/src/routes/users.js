//AQUI SE REALIZARA EL REGISTRO DEL USUARIO

const router = require("express").Router(); //Permite la creacion de rutas

router.get('/users/signin', (req,res)=>{
    res.render('users/signin')
})
router.get('/users/signup', (req,res)=>{
    res.render('users/signup')
})


module.exports = router;
