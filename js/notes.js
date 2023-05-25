// const a = [
//     {   key : value,
//         key2: value2
//     },

//     {   name : nombre,
//         age: edad
//     }
// ];


// nombreArray

// Array   
//     objeto
//         propiedad
//             valor

// [ { } ]

// nombreArray[]


// const array1 = [
//     "casa",
//     "papel",
//     "hoja",
//     "lapiz"
// ];


// const arrayObjeto = [
//     { nombre : "kevin", edad : 22 },
//     { nombre : "joel",  edad : 30 }
// ];

// console.log(arrayObjeto[1].nombre);
// console.log(arrayObjeto[1]);

// console.log(array1[2]);

// console.log(arrayObjeto[1]?.nombre && 4); 

// const [, a ] = arrayObjeto;

// console.log(a.nombre);



let objeto = {
    nombre: "kevin",
    apellido: "noviello",
    edad: 22
};
let usuario;

let clases = [
    objeto,
    usuario
];


// ESTO FUE LO QUE ME PASO EL PROFE PARA RECORRER EL OBJETO DENTRO DEL ARRAY
[objeto].forEach(item =>{
    const {nombre} = item;
    console.log(nombre);  //me da Kevin
  })


//   FUNCIONO!!!
 



let referencia = [
    {nombre: "xxxxx", cantidad: 1, precio: 300}, // [0]
    {nombre: "xxxxx", cantidad: 1, precio: 300}, // [1]
    {nombre: "xxxxx", cantidad: 1, precio: 300}, // [2]
    {nombre: "xxxxx", cantidad: 1, precio: 300}, // [3]
]