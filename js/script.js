// DEFINO LA CLASE ENTRADA DEL PRODUCTO
class Entrada {

    constructor(nombre, cantidad, precio,) {
        this.nombre = nombre;
        this.cantidad = cantidad;
        this.precio = precio;
    };
};

// DECLARO VARIABLES SIN INICIAR
let nombre;
let cantidad; 
let precio; 
let total;
    
// DEFINO LA CLASE PARA ENTRADA DEL PRODUCTO CON EL PRECIO ACUMULATIVO A LA TABLA
class ListaEntradas {

    constructor() {
        this.listaEntrada = [];
        this.totalAcumulado = 0;
    };
    
    // DEFINO LA FUNCION PARA AGREGAR LA ENTRADA A LA TABLA
    agregarListaEntrada(){
        nombre = document.getElementById("inputNombre").value;
        const cantidadIngresada = document.getElementById("inputCantidad").value;
        cantidad = cantidadIngresada ? parseInt(cantidadIngresada) : 1;

        precio = document.getElementById("inputPrecio").value;
        
        if ((nombre === "" || nombre === null) || (cantidad <1 || isNaN(cantidad)) || (precio <=0 || isNaN(precio))){
            
            alert("Debe ingresar un producto o un numero entero positivo");
            
        } else {
        
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

            //EJECUTO LA FUNCION PARA ACTUALIZAR EL TOTAL DE PRECIOS
            actTotal();

            //RESTAURO LOS CAMPOS DE FORMULARIO AL ESTADO INICIAL
            document.getElementById("inputNombre").value = "";
            document.getElementById("inputCantidad").value = "";
            document.getElementById("inputPrecio").value = "";

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
const eliminarFila = (boton) => {
    let fila = boton.parentNode.parentNode;
    fila.remove();
    actTotal();
};

//FUNCION PARA ACTUALIZAR EL TOTAL ACUMULADO DE LOS PRECIOS
const actTotal = () => {
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
btn_add.addEventListener("click", funcionAgregar);

let btn_del = document.getElementById("btn_del");


    