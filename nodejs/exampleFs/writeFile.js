// const os = require('os'); //para saber más de este modulo mirar la doc de api nodejs
// console.log(os.release());
// console.log('free me en bytes: ', os.freemem());
const fs = require('fs'); //system files, permite trabajar con archivos del sistema

fs.writeFile('./texto.txt','Contenido de texto.txt', function(err){//Esta función se ejecuta despues de crear el archivo, este tipo de funciones se llaman callback y en                                                                      este caso recibe un error como parametro 
    if(err){
        console.log(err);
    }
    console.log('Archivo creado');
});
//Como es asincrono, primero se ve el ultimo console.log y luego lo del archivo, ya que nodejs le dice al sistema que realice el writeFile pero no espera que termine sino que sigue su codigo y cuando se termine lo del archivo el va y le da el tratamiento que se necesite. lo mismo hace para las DB. Hacer codigo así se crea código no bloqueante
console.log('ultima linea de código');

