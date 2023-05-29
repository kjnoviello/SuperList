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
            <tr class="section_table_header" id="tr_header">
            <th><strong><em>Product</em></strong></th>
            <th><strong><em>Unit</em></strong></th>
            <th><strong><em>Price</em></strong></th>
            <th><strong><em>Total</em></th>
            <th class="td_btn"><button style="visibility: hidden;">DEL</button></th>
            </tr>
            `;

            let contenedor = document.getElementById("tablas");
            let nuevo = document.createElement("tr");
            
            nuevo.innerHTML = `
            <td>${nombre.toUpperCase()}</td>
            <td>${cantidad}</td>
            <td>$ ${precio}</td>
            <td id="idPrecio">$ ${precioTotal.toFixed(2)}</td>
            <td class="td_btn"><i onclick="eliminarFila(this)" class="ri-delete-bin-fill icon_delete"></i></td>
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
    buscarListaEntrada(name){
        name.toLowerCase()
        const tabla = document.getElementById("tablas");
        const columnas = tabla.getElementsByTagName("tr");
        let productoBuscar = [];

        for (let i = 0; i < columnas.length; i++) {
            const celdas = columnas[i].getElementsByTagName("td");
            let array = celdas[0].textContent;
            productoBuscar.push(array)
        };

        const resultado = productoBuscar.includes(name) ? alert(`${name} esta en la lista!`) : alert(`No existe ${name} en la lista`)
        console.log(resultado);

        document.getElementById("search").addEventListener("click", () => {})
    };
};

// INICIALIZO AL OBJETO
const productoAgregado = new ListaEntradas;

// EJECUTO LA FUNCION PARA AGREGAR PRODUCTOS A LA LISTA
const funcionAgregar = () => {
    infoTabla = productoAgregado.agregarListaEntrada()
};

// EJECUTO LA FUNCION PARA BUSCAR PRODUCTOS A LA LISTA
const funcionBuscar = () => {
    let dataBtnSearch = document.getElementById("search").value;
    console.log(dataBtnSearch);
    productoAgregado.buscarListaEntrada(dataBtnSearch.toUpperCase());
    document.getElementById("search").value = "";
};

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

// CAMBIAR COLOR AL BOTON CUANDO SE HACE CLICK
const funcionColorDownBtnAdd = () => {
    document.getElementById("btn_add").classList.add("btn_color")
};
const funcionColorDownBtnSrc = () => {
    document.getElementById("btn_src").classList.add("btn_color")
};

const funcionColorUpBtnAdd = () => {
    document.getElementById("btn_add").classList.remove("btn_color")
}
const funcionColorUpBtnSrc = () => {
    document.getElementById("btn_src").classList.remove("btn_color")
}

// EVENTOS
// document.getElementById("btn_del");
document.getElementById("btn_add").addEventListener("click", funcionAgregar);
document.getElementById("btn_add").addEventListener("mousedown", funcionColorDownBtnAdd);
document.getElementById("btn_add").addEventListener("mouseup", funcionColorUpBtnAdd);


document.getElementById("btn_src").addEventListener("click", funcionBuscar);
document.getElementById("btn_src").addEventListener("mousedown", funcionColorDownBtnSrc);
document.getElementById("btn_src").addEventListener("mouseup", funcionColorUpBtnSrc);

// INICIO DE LOGIN
let userLogin;

const funcionLogin = () => {
    const sectionLogin = document.getElementById("sectionLogin");
    sectionLogin.innerHTML = `
        <section class="section fade" id="sectionUser">
        <input class="form_input" id="inputLogin" type="text" placeholder="Your user name">
        <input class="btn form_input btn_user" id="btn_user" type="button" value="Add User">
        </section>
    `;
    document.getElementById("btn_user").addEventListener("click", funcionAddUser);
};

const funcionAddUser = () => {
    userLogin = document.getElementById("inputLogin").value;
    
    if ((userLogin === "" || userLogin === null)) {
        alert("Debe ingresar un nombre de usuario")
    } else {
    
        sessionStorage.setItem("usuario", userLogin.toUpperCase());
    
        const sectionLogin = document.getElementById("sectionLogin");
        sectionLogin.innerHTML = "";
        
        document.getElementById("todayList").innerText = `Today's ${sessionStorage.getItem("usuario")} List`;
        
        const login = document.getElementById("login");
        login.classList.replace('ri-login-box-line', 'ri-logout-box-line');
        login.setAttribute('id', 'logout');
    
        document.getElementById("logout").addEventListener("click", funcionDelUser);
    };
};

const funcionDelUser = () => {
    location.reload()

    //! NO ELIMINAR!!! OPCION DE FUNCION
    // sessionStorage.clear()
    // document.getElementById("todayList").innerText = `Today's List`;
    // userLogin = "";
    // const logout = document.getElementById("logout");
    // logout.setAttribute("id", "login");
    // logout.classList.replace('ri-logout-box-line', 'ri-login-box-line');
    // const sectionLogin = document.getElementById("sectionLogin");
    // sectionLogin.innerHTML = "";
    // document.getElementById("login").addEventListener("click", funcionLogin);
    //! NO ELIMINAR!!! OPCION DE FUNCION
};


const funcionLoginDel = () => {
    const sectionLogin = document.getElementById("sectionLogin");
    sectionLogin.innerHTML = ``
}

let toggleState = true; // Variable to track the toggle state

document.getElementById("login").addEventListener("click", function(){
    if (toggleState) {
        funcionLogin(); // Call the function if the toggle state is true
    } else {
        funcionLoginDel();
    }
    
    toggleState = !toggleState; // Toggle the state variable
});

// document.getElementById("login").addEventListener("click", funcionLogin);


// DARK-MODE
const darkMode = () => {
    document.querySelectorAll("section").forEach(element => {
        element.classList.toggle("section");
        element.classList.toggle("section_dark_mode");
    });
    
    let body = document.querySelector("body");
    body.classList.toggle("body");
    body.classList.toggle("body_dark_mode");
    
    let dark_mode = document.getElementById("dark_mode")
    dark_mode.classList.toggle("ri-moon-fill");
    dark_mode.classList.toggle("ri-sun-fill");

    const social = document.getElementById("social").getElementsByTagName("i")
    for (let i = 0; i < social.length; i++) {
        social[i].classList.toggle("media");
    };

};
document.getElementById("dark_mode").addEventListener("click", darkMode)

