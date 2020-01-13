// const http = require('http');

// //req = request, res = response
// //se podria crear todo en la misma linea, pero así se ve más ordenado
// const handleServer = function(req, res){
//     res.writeHead(200,{'Content-type': 'text/html'}); //codigo de estado, se pueden buscar en internet
//     res.write('<h1>Hi, soy tu servidor</h1>');
//     res.end();
// };
// const server = http.createServer(handleServer);

// server.listen(3000, function(){
//     console.log('Servidor en el puerto 3000')
// });

// npm init -->para crear un json y que esten los modulos necesarios y otra info


//Estas lineas hacen lo mismo que las de arriba, solo que express se encarga de hacerlo casi todo
const express = require('express');
const server = express();
server.listen(3000, function(){
    console.log('Server on port 3000')
});
