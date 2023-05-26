
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
                        <td><button>DEL</button></td>
                        `;
                        
                        contenedor.prepend(nuevo);

                        let totalSuma = 0 ;
                        const tabla = document.getElementById("tablas");
                        const filas = tabla.getElementsByTagName("tr");
                    
                        // Comenzamos desde 1 para omitir la fila de encabezado
                        for (let i = 0; i < filas.length; i++) {
                            const celdas = filas[i].getElementsByTagName("td");
                            const precioTotal = parseFloat(celdas[3].textContent.replace("$", ""));
                            totalSuma += precioTotal;
                        }

                        // Actualizar el elemento en el DOM con la suma total
                        document.getElementById("output").innerHTML = `
                        <p><strong>TOTAL $ ${totalSuma.toFixed(2)}</strong></p>
                        `;
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
                    return (`Producto ${nombre} eliminado de la lista`);
                 } else {
                    return (`No existe el producto ${nombre} a eliminar`);
                };
            };

            /*
            // DEFINO LA FUNCION PARA EDITAR UN PRODUCTO SEGUN EL NOMBRE
            editarListaEntrada(nombre){
                
                const nuevoBuscarListaEntrada = this.buscarListaEntrada(nombre)
                console.log(`esto es nuevobuscarlistaentrada ${nuevoBuscarListaEntrada}`);

                // const nuevoNombre = this.nuevoBuscarListaEntrada.nombre;
                // const nuevaCantidad = this.nuevoBuscarListaEntrada.cantidad;
                // const nuevoPrecio = this.nuevoBuscarListaEntrada.precio;

            };
            //TODO FIN */

    };
    
    // EJECUTO LA FUNCION PARA AGREGAR PRODUCTOS A LA LISTA

    const funcionAgregar = () => {

        const productoAgregado = new ListaEntradas;
        const productoEnTabla = productoAgregado.agregarListaEntrada()

        
        console.log(productoEnTabla);
    }

    let btn_add = document.getElementById("btn_add");
    btn_add.addEventListener("click", funcionAgregar)

/* 
    // EJECUTO LA FUNCION PARA BUSCAR PRODUCTOS A LA LISTA
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
    }; 

    // EJECUTO LA FUNCION PARA BORRAR PRODUCTOS A LA LISTA
    const consultarBorrar = confirm("Si desea borrar un producto haga click en aceptar. Para salir del programa presione cancelar");
    if (consultarBorrar) {
        let ingresoProductoBorrar;
        while (ingresoProductoBorrar !== "ESC") {
            ingresoProductoBorrar = prompt("ingrese el producto a borrar (uno que se haya agregado antes)")     //EL USUARIO ELIGE EL PRODUCTO A BORRAR SEGUN ALGUNO QUE YA HAYA INGRESADO
            if (ingresoProductoBorrar === "" || ingresoProductoBorrar === null ) {
                alert("no ingreso el nombre del producto")
            } else if (ingresoProductoBorrar === "ESC"){
                alert("Saliendo de borrado de productos...");
            } else {
                const nuevoBorrar = productoAgregado.borrarListaEntrada(ingresoProductoBorrar)        
                console.log(nuevoBorrar);       //PRUEBA DE CONTROL
        
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
            };
        };
    }

        // TODO
        // EJECUTO LA FUNCION PARA EDITAR PRODUCTOS A LA LISTA
        let nombreAEditar = prompt("ingrese nombre a editar")
        const editar = productoAgregado.editarListaEntrada(nombreAEditar)
        console.log(`se llamo a la funcion editar y se guardo en una variable el res es ${editar}`);
        // TODO FIN */