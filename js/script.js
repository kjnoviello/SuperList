
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
        cantidad ? this.cantidad : 1;
    };
};

// DECLARO VARIABLES SIN INICIAR
let nombre;
let cantidad; 
let precio; 
let total;
    
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
                nombre = document.getElementById("inputNombre").value;
                console.log(nombre);
                const cantidadIngresada = document.getElementById("inputCantidad").value;
                cantidad = cantidadIngresada ? parseInt(cantidadIngresada) : 1;

                precio = document.getElementById("inputPrecio").value;
                
                if ((nombre === "" || nombre === null) || (cantidad <1 || isNaN(cantidad)) || (precio <=0 || isNaN(precio))){
                    
                    alert("Debe ingresar un producto o un numero entero positivo");
                    
                } else {

                    // SI EXISTE EL PRODUCTO SOLO LE SUMO LA CANTIDAD
                    const existeProducto = this.listaEntrada.find(item => item.nombre === nombre)

                    if (existeProducto) {
                        existeProducto.cantidad += cantidad;
                        this.totalAcumulado += cantidad * existeProducto.precio

                    } else {
                    
                        // SI NO EXISTE LO CREO
                        const nuevaEntrada = new Entrada(nombre, cantidad, precio);
                        this.listaEntrada.push(nuevaEntrada);
                        const precioTotal = nuevaEntrada.precio * nuevaEntrada.cantidad;

                         // AGREGO AL DOM

                        let tableHeader = document.getElementById("table_header");

                        tableHeader.innerHTML = `
                        <tr class="section_table_header">
                        <th><strong><em>Product</em></strong></th>
                        <th><strong><em>Unit</em></strong></th>
                        <th><strong><em>Price</em></strong></th>
                        <th><strong><em>Total</em></th>
                        <th><button style="visibility: hidden;">DEL</button></th>
                        </tr>
                        `;

                        let contenedor = document.getElementById("tablas");
                        let nuevo = document.createElement("tr");
                        
                        nuevo.innerHTML = `
                        <td>${nombre}</td>
                        <td>${cantidad}</td>
                        <td>$ ${precio}</td>
                        <td id="idPrecio">$ ${precioTotal.toFixed(2)}</td>
                        <td><button onclick="eliminarFila(this)">DEL</button></td>
                        `;
                        
                        contenedor.prepend(nuevo);

                        actTotal();

                        document.getElementById("inputNombre").value = "";
                        document.getElementById("inputCantidad").value = "";
                        document.getElementById("inputPrecio").value = "";

                    };
                };
                return this.listaEntrada;
            };
    
            // DEFINO LA FUNCION PARA BUSCAR UN PRODUCTO SEGUN EL NOMBRE
            buscarListaEntrada(nombre){
                const buscarProducto = this.listaEntrada.find(item => item.nombre === nombre);
                
                if (buscarProducto) {
                    alert(`El producto ${nombre} se encuentra en la lista`);
                    return buscarProducto.nombre, buscarProducto.cantidad, buscarProducto.precio;
                } else {
                    return alert(`No existe el producto ${nombre} en la lista`);
                };
            };

            // DEFINO LA FUNCION PARA BORRAR UN PRODUCTO SEGUN EL NOMBRE
            borrarListaEntrada(nombre){

                // BUSCO EL PRODUCTO POR EL INDEX
                const indexProducto = this.listaEntrada.findIndex(item => item.nombre === nombre)
                console.log(`esto es indexProducto`, indexProducto);      // PRUEBA DE CONTROL

                if (indexProducto !== -1) {

                    // CALCULO EL PRECIO A DESCONTAR
                    let subtotal = this.listaEntrada[indexProducto].cantidad * this.listaEntrada[indexProducto].precio
                    console.log("subtotal", subtotal);  // PRUEBA DE CONTROL

                    // ELIMINO EL PRODUCTO
                    const borrarProducto = this.listaEntrada.splice(indexProducto, 1);
                    console.log("esto es borrarProducto", borrarProducto);  // PRUEBA DE CONTROL
                    console.log("esto es totalAcumulado antes de restar el subtotal", this.totalAcumulado);     // PRUEBA DE CONTROL

                    this.totalAcumulado -= subtotal
                    return alert(`Producto ${nombre} eliminado de la lista`);
                 } else {
                    return alert(`No existe el producto ${nombre} a eliminar`);
                };
            };
    };
    
    // EJECUTO LA FUNCION PARA AGREGAR PRODUCTOS A LA LISTA

    const funcionAgregar = () => {
        const productoAgregado = new ListaEntradas;
        const productoEnTabla = productoAgregado.agregarListaEntrada()
    };


/*     // EJECUTO LA FUNCION PARA BUSCAR PRODUCTOS A LA LISTA
    const consultarBuscar = confirm("Si desea buscar un producto haga click en aceptar. Para continuar presione cancelar");
    if (consultarBuscar) {
        let ingresoProductoBuscar;
        while (ingresoProductoBuscar !== "ESC") {
            ingresoProductoBuscar = prompt("ingrese el nombre del producto a buscar. Escriba ESC para salir")
                if (ingresoProductoBuscar === "" || ingresoProductoBuscar === null) {
                    alert("no ingreso el nombre del producto")
                } else if (ingresoProductoBuscar === "ESC"){
                    alert("Saliendo de busqueda de productos...");
                } else {
                    productoAgregado.buscarListaEntrada(ingresoProductoBuscar);
                };
        };
    }; */ 

    // EJECUTO LA FUNCION PARA BORRAR PRODUCTOS A LA LISTA
    function eliminarFila(boton) {
        let fila = boton.parentNode.parentNode;
        fila.remove();
        actTotal()
    };

    function actTotal() {
        let totalSuma = 0 ;
        const tabla = document.getElementById("tablas");
        const filas = tabla.getElementsByTagName("tr");
    
        for (let i = 0; i < filas.length; i++) {
            const celdas = filas[i].getElementsByTagName("td");
            const precioTotal = parseFloat(celdas[3].textContent.replace("$", ""));
            totalSuma += precioTotal;
        };

        document.getElementById("output").innerHTML = `
        <p><strong>TOTAL $ ${totalSuma.toFixed(2)}</strong></p>
        `;
    };
   

    // EVENTOS
    
    let btn_add = document.getElementById("btn_add");
    btn_add.addEventListener("click", funcionAgregar)
    
    let btn_del = document.getElementById("btn_del");
    btn_del.addEventListener("click", )
    

        