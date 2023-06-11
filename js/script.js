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

// INICIO DE LOGIN
let userLogin;
const funcionLogin = () => {
    const sectionLogin = document.getElementById("sectionLogin");

    sectionLogin.innerHTML = `
        <section class="section fade ${darkModeEnabled ? '' : 'section_dark_mode'}" id="sectionUser">
        <input class="form_input" id="inputLogin" type="text" placeholder="Your user name">
        <input class="btn form_input btn_user" id="btn_user" type="button" value="Add User">
        </section>
        <hr class="fade">
    `;

    document.getElementById("btn_user").addEventListener("click", funcionAddUser);
};

// FUNCION AGREGAR USUARIO
const funcionAddUser = () => {
    userLogin = document.getElementById("inputLogin").value;
    
    if ((userLogin === "" || userLogin === null)) {
        sweetAlert("Debe ingresar un nombre de usuario", "warning", "ok", false)
    } else {
    
        sessionStorage.setItem("usuario", userLogin.toUpperCase());
    
        const sectionLogin = document.getElementById("sectionLogin");
        sectionLogin.innerHTML = "";
        
        document.getElementById("todayList").innerText = `Today's ${sessionStorage.getItem("usuario")} List`;
        
        const login = document.getElementById("login");
        login.classList.replace('ri-login-box-line', 'ri-logout-box-line');
        login.setAttribute('id', 'logout');


        //! BUSCANDO EL ERROR AL TRADUCIR CON UN USUARIO LOGEADO
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
        //! FIN DE BUSCANDO EL ERROR AL TRADUCIR CON UN USUARIO LOGEADO



        document.getElementById("logout").addEventListener("click", funcionDelUser);

        // FUNCION SWEETALERT
        sweetAlert(`Bienvenido ${sessionStorage.getItem("usuario", userLogin.toUpperCase())}`, 'info', 'Done', false);
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


    //! NO ELIMINAR!!! OPCION DE FUNCION
    // sessionStorage.removeItem("usuario");
    // document.getElementById("todayList").innerText = `Today's List`;
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
    sectionLogin.innerHTML = ``;
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

let olive;
// CHECKLIST
const getChecklist = () => {
    const { value: accept } = Swal.fire({
        title: 'Grocery list',
        confirmButtonColor: "#3a4a58",
        html: `
        <h4>Market</h4>
        <div class="modalCheckContainer">
        <div class="modalCheckDiv">
        <input type="checkbox" id="olive"><p>Olive</p>
        </div>
        <div class="modalCheckDiv">
        <input type="checkbox"><p>Rice</p>
        </div>
        <div class="modalCheckDiv">
        <input type="checkbox"><p>Soup</p>
        </div>
        <div class="modalCheckDiv">
        <input type="checkbox"><p>Flour</p>
        </div>
        <div class="modalCheckDiv">
        <input type="checkbox"><p>Grated bread</p>
        </div>
        </div>
        <hr>

        <h4>Breakfast & Snack</h4>
        <div class="modalCheckContainer">
        <div class="modalCheckDiv">
        <input type="checkbox"><p>Sugar</p>
        </div>
        <div class="modalCheckDiv">
        <input type="checkbox"><p>Coffe</p>
        </div>
        <div class="modalCheckDiv">
        <input type="checkbox"><p>Milk</p>
        </div>
        <div class="modalCheckDiv">
        <input type="checkbox"><p>Tea</p>
        </div>
        <div class="modalCheckDiv">
        <input type="checkbox"><p>Cereal</p>
        </div>
        <div class="modalCheckDiv">
        <input type="checkbox"><p>Cookies</p>
        </div>
        </div>
        <hr>

        <h4>Dip & Condiments</h4>
        <div class="modalCheckContainer">
        <div class="modalCheckDiv">
        <input type="checkbox"><p>Olive oil</p>
        </div>
        <div class="modalCheckDiv">
        <input type="checkbox"><p>Pepper</p>
        </div>
        <div class="modalCheckDiv">
        <input type="checkbox"><p>Salt</p>
        </div>
        <div class="modalCheckDiv">
        <input type="checkbox"><p>Ketchup</p>
        </div>
        <div class="modalCheckDiv">
        <input type="checkbox"><p>Mayonnaise</p>
        </div>
        <div class="modalCheckDiv">
        <input type="checkbox"><p>Mustard</p>
        </div>
        <div class="modalCheckDiv">
        <input type="checkbox"><p>Tomato sauce</p>
        </div>
        </div>
        <hr>

        <h4>Vegetables</h4>
        <div class="modalCheckContainer">
        <div class="modalCheckDiv">
        <input type="checkbox"><p>Potato</p>
        </div>
        <div class="modalCheckDiv">
        <input type="checkbox"><p>Eggplant</p>
        </div>
        <div class="modalCheckDiv">
        <input type="checkbox"><p>Broccoli</p>
        </div>
        <div class="modalCheckDiv">
        <input type="checkbox"><p>Pumpkin</p>
        </div>
        <div class="modalCheckDiv">
        <input type="checkbox"><p>Onion</p>
        </div>
        <div class="modalCheckDiv">
        <input type="checkbox"><p>Mustard</p>
        </div>
        <div class="modalCheckDiv">
        <input type="checkbox"><p>Cauliflower</p>
        </div>
        <div class="modalCheckDiv">
        <input type="checkbox"><p>Spinach</p>
        </div>
        <div class="modalCheckDiv">
        <input type="checkbox"><p>Lettuce</p>
        </div>
        <div class="modalCheckDiv">
        <input type="checkbox"><p>Carrot</p>
        </div>
        <div class="modalCheckDiv">
        <input type="checkbox"><p>Tomato</p>
        </div>
        </div>
        <hr>

        <h4>Fruits</h4>
        <div class="modalCheckContainer">
        <div class="modalCheckDiv">
        <input type="checkbox"><p>PineApple</p>
        </div>
        <div class="modalCheckDiv">
        <input type="checkbox"><p>Banana</p>
        </div>
        <div class="modalCheckDiv">
        <input type="checkbox"><p>Lemmon</p>
        </div>
        <div class="modalCheckDiv">
        <input type="checkbox"><p>Strawberry</p>
        </div>
        <div class="modalCheckDiv">
        <input type="checkbox"><p>Apple</p>
        </div>
        <div class="modalCheckDiv">
        <input type="checkbox"><p>Orange</p>
        </div>
        <div class="modalCheckDiv">
        <input type="checkbox"><p>Pear</p>
        </div>
        <div class="modalCheckDiv">
        <input type="checkbox"><p>Melon</p>
        </div>
        <div class="modalCheckDiv">
        <input type="checkbox"><p>Grapefruit</p>
        </div>
        <div class="modalCheckDiv">
        <input type="checkbox"><p>Grape</p>
        </div>
        <div class="modalCheckDiv">
        <input type="checkbox"><p>Watermelon</p>
        </div>
        </div>
        <hr>
        `,
    });

    //! GUARDAR CHECKLIST
    // Obtener todos los checkboxes
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    const checkboxesOlive = document.getElementById('olive');
    checkboxesOlive.addEventListener("change", () => {
        // Obtener el estado del checkbox
        const checkboxesOliveState = checkboxesOlive.checked;

        console.log(checkboxesOliveState);
        // Guardar el estado del checkbox en el almacenamiento local
        localStorage.setItem("checkbox.id", checkboxesOliveState);
        const check = localStorage.getItem("checkbox.id", checkboxesOliveState);
        console.log(check);
        });
    console.log(checkboxes);

    // Escuchar el evento de cambio en los checkboxes
    checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', () => {
        // Obtener el estado del checkbox
        const checkboxState = checkbox.checked;
        console.log(checkboxState);
        // Guardar el estado del checkbox en el almacenamiento local
        localStorage.setItem("checkbox.id", checkboxState);
        const check = localStorage.getItem("checkbox.id", checkboxState);
        console.log(check);
        });
    });
    //! FIN DE GUARDAR CHECKLIST

};
const openModalChecklist = document.getElementById("imgCheck");
openModalChecklist.addEventListener("click", getChecklist);

// LIBRERIA SCROLL REVEAL
ScrollReveal('.smooth', { easing: 'ease-in' });
ScrollReveal({ distance: '60px' });
ScrollReveal().reveal('section', { duration: 1500, origin: 'bottom'});
ScrollReveal().reveal('hr', { duration: 1500, origin: 'bottom'});





//!++++++++++++++++++++++++++++++++++++++++++++++++++++++
 //* TRANSLATE FEATURE (EN PROGRESO, NO ESTA TERMIANDO)

let translationEnabled = true;
const translate = () =>{

    if (sessionStorage.getItem("usuario") === null) {
        document.getElementById("todayList").innerHTML = `La lista para hoy`;
    } else {
        document.getElementById("todayList").innerHTML = `La lista de ${sessionStorage.getItem("usuario")} para hoy`;
    };

    const translationToggle = document.getElementById("translate");
    translationToggle.classList.toggle("ri-translate-2");
    translationToggle.classList.toggle("ri-translate");



    const mySavedListEng = "My saved List";
    const mySavedListEsp =  "Mis listas guardadas";
    const savedList = document.getElementById("savedList");

    const aboutOurAppEng = "About our App";
    const aboutOurAppEsp = "Sobre nuestra App";
    const aboutOurApp = document.getElementById("aboutOurApp");

    const talkToUsEng = "Talk to Us";
    const talkToUsEsp = "Comunícate con nosotros";
    const talkToUs = document.getElementById("talkToUs");

    const aboutOurAppP1Eng = "Welcome to our supermarket list! This is your ultimate guide to shopping for groceries at our store. We've put together a comprehensive list of all the items you need to stock up your pantry and fridge. Our list includes everything from fresh produce to pantry staples, so you can easily find everything you need in one place.";
    const aboutOurAppP1Esp = "¡Bienvenido a nuestra lista de supermercado! Esta es tu guía definitiva para hacer compras de alimentos en nuestra tienda. Hemos creado una lista completa de todos los artículos que necesitas para abastecer tu despensa y refrigerador. Nuestra lista incluye desde productos frescos hasta ingredientes básicos de despensa, para que puedas encontrar fácilmente todo lo que necesitas en un solo lugar.";
    const aboutOurAppP1 = document.getElementById("aboutOurAppP1");

    const aboutOurAppP2Eng = "So, grab your shopping cart and get ready to fill it up with all the items on your list. With our comprehensive selection, competitive prices, and helpful staff, you'll be able to get everything you need in one convenient shopping trip.";
    const aboutOurAppP2Esp = "Así que, agarra tu carrito de compras y prepárate para llenarlo con todos los artículos de tu lista. Con nuestra amplia selección, precios competitivos y personal amable, podrás obtener todo lo que necesitas en un solo viaje de compras conveniente.";
    const aboutOurAppP2 = document.getElementById("aboutOurAppP2");

    const talkToUsPEng = "Follow us on our social media platforms for more information. Thank you!" ;
    const talkToUsPEsp = "Síguenos en nuestras redes sociales para obtener más información. ¡Gracias!";
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
        talkToUs.innerHTML = talkToUsEng;
        aboutOurAppP1.innerHTML = aboutOurAppP1Eng;
        aboutOurAppP2.innerHTML = aboutOurAppP2Eng;
        talkToUsP.innerHTML = talkToUsPEng;
        if (sessionStorage.getItem("usuario") === null) {
            document.getElementById("todayList").innerHTML = `Today's List`;
        } else {
            document.getElementById("todayList").innerHTML = `Today's ${sessionStorage.getItem("usuario")} List`;
        };
    };
    translationEnabled = !translationEnabled;
}; 
document.getElementById("translate").addEventListener("click", translate);