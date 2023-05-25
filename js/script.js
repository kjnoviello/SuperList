
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
                        alert("Saliendo de ingreso de productos.....")
                       
                    // SI NO ES NINGUNA DE LAS ANTERIORES Y MIENTRAS NO SEA ESC SE EJECUTA EL CODIGO    
                    } else {
                        const cantidadIngresada = prompt("Ingrese la cantidad del producto o enter para 1");
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
                        
                        //! EXISTE PRODUCTO

                        const existeProducto = this.listaEntrada.find(item => item.nombre === nombre)

                        if (existeProducto) {
                            existeProducto.cantidad += cantidad; 
                        } else {

                        //! FIN DE EXISTE PRODUCTO
                        
                            const nuevaEntrada = new Entrada(nombre, cantidad, precio);
                            this.listaEntrada.push(nuevaEntrada);
                            console.log(this.listaEntrada);       // PRUEBA DE CONTROL
                            this.totalAcumulado += cantidad*precio
                            
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
                };
                return this.listaEntrada;
            };
    
            // DEFINO LA FUNCION PARA BUSCAR UN PRODUCTO SEGUN EL NOMBRE
            buscarListaEntrada(nombre){
                const buscarProducto = this.listaEntrada.find(item => item.nombre === nombre);
                return buscarProducto ? `El producto ${nombre} se encuentra en la lista` : `No existe el producto ${nombre} en la lista`;
                console.log(`esto es el log de buscarproducto ${buscarProducto}`);
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

                    // ELIMINO EL PRODUCTO (probar con un while para hacer un ciclo hasta borrar todos los productos iguales)
                    const borrarProducto = this.listaEntrada.splice(indexProducto, 1);
                    console.log("esto es borrarProducto", borrarProducto);  // PRUEBA DE CONTROL
                    console.log("esto es totalAcumulado antes de restar el subtotal", this.totalAcumulado);     // PRUEBA DE CONTROL

                    this.totalAcumulado -= subtotal
                    return (`Producto ${nombre} eliminado de la lista`);
                 } else {
                    return (`No existe el producto ${nombre} a eliminar`);
                };
            };

             // DEFINO LA FUNCION PARA EDITAR UN PRODUCTO SEGUN EL NOMBRE
             editarListaEntrada(nombre){
                
                const nuevoBuscarListaEntrada = this.buscarListaEntrada(nombre)

                const nuevoNombre = this.nuevoBuscarListaEntrada.nombre;
                const nuevaCantidad = this.nuevoBuscarListaEntrada.cantidad;
                const nuevoPrecio = this.nuevoBuscarListaEntrada.precio;





             }


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
                    const nuevoBuscar = productoAgregado.buscarListaEntrada(ingresoProductoBuscar)
                    console.log(nuevoBuscar);   // PRUEBA DE CONTROL
                    alert(nuevoBuscar);         // MUESTRO POR PANTALLA EL RESULTADO DE BUSCAR UN PRODUCTO
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
    } else {
        alert("Gracias y hasta luego");
    }

       // EJECUTO LA FUNCION PARA EDITAR PRODUCTOS A LA LISTA






};

