
// DEFINO LA CLASE ENTRADA DEL PRODUCTO
class Entrada {
    nombre;         // Nombre del producto
    cantidad;       // Cantidad del producto a ingresar
    precio;         // Precio por unidad del producto

    constructor(nombre, cantidad, precio,) {
        this.nombre = nombre;
        this.cantidad = cantidad;
        this.precio = precio;

        // dejo por default 1 unidad
        if (cantidad) {
            this.cantidad = cantidad;
        } else {
            this.cantidad = 1;
        };

    };
};


// DECLARO VARIABLES SIN INICIAR
let nombre; 
let cantidad; 
let precio; 
let total = cantidad*precio;
// const array = [];


// DEFINO LA CLASE PARA ENTRADA DEL PRODUCTO CON EL PRECIO ACUMULATIVO A LA TABLA
class ListaEntradas {
    listaEntrada;
    totalAcumulado;

        constructor() {
            this.listaEntrada = [];
            this.totalAcumulado = 0;
        };
        
        // DEFINO LA FUNCION PARA AGREGAR LA ENTRADA A LA TABLA
        agregarListaEntrada(){
            do {
                nombre = prompt("ingrese el nombre del producto. En este campo ingresar ESC para salir");
                
                if (nombre !== "ESC") {
            
                    cantidad = prompt("ingrese la cantidad del producto");
                    precio = parseFloat(prompt("ingrese el precio del producto"));
                    this.totalAcumulado = this.totalAcumulado + cantidad*precio
                    
                    const nuevaEntrada = new Entrada(nombre, cantidad, precio);
                    this.listaEntrada.push(nuevaEntrada);
                    console.log(this.listaEntrada);         // prueba de control
                    
                    let contenedor = document.getElementById("tablas");
                    
                    let nuevo = document.createElement("tr");
                    
                    nuevo.innerHTML = `
                    <td>${nuevaEntrada.nombre}</td>
                    <td>${nuevaEntrada.cantidad}</td>
                    <td>$ ${nuevaEntrada.precio}</td>
                    <td>$ ${this.totalAcumulado}</td>
                    `;
    
                    contenedor.append(nuevo);
                };
            } while (nombre !== "ESC");
        };

        // DEFINO LA FUNCION PARA BUSCAR UN PRODUCTO SEGUN EL NOMBRE
        buscarListaEntrada(nombre){
            const buscarProducto = this.listaEntrada.find(item => item.nombre === nombre);
            if (buscarProducto) {
               return (buscarProducto);
            } else {
               return (`No existe el producto ${nombre}`);
            }
        };
};

// EJECUTO LA FUNCION PARA AGREGAR PRODUCTOS A LA LISTA
const productoAgregado = new ListaEntradas;
const productoEnTabla = productoAgregado.agregarListaEntrada()
console.log(productoEnTabla);


// EJECUTO LA FUNCION PARA BUSCAR UN PRODUCTO EN LA TABLA
// SE LE AGREGA EL TIME OUT PARA ESPERAR A CARGAR EL PRODUCTO
setTimeout(() => {
    const nuevoBuscar = productoAgregado.buscarListaEntrada("arroz")
    console.log(nuevoBuscar);
}, 10000);