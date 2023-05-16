
// DEFINO LA CLASE ENTRADA DEL PRODUCTO
class Entrada {
    nombre;       // Nombre del producto
    cantidad;    // Cantidad del producto a ingresar
    precio;       // Precio por unidad del producto

    constructor(nombre, cantidad, precio,) {
        this.nombre = nombre;
        this.cantidad = cantidad;
        this.precio = precio;

        if (cantidad) {
            this.cantidad = cantidad;
        } else {
            this.cantidad = 1;
        };

    };
};

let nombre; 
let cantidad; 
let precio; 
let total = cantidad*precio;

const array = [];




class ListaEntradas {
    listaEntrada;
    totalAcumulado;

        constructor() {
            this.listaEntrada = [];
            this.totalAcumulado = 0;
        };
        
        agregarListaEntrada(){
            do {
                nombre = prompt("ingrese el nombre del producto. En este campo ingresar ESC para salir");
                
                if (nombre !== "ESC") {
            
                    cantidad = prompt("ingrese la cantidad del producto");
                    precio = parseFloat(prompt("ingrese el precio del producto"));
                    this.totalAcumulado = this.totalAcumulado + cantidad*precio
                    
                    const array = new Entrada(nombre, cantidad, precio);
                    console.log(array);
                    
                    let contenedor = document.getElementById("tablas");
                    
                    let nuevo = document.createElement("tr");
                    
                    nuevo.innerHTML = `
                    <td>${array.nombre}</td>
                    <td>${array.cantidad}</td>
                    <td>$ ${array.precio}</td>
                    <td>$ ${this.totalAcumulado}</td>
                    `;
                    
                    contenedor.append(nuevo);
                };
            } while (nombre !== "ESC");
        };
};

const productoAgregado = new ListaEntradas;
const productoEnTabla = productoAgregado.agregarListaEntrada()
console.log(productoEnTabla);







// FUNCION QUE BUSCA UN PRODUCTO EN LA TABLA



// Función que busca un producto por su sku en "la base de datos"
/* function findProductByName(nombre) {
        setTimeout(() => {
            const foundProduct = productosDelSuper.find(product => product.nombre === nombre);
            if (foundProduct) {
                (foundProduct);
            } else {
                (`No existe el producto ${nombre}`);
            }
        }, 1500);
    }; */


// function agregarEntrada(nombre, cantidad, precio) {
//     console.log(`Agregando ${nombre} ${cantidad} unidad/es a ${precio} pesos`);

//         // Busco el producto en la "base de datos"
//         const entrada = findProductByNombre(nombre);
//         console.log(`El producto agregado es ${entrada.nombre}`);
        
//         // me fijo si el producto ya existe
//         const existeProducto = this.entrada.find(item => item.nombre === nombre);
        
//         // si existe solo le sumo la cantidad
//         if (existeProducto) {
//             existeProducto.cantidad += cantidad;

//         // si no existe lo agrego y tambien verifico si existe la misma categoria a agregar.
//         } else {
//             const nuevoProducto = new ProductoEnCarrito(sku, producto.nombre, cantidad);
//             this.productos.push(nuevoProducto);
//             if (!this.categorias.includes(producto.categoria)) {
//                 this.categorias.push(producto.categoria);}
//         };

//         // se modifica el precio
//         this.precioTotal = this.precioTotal + (producto.precio * cantidad);
//         console.log(`el carrito queda conformado por los productos agregados`, carrito.productos);
//         console.log(`El precio total del carrito al agregar el producto es de ${this.precioTotal}`);
// };
