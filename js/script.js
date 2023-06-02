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
let searchOutput;
    
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

            // FUNCION SWEETALERT
            sweetAlert(`Debe ingresar un producto o un numero entero positivo`,'warning', 'Got it!' )
            
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

            // EJECUTO LA FUNCION PARA ACTUALIZAR EL TOTAL DE PRECIOS
            actTotal();

            // RESTAURO LOS CAMPOS DE FORMULARIO AL ESTADO INICIAL
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

        const resultado = productoBuscar.includes(name) 

        if (resultado) {
            // FUNCION SWEETALERT
            sweetAlert(`Ya agregaste ${name} en la lista!`,'success', 'Ok' );
        } else {
            // FUNCION SWEETALERT
            sweetAlert(`Todavía no agregaste ${name}`,'error', 'Ok' );
        };

        document.getElementById("search").addEventListener("click", () => {})
    };
};

// INICIALIZO AL OBJETO
const productoAgregado = new ListaEntradas;

// FUNCION PARA AGREGAR PRODUCTOS A LA LISTA
const funcionAgregar = () => {
    infoTabla = productoAgregado.agregarListaEntrada()
};

// FUNCION PARA BUSCAR PRODUCTOS A LA LISTA
const funcionBuscar = () => {
    let dataBtnSearch = document.getElementById("search").value;
    console.log(dataBtnSearch);
    productoAgregado.buscarListaEntrada(dataBtnSearch.toUpperCase());
    document.getElementById("search").value = "";
};

// FUNCION PARA BORRAR PRODUCTOS A LA LISTA
const eliminarFila = (boton) => {
    
    Swal.fire({
        text: `Deseas borrar el producto??`,
        icon: 'question',
        confirmButtonText: 'Are you sure?'
        }).then((result) => {
            if (result.isConfirmed) {
                let fila = boton.parentNode.parentNode;
                fila.remove();
                actTotal();
                   // FUNCION SWEETALERT
                   sweetAlert('Borrado','success', 'Done' );
            };
        });
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
};
const funcionColorUpBtnSrc = () => {
    document.getElementById("btn_src").classList.remove("btn_color")
};

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
    return sectionUser
};

// FUNCION AGREGAR USUARIO
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


        // if (translationEnabled) {
        //     if (sessionStorage.getItem("usuario") === null) {
        //         document.getElementById("todayList").innerHTML = `La lista para hoy`;
        //     } else {
        //         document.getElementById("todayList").innerHTML = `La lista de ${sessionStorage.getItem("usuario")} para hoy`;
        //     };
        // } else {
        //     if (sessionStorage.getItem("usuario") === null) {
        //         document.getElementById("todayList").innerHTML = `Today's List`;
        //     } else {
        //         document.getElementById("todayList").innerHTML = `Today's ${sessionStorage.getItem("usuario")} List`;
        //     };
        // }



        document.getElementById("logout").addEventListener("click", funcionDelUser);
    };
};

// FUNCION ELIMINAR USUSARIO
const funcionDelUser = () => {
    sessionStorage.clear()
    location.reload()

    //! NO ELIMINAR!!! OPCION DE FUNCION
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

// FUNCION ESCONDER LOGIN USUARIO
const funcionLoginDel = () => {
    const sectionLogin = document.getElementById("sectionLogin");
    sectionLogin.innerHTML = ``
};
let toggleLoginState = true;
document.getElementById("login").addEventListener("click", function(){
    if (toggleLoginState) {
        funcionLogin();
    } else {
        funcionLoginDel();
    };
    toggleLoginState = !toggleLoginState;
});

// FUNCION SWEETALERT
function sweetAlert(text, icon, button ) {
    Swal.fire({
        text: text,
        icon: icon,
        confirmButtonText: button,
        timer: 1500,
        background: "red"
        });
};

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


//!++++++++++++++++++++++++++++++++++++++++++++++++++++++
        //* TRANSLATE FEATURE

//todo 1- traer los tags (html) al js (asignarles una variable)- h1, h2, span, p, input

//todo 2- hacer la funcion para cambiar el text

//todo 3- traer el boton a js y asignarle un evento

let translationEnabled = true;
const translate = () =>{

    if (sessionStorage.getItem("usuario") === null) {
        document.getElementById("todayList").innerHTML = `La lista para hoy`;
    } else {
        document.getElementById("todayList").innerHTML = `La lista de ${sessionStorage.getItem("usuario")} para hoy`;
    };


    const mySavedListEng = "My saved List"
    const mySavedListEsp =  "Mis listas guardadas"
    const savedList = document.getElementById("savedList");

    const aboutOurAppEng = "About our App"
    const aboutOurAppEsp = "Sobre nuestra App"
    const aboutOurApp = document.getElementById("aboutOurApp");

    const talkToUsEng = "Talk to Us"
    const talkToUsEsp = "Comunícate con nosotros"
    const talkToUs = document.getElementById("talkToUs");

    const aboutOurAppP1Eng = "Welcome to our supermarket list! This is your ultimate guide to shopping for groceries at our store. We've put together a comprehensive list of all the items you need to stock up your pantry and fridge. Our list includes everything from fresh produce to pantry staples, so you can easily find everything you need in one place.";
    const aboutOurAppP1Esp = "¡Bienvenido a nuestra lista de supermercado! Esta es tu guía definitiva para hacer compras de alimentos en nuestra tienda. Hemos creado una lista completa de todos los artículos que necesitas para abastecer tu despensa y refrigerador. Nuestra lista incluye desde productos frescos hasta ingredientes básicos de despensa, para que puedas encontrar fácilmente todo lo que necesitas en un solo lugar.";
    const aboutOurAppP1 = document.getElementById("aboutOurAppP1");

    const aboutOurAppP2Eng = "So, grab your shopping cart and get ready to fill it up with all the items on your list. With our comprehensive selection, competitive prices, and helpful staff, you'll be able to get everything you need in one convenient shopping trip.";
    const aboutOurAppP2Esp = "Así que, agarra tu carrito de compras y prepárate para llenarlo con todos los artículos de tu lista. Con nuestra amplia selección, precios competitivos y personal amable, podrás obtener todo lo que necesitas en un solo viaje de compras conveniente.";
    const aboutOurAppP2 = document.getElementById("aboutOurAppP2");

    const talkToUsPEng = "Follow us on our social media platforms for more information. Thank you!" 
    const talkToUsPEsp = "Síguenos en nuestras redes sociales para obtener más información. ¡Gracias!"
    const talkToUsP = document.getElementById("talkToUsP");

    if (translationEnabled) {
        savedList.innerHTML = mySavedListEsp;
        aboutOurApp.innerHTML = aboutOurAppEsp;
        talkToUs.innerHTML = talkToUsEsp;
        aboutOurAppP1.innerHTML = aboutOurAppP1Esp;
        aboutOurAppP2.innerHTML = aboutOurAppP2Esp;
        talkToUsP.innerHTML = talkToUsPEsp;
        if (sessionStorage.getItem("usuario") === null) {
            document.getElementById("todayList").innerHTML = `La lista para hoy`;
        } else {
            document.getElementById("todayList").innerHTML = `La lista de ${sessionStorage.getItem("usuario")} para hoy`;
        };

    } else {
        savedList.innerHTML = mySavedListEng;
        aboutOurApp.innerHTML = aboutOurAppEng;
        talkToUs.innerHTML = talkToUsEng
        aboutOurAppP1.innerHTML = aboutOurAppP1Eng;
        aboutOurAppP2.innerHTML = aboutOurAppP2Eng;
        talkToUsP.innerHTML = talkToUsPEng;
        if (sessionStorage.getItem("usuario") === null) {
            document.getElementById("todayList").innerHTML = `Today's List`;
        } else {
            document.getElementById("todayList").innerHTML = `Today's ${sessionStorage.getItem("usuario")} List`;
        };
    };
    translationEnabled = !translationEnabled
}; 
document.getElementById("translate").addEventListener("click", translate)

// LIBRERIA SCROLL REVEAL
ScrollReveal('.smooth', { easing: 'ease-in' });
ScrollReveal({ distance: '60px' });

ScrollReveal().reveal('section', { duration: 1500, origin: 'bottom'});
ScrollReveal().reveal('hr', { duration: 1500, origin: 'bottom'});
