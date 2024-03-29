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
        this.cargarDatosDesdeLocalStorage();
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
            localStorage.setItem("listaEntrada", JSON.stringify(this.listaEntrada));
            const precioTotal = nuevaEntrada.precio * nuevaEntrada.cantidad;

            // AGREGO AL DOM
            let tableHeader = document.getElementById("table_header");
            tableHeader.innerHTML = `
            <tr class="section_table_header" id="tr_header">
            <th><strong><em>Product</em></strong></th>
            <th><strong><em>Unit</em></strong></th>
            <th><strong><em>Price</em></strong></th>
            <th><strong><em>Total</em></th>
            <th class="td_btn"><i onclick="eliminarTabla()" class="ri-close-circle-line icon_delete"></i>
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

    // CARGAR DATOS AL INICIO
    cargarDatosDesdeLocalStorage() {
        const datosGuardados = localStorage.getItem("listaEntrada");
        if (datosGuardados) {
            // Si hay datos en el localStorage, cargarlos en this.listaEntrada
            this.listaEntrada = JSON.parse(datosGuardados);
            const tabla = document.getElementById("tablas");
            
            
            // Agregar las entradas al DOM
            this.listaEntrada.forEach((entrada) => {
                
                let tableHeader = document.getElementById("table_header");
                tableHeader.innerHTML = `
                <tr class="section_table_header" id="tr_header">
                <th><strong><em>Product</em></strong></th>
                <th><strong><em>Unit</em></strong></th>
                <th><strong><em>Price</em></strong></th>
                <th><strong><em>Total</em></th>
                <th class="td_btn"><i onclick="eliminarTabla()" class="ri-close-circle-line icon_delete"></i>
                </tr>
                `;
                let entradaPrecioTotal = entrada.precio * entrada.cantidad
                const nuevaFila = document.createElement("tr");
                nuevaFila.innerHTML = `
                <td>${entrada.nombre.toUpperCase()}</td>
                <td>${entrada.cantidad}</td>
                <td>$ ${entrada.precio}</td>
                <td id="idPrecio">$ ${(entradaPrecioTotal).toFixed(2)}</td>
                <td class="td_btn"><i onclick="eliminarFila(this)" class="ri-delete-bin-fill icon_delete"></i></td>
                `;
                tabla.appendChild(nuevaFila);
            })
    
            
    
            // Actualizar la visualización de la lista en el DOM si es necesario
            // (código para agregar elementos al DOM según this.listaEntrada)
        }
    }

};

// INICIALIZO AL OBJETO
const productoAgregado = new ListaEntradas;

// FUNCION PARA AGREGAR PRODUCTOS A LA LISTA
const funcionAgregar = () => {
    const prodAgregadoEnLista = productoAgregado.agregarListaEntrada();

    //! ESTOY HACIENDO QUE SE GUARDE EN EL LOCAL STORAGE LA LISTA CON EL USUARIO EN MINUSCULA. 
    //TODO HACER QUE AL BORRAR UN PRODUCTO DE LA LISTA LO BORRE DEL STORAGE DEL USUARIO. 
            //TODO LA FUNCION ELIMINARFILA NO ESTA RELACIONADA CON EL ARRAY. SOLO BORRA LA FILA SELECCIONADA
    //TODO HACER UN BOTON PARA TRAER EL HISTORIAL DE LA LISTA DEL USUARIO AL FRONT

};

// FUNCION PARA BUSCAR PRODUCTOS EN LA LISTA
const funcionBuscar = () => {
    let dataBtnSearch = document.getElementById("search").value;
    productoAgregado.buscarListaEntrada(dataBtnSearch.toUpperCase());
    document.getElementById("search").value = "";
};


//TODO OPTIMIZAR LOS CODIGOS DE LAS FUNCIONES QUE ELIMINAN
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
            actualizarLocalStorage();
            
            
            //! INICIO DE DELETE DE FILA DE USUARIO
            
            if (userLogin) {
                let fila = boton.parentNode.parentNode;
                fila.remove();
                actTotal();
            };
            
            //! FIN DE DELETE DE FILA DE USUARIO


            // FUNCION SWEETALERT
            sweetAlert('Deleted','success', 'Done', false);
            };
        });
};


//FUNCION PARA BORRAR LA TABLA DEL USUARIO LOGEADO
const eliminarTabla = () => {
    Swal.fire({
        text: `This will delete all the table, are you sure? There´s no way back from this`,
        icon: 'question',
        confirmButtonText: 'Yes, empty the table!!',
        confirmButtonColor: "#3a4a58"
    }).then((result) => {
        if (result.isConfirmed) {
            let tabla = document.getElementById("tablas");
            while (tabla.rows.length > 0) {
            tabla.deleteRow(0);
            }
            actTotal();
            localStorage.clear()
            // FUNCION SWEETALERT
            sweetAlert('Deleted','success', 'Done', false);
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
    localStorage.setItem("totalSuma",  JSON.stringify(totalSuma))

};

// FUNCION PARA ACTUALIZAR EL LOCALSTORAGE DESPUÉS DE BORRAR UNA FILA
const actualizarLocalStorage = () => {
    const tabla = document.getElementById("tablas");
    const filas = tabla.getElementsByTagName("tr");
    const listaEntrada = [];

    for (let i = 0; i < filas.length; i++) {
        const celdas = filas[i].getElementsByTagName("td");
        const nombre = celdas[0].textContent;
        const cantidad = parseInt(celdas[1].textContent);
        const precio = parseFloat(celdas[2].textContent.replace("$", ""));
        listaEntrada.push({ nombre, cantidad, precio });
    }

    localStorage.setItem("listaEntrada", JSON.stringify(listaEntrada));

    // Actualizar el total en el localStorage
    actTotal();
};

// Llamar a actualizarLocalStorage también en la carga inicial para garantizar que los datos estén sincronizados
actualizarLocalStorage();

const datosGuardados = localStorage.getItem("totalSuma");
if (datosGuardados) {
    // Si hay datos en el localStorage, cargarlos en this.listaEntrada
    this.totalSuma = JSON.parse(datosGuardados);
    document.getElementById("output").innerHTML = `
    <p><strong>TOTAL $ ${totalSuma.toFixed(2)}</strong></p>
    `;
}

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
    const storedChecklist = localStorage.getItem(user);

    if (storedChecklist) {
        const checklist = JSON.parse(storedChecklist);

        for (const id in checklist) {
        const checkbox = document.getElementById(id);
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