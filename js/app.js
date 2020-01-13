var userName = "john"; //variable global
let lastName = "carter"; //variable que se limita al bloque donde se crea

//Ejemplo de las diferencias
// {
//     let variable_let = 'valor variable let';
//     var variable_var = 'valor variable var';
//     console.log('var dentro de bloque: ' + variable_var);
//     console.log('let dentro de bloque: ' + variable_let);
// }

// console.log('var fuera de bloque: ' + variable_var);
// console.log('let fuera de bloque: ' + variable_let);

const PI = 3.1415; //constantes invariables

let name=userName +' '+lastName; //concatenación

let input = "pass";
let pass = "pass";
let result = input == pass;
//buscar cuando == y cuando ===
//--------------------------
if(result === true){
    console.log("ingresa")
}else{
    console.log("error")

}
let typeCard = 'Debic card';

//Swtich---------------------------
switch(typeCard){
    case 'Debid Card':
        console.log('this is a debid card');
        break;
    case 'Credit Card':
        console.log('this a credit card');
    default:
        console.log("no card")
}

//iteradores--------------------
let count = 50;
while (count > 0){
    console.log('hello world');
    console.log(count)
    count--;
}

let names = ['ryan', 'joe', 'john'];

for(let i = 0; i < names.length; i++){
    console.log(names[i]);
}

//funciones-----------------
function greeting(){
    //ingrese lo que quiera
    console.log('hello');
}
greeting();
function add(n1, n2){
    //ingrese lo que quiera
    console.log(n1, n2);
}
add(3, 4);

//Estudiar el DOM del navegador
