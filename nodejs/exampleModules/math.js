const Math = {};

function add(x1, x2){
    return x1+x2;
}

function substract(x1,x2){
    return x1-x2
}

function multiply(x1,x2){
    return x1*x2
}

function divide(x1,x2){
    if(x2== 0){
        console.log("You can't divide for 0")
    }else{
        return x1/x2
    }
}
function hello(){
    console.log('Hi friend');
}

//para que se pueda usar en otros archivos
//se puede exportar exports o con module, pero el module jay que agregar lo que se quiere exportar al objeto primero
//----con exports
// exports.add = add;
// exports.substract = substract;
// exports.multiply = multiply;
// exports.divide = divide;

//en esta parte de agregan las funciones al objeto
Math.add = add;
Math.substract = substract;
Math.multiply = multiply;
Math.divide = divide;s
module.exports = Math;

//module no solo sirve para exportar objeto, sino tambien funciones
// module.exports = hello;