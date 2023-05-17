
// DEFINO LA CLASE ENTRADA DEL PRODUCTO
class Entrada {
    nombre;         // Nombre del producto
    cantidad = 0;   // Cantidad del producto a ingresar
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
let total;

let inicio = confirm("Para iniciar el programa haga click en aceptar")

if (inicio) {
    
    // DEFINO LA CLASE PARA ENTRADA DEL PRODUCTO CON EL PRECIO ACUMULATIVO A LA TABLA
    class ListaEntradas {
        listaEntrada = []
        totalAcumulado = 0;
    
            constructor() {
                this.listaEntrada = [];
                this.totalAcumulado = 0;
            };
            
            // DEFINO LA FUNCION PARA AGREGAR LA ENTRADA A LA TABLA
            agregarListaEntrada(){
    
                // CON ESC SALGO DEL PROGRAMA
                while (nombre !== "ESC") {
                    nombre = prompt("ingrese el nombre del producto. En este campo ingresar ESC para salir");
                    
                    // SI LA ENTRADA ESTA VACIA O ES NULA DA UN AVISO
                    if (nombre === "" || nombre === null) {
    
                        alert("Debe ingresar un producto");
                       
                    // CON ESC SALGO DEL PROGRAMA    
                    } else if (nombre === "ESC"){
                        alert("adios")
                       
                    // SI NO ES NINGUNA DE LAS ANTERIORES Y MIENTRAS NO SEA ESC SE EJECUTA EL CODIGO    
                    } else {
                        const cantidadIngresada = prompt("Ingrese la cantidad del producto");
                        cantidad = cantidadIngresada ? parseInt(cantidadIngresada) : 1;
    
                            // VALIDO QUE LA ENTRADA CANTIDAD SEA UN ENTERO POSITIVO
                            while (cantidad <1 || isNaN(cantidad)) {
                                alert("Debe ingresar un numero entero positivo")
                                const cantidadIngresada = prompt("Ingrese la cantidad del producto");
                                cantidad = cantidadIngresada ? parseInt(cantidadIngresada) : 1;
                            };
                            console.log(cantidad);      //PRUEBA DE CONTROL
    
                            // SI ES UN ENTERO POSITIVO EJECUTO EL CODIGO
                            precio = parseFloat(prompt("ingrese el precio del producto"));
                            console.log(precio);        //PRUBA DE CONTROL
    
                            // VALIDO QUE LA ENTRADA PRECIO SEA MAYOR A 0
                            while (precio <0 || isNaN(precio)) {
                                alert("Debe ingresar un numero mayor a 0")
                                precio = parseFloat(prompt("ingrese el precio del producto"));
                            };
                            
                            const nuevaEntrada = new Entrada(nombre, cantidad, precio);
                            this.listaEntrada.push(nuevaEntrada);
                            console.log(this.listaEntrada);       // PRUEBA DE CONTROL
                            this.totalAcumulado = Number(this.totalAcumulado + cantidad*precio)
                            
                            // AGREGO AL DOM
                            let contenedor = document.getElementById("tablas");
                            let nuevo = document.createElement("tr");
                            
                            nuevo.innerHTML = `
                            <td class ="td_especial">${nuevaEntrada.nombre}</td>
                            <td>${nuevaEntrada.cantidad}</td>
                            <td>$ ${nuevaEntrada.precio.toFixed(2)}</td>
                            <td>$ ${this.totalAcumulado.toFixed(2)}</td>
                            `;
            
                            contenedor.append(nuevo);            
                    };
                };
                return this.listaEntrada;
            };
    
            // DEFINO LA FUNCION PARA BUSCAR UN PRODUCTO SEGUN EL NOMBRE
            buscarListaEntrada(nombre){
                const buscarProducto = this.listaEntrada.find(item => item.nombre === nombre);
                if (buscarProducto) {
                   return (`Producto ${nombre} encontrado en la lista`);
                } else {
                   return (`No existe el producto ${nombre}`);
                }
            };

            // DEFINO LA FUNCION PARA BORRAR UN PRODUCTO SEGUN EL NOMBRE
            borrarListaEntrada(nombre){

                // BUSCO EL PRODUCTO
                const indexProducto = this.listaEntrada.findIndex(item => item.nombre === nombre)
                console.log(`esto es indexProducto`, indexProducto);      // PRUEBA DE CONTROL

                if (indexProducto !== -1) {

                    // CALCULO EL PRECIO A DESCONTAR
                    let subtotal = this.listaEntrada[indexProducto].cantidad * this.listaEntrada[indexProducto].precio
                    console.log("subtotal", subtotal);  // PRUEBA DE CONTROL

                    // ELIMINO EL PRODUCTO
                    const borrarProducto = this.listaEntrada.splice(indexProducto, 1);
                    console.log("esto es borrarProducto", borrarProducto);
                    // console.log("esto es antes de borrar el precio y busca cantidad del indexProducto", this.listaEntrada[indexProducto].cantidad + "esto es el precio", this.listaEntrada[indexProducto].precio);


                    console.log("totalAcumulado", this.totalAcumulado);
                    this.totalAcumulado -= subtotal
                    return (`Producto ${nombre} eliminado de la lista`);
                 } else {
                    return (`No existe el producto ${nombre} a eliminar`);
                };
            };
    };
    
    // EJECUTO LA FUNCION PARA AGREGAR PRODUCTOS A LA LISTA
    const productoAgregado = new ListaEntradas;
    const productoEnTabla = productoAgregado.agregarListaEntrada()
    console.log(productoEnTabla);

    // MUESTRO LA LISTA POR PANTALLA
    let mensaje = "";
    for (let i = 0; i < productoAgregado.listaEntrada.length; i++) {  
        mensaje = mensaje + " " + `${productoAgregado.listaEntrada[i].nombre} x ${productoAgregado.listaEntrada[i].cantidad} unidad/es con un valor de $${productoAgregado.listaEntrada[i].precio} \n`
    };

    alert(`Agrego:
    ${mensaje}
    por un valor total de $${productoAgregado.totalAcumulado}
    `)
    
    // EJECUTO LA FUNCION PARA BUSCAR UN PRODUCTO EN LA TABLA
    // SE LE AGREGA EL TIME OUT PARA ESPERAR A CARGAR EL PRODUCTO
    setTimeout(() => {
        const nuevoBuscar = productoAgregado.buscarListaEntrada("arroz")        //HAY QUE ESCRIBIR ARROZ EN EL INGRESO DEL PRODUCTO PARA QUE LO ENCUENTRE
        console.log(nuevoBuscar);
        // MUESTRO POR PANTALLA EL RESULTADO DE BUSCAR UN PRODUCTO
        alert(nuevoBuscar)
    }, 5000);

    setTimeout(() => {
        let valor = prompt("ingrese el producto a borrar (uno que se haya agregado antes)")
        const nuevoBorrar = productoAgregado.borrarListaEntrada(valor)        //HAY QUE ESCRIBIR ARROZ EN EL INGRESO DEL PRODUCTO PARA QUE LO ELIMINE
        console.log(nuevoBorrar);
        // MUESTRO POR PANTALLA EL RESULTADO DE BUSCAR UN PRODUCTO
        alert(nuevoBorrar)

        let nuevoMensaje = "";
        for (let i = 0; i < productoAgregado.listaEntrada.length; i++) {  
            nuevoMensaje = nuevoMensaje + " " + `${productoAgregado.listaEntrada[i].nombre} x ${productoAgregado.listaEntrada[i].cantidad} unidad/es con un valor de $${productoAgregado.listaEntrada[i].precio} \n`
        };

        alert(`Agrego:
        ${nuevoMensaje}
        por un valor total de $${productoAgregado.totalAcumulado}
        `)
        console.log(productoEnTabla);       //PRUEBA DE CONTROL
    }, 10000);
};