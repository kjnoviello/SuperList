// DEFINO LA CLASE ENTRADA DEL PRODUCTO
class Entrada {
    constructor(nombre, cantidad, precio) {
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
            sweetAlert(`Sorry, you must enter a product or a positive integer`,'warning', 'Got it!', false)
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

            // FUNCION TOAST
            toast("success", "Done!" );

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
        name.toLowerCase();
        const tabla = document.getElementById("tablas");
        const columnas = tabla.getElementsByTagName("tr");
        let productoBuscar = [];
        for (let i = 0; i < columnas.length; i++) {
            const celdas = columnas[i].getElementsByTagName("td");
            let array = celdas[0].textContent;
            productoBuscar.push(array);
        };
        const resultado = productoBuscar.includes(name); 

        if (resultado) {
            // FUNCION SWEETALERT
            sweetAlert(`You already add ${name} to this list!`,'success', 'Ok', false );
        } else {
            // FUNCION SWEETALERT
            sweetAlert(`There's no ${name} yet`,'error', 'Ok', false );
        };
        document.getElementById("search").addEventListener("click", () => {});
    };
};

// INICIALIZO AL OBJETO
const productoAgregado = new ListaEntradas;

// FUNCION PARA AGREGAR PRODUCTOS A LA LISTA
const funcionAgregar = () => {
    infoTabla = productoAgregado.agregarListaEntrada()
};

// FUNCION PARA BUSCAR PRODUCTOS EN LA LISTA
const funcionBuscar = () => {
    let dataBtnSearch = document.getElementById("search").value;
    productoAgregado.buscarListaEntrada(dataBtnSearch.toUpperCase());
    document.getElementById("search").value = "";
};

// FUNCION PARA BORRAR PRODUCTOS DE LA LISTA
const eliminarFila = (boton) => {  
    Swal.fire({
        text: `Do you want to delete this??`,
        icon: 'question',
        confirmButtonText: 'Yes, i do',
        confirmButtonColor: "#3a4a58"
    }).then((result) => {
        if (result.isConfirmed) {
            let fila = boton.parentNode.parentNode;
            fila.remove();
            actTotal();
            // FUNCION SWEETALERT
            sweetAlert('Deleted','success', 'Done', false );
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

// FUNCION PARA LOGIN
let userLogin;
const funcionLogin = () => {
    const sectionLogin = document.getElementById("sectionLogin");
    sectionLogin.innerHTML = `
        <section class="section fade ${darkModeEnabled ? '' : 'section_dark_mode'}" id="sectionUser">
        <div class="form_div form_div_login">
        <input class="form_input" id="inputLogin" type="text" placeholder="Your user name">
        <input class="btn form_input btn_user" id="btn_user" type="button" value="Add User">
        </div>
        </section>
        <hr class="fade">
    `;
    document.getElementById("btn_user").addEventListener("click", funcionAddUser);
};

// FUNCION PARA AGREGAR USUARIO EN EL LOGIN
const funcionAddUser = () => {
    userLogin = document.getElementById("inputLogin").value;
    
    if ((userLogin === "" || userLogin === null)) {
        sweetAlert("Please type in your User name", "warning", "ok", false)
    } else {
        sessionStorage.setItem("usuario", userLogin.toUpperCase());

        const sectionLogin = document.getElementById("sectionLogin");
        sectionLogin.innerHTML = "";
        
        document.getElementById("logP").innerText = `LOG OUT`;
        document.getElementById("todayList").innerText = `Today's ${sessionStorage.getItem("usuario")} List`;
        
        const login = document.getElementById("login");
        login.classList.replace('ri-login-box-line', 'ri-logout-box-line');
        login.setAttribute('id', 'logout');
        document.getElementById("logout").addEventListener("click", funcionDelUser);

        // FUNCION SWEETALERT
        sweetAlert(`Welcome ${sessionStorage.getItem("usuario", userLogin.toUpperCase())}`, 'info', 'Done', false);

        // REVISA SI EL USUARIO YA TIENE UN CHECKLIST GUARDADA
        restoreUserChecklist();
    };
};

// FUNCION ELIMINAR USUSARIO
const funcionDelUser = () => {
    toggleLoginState = false;
    Swal.fire({
        text: 'Wait!, do you really want to leave?',
        icon: 'question',
        confirmButtonText: 'Yes, i do',
        confirmButtonColor: "#3a4a58",        
    }).then((result) => {
        if(result.isConfirmed) {
            sessionStorage.removeItem("usuario")
            location.reload();
        };
    });
};

// FUNCION ESCONDER LOGIN USUARIO
const funcionLoginDel = () => {
    const sectionLogin = document.getElementById("sectionLogin");
    sectionLogin.innerHTML = ``;
};
let toggleLoginState = true;
document.getElementById("login").addEventListener("click", function(){
    toggleLoginState ? funcionLogin() : funcionLoginDel();
    toggleLoginState = !toggleLoginState;
});

// DARK-MODE
let darkModeEnabled = true;
const darkMode = () => {
    const body = document.querySelector("body");
    const darkModeToggle = document.getElementById("dark_mode");
  
    body.classList.toggle("body_dark_mode");
    darkModeToggle.classList.toggle("ri-sun-fill");
    
    const sections = document.querySelectorAll("section");
    sections.forEach((section) => {
      section.classList.toggle("section_dark_mode");
    });
    
    const socialIcons = document.getElementById("social").getElementsByTagName("i");
    for (let i = 0; i < socialIcons.length; i++) {
      socialIcons[i].classList.toggle("media");
    };
    darkModeEnabled = !darkModeEnabled;
  };
document.getElementById("dark_mode").addEventListener("click", darkMode);

// API - MODAL PARA RECETA
let recipeImg;
const getRecipe = async () => {
    await fetch('https://www.themealdb.com/api/json/v1/1/random.php')
        .then(response => response.json())
        .then(data => {
            const recipe = data.meals[0];
            const recipeName = recipe.strMeal;
            const recipeCategory = recipe.strCategory;
            const recipeInstructions = recipe.strInstructions;
            recipeImg = recipe.strMealThumb
        Swal.fire({
            title: recipeName,
            html: `
                <p><strong>Category:</strong> ${recipeCategory}</p>
                <p class="pIndex"><strong>Instructions:</strong> ${recipeInstructions}</p>
                <img src="${recipeImg}"/>
            `,
            confirmButtonColor: "#3a4a58"
            });
        })
        .catch(err => {
            Swal.fire({
                title: "Ops, please try later",
                text: err,
                icon: "error",
                confirmButtonText: "OK",
                confirmButtonColor: "#3a4a58"
            });
        })
        .finally(
            console.log("End of process")
        );
};
const openModalRecipe = document.getElementById('imgRecipe');
openModalRecipe.addEventListener('click', getRecipe);

// GUARDAR CHECKLIST DEL USUARIO
const checkboxes = document.querySelectorAll('input[type="checkbox"]');
checkboxes.forEach((checkbox) => {
    checkbox.addEventListener('change', () => {
        const usuario = sessionStorage.getItem("usuario");
        const checkboxId = checkbox.id;
        const isChecked = checkbox.checked;
        const usuarioData = JSON.parse(localStorage.getItem(usuario)) || {};

        // ACTUALIZA EL VALOR EN EL USUARIODATA
        usuarioData[checkboxId] = isChecked;

        // GUARDA USUARIODATA EN EL LOCALSTORAGE
        localStorage.setItem(usuario, JSON.stringify(usuarioData));
    });
});

// FUNCION PARA RESTAURAR CHECKLIST DEL USUARIO
const restoreUserChecklist = () => {
    const user =  sessionStorage.getItem("usuario")
    console.log(`log de user ${user}`);
    const storedChecklist = localStorage.getItem(user);
    console.log("log de storedChecklist", storedChecklist);

    if (storedChecklist) {
        const checklist = JSON.parse(storedChecklist);
        console.log("log de checklist", checklist);

        for (const id in checklist) {
        const checkbox = document.getElementById(id);
        console.log("log de checkbox", checkbox);

            if (checkbox) {
                checkbox.checked = checklist[id];
            };
        };
    };  
};
document.addEventListener('DOMContentLoaded', restoreUserChecklist);

// FUNCION SWEETALERT
function sweetAlert(text, icon, buttonText, showButton ) {
    Swal.fire({
        text: text,
        icon: icon,
        confirmButtonText: buttonText,
        timer: 2000,
        background: "white",
        color: "#666565",
        confirmButtonColor: "#3a4a58",
        showConfirmButton : showButton
        });
};

// FUNCION TOAST
const Toast = Swal.mixin({
    toast: true,
    position: 'top',
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: false,
    didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer);
        toast.addEventListener('mouseleave', Swal.resumeTimer);
    }
});
function toast (icon, text) {  
    Toast.fire({
        icon: icon,
        title: text,
        color: "#666565"
    });
};

// CAMBIAR COLOR AL BOTON AGREGAR Y BUSCAR CUANDO SE HACE CLICK
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
document.getElementById("btn_add").addEventListener("click", funcionAgregar);
document.getElementById("btn_add").addEventListener("mousedown", funcionColorDownBtnAdd);
document.getElementById("btn_add").addEventListener("mouseup", funcionColorUpBtnAdd);
document.getElementById("btn_src").addEventListener("click", funcionBuscar);
document.getElementById("btn_src").addEventListener("mousedown", funcionColorDownBtnSrc);
document.getElementById("btn_src").addEventListener("mouseup", funcionColorUpBtnSrc);

// LIBRERIA SCROLL REVEAL
ScrollReveal('.smooth', { easing: 'ease-in' });
ScrollReveal({ distance: '60px' });
ScrollReveal().reveal('section', { duration: 1500, origin: 'bottom'});
ScrollReveal().reveal('hr', { duration: 1500, origin: 'bottom'});