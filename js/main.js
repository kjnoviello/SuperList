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
    
        localStorage.setItem("usuario", userLogin.toUpperCase());

        const sectionLogin = document.getElementById("sectionLogin");
        sectionLogin.innerHTML = "";
        
        document.getElementById("todayList").innerText = `Today's ${localStorage.getItem("usuario")} List`;
        
        const login = document.getElementById("login");
        login.classList.replace('ri-login-box-line', 'ri-logout-box-line');
        login.setAttribute('id', 'logout');

        document.getElementById("logout").addEventListener("click", funcionDelUser);

        // FUNCION SWEETALERT
        sweetAlert(`Bienvenido ${localStorage.getItem("usuario", userLogin.toUpperCase())}`, 'info', 'Done', false);



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
            localStorage.removeItem("usuario")
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

// CHECKLIST
// const getChecklist = () => {
//     const { value: accept } = Swal.fire({
//         title: 'Grocery list',
//         confirmButtonColor: "#3a4a58",
//         html: `
//         <h4>Market</h4>
//         <div class="modalCheckContainer">
//         <div class="modalCheckDiv"><input type="checkbox" id="olive"><p>Olive</p></div>
//         <div class="modalCheckDiv"><input type="checkbox" id="rice"><p>Rice</p></div>
//         <div class="modalCheckDiv"><input type="checkbox" id="soup"><p>Soup</p></div>
//         <div class="modalCheckDiv"><input type="checkbox" id="flour"><p>Flour</p></div>
//         <div class="modalCheckDiv"><input type="checkbox" id="gratedBread"><p>Grated bread</p></div>
//         </div>
//         <hr>

//         <h4>Breakfast & Snack</h4>
//         <div class="modalCheckContainer">
//         <div class="modalCheckDiv"><input type="checkbox"><p>Sugar</p></div>
//         <div class="modalCheckDiv"><input type="checkbox"><p>Coffe</p></div>
//         <div class="modalCheckDiv"><input type="checkbox"><p>Milk</p></div>
//         <div class="modalCheckDiv"><input type="checkbox"><p>Tea</p></div>
//         <div class="modalCheckDiv"><input type="checkbox"><p>Cereal</p></div>
//         <div class="modalCheckDiv"><input type="checkbox"><p>Cookies</p></div>
//         </div>
//         <hr>

//         <h4>Dip & Condiments</h4>
//         <div class="modalCheckContainer">
//         <div class="modalCheckDiv"><input type="checkbox"><p>Olive oil</p></div>
//         <div class="modalCheckDiv"><input type="checkbox"><p>Pepper</p></div>
//         <div class="modalCheckDiv"><input type="checkbox"><p>Salt</p></div>
//         <div class="modalCheckDiv"><input type="checkbox"><p>Ketchup</p></div>
//         <div class="modalCheckDiv"><input type="checkbox"><p>Mayonnaise</p></div>
//         <div class="modalCheckDiv"><input type="checkbox"><p>Mustard</p></div>
//         <div class="modalCheckDiv"><input type="checkbox"><p>Tomato sauce</p></div>
//         </div>
//         <hr>

//         <h4>Vegetables</h4>
//         <div class="modalCheckContainer">
//         <div class="modalCheckDiv"><input type="checkbox"><p>Potato</p></div>
//         <div class="modalCheckDiv"><input type="checkbox"><p>Eggplant</p></div>
//         <div class="modalCheckDiv"><input type="checkbox"><p>Broccoli</p></div>
//         <div class="modalCheckDiv"><input type="checkbox"><p>Pumpkin</p></div>
//         <div class="modalCheckDiv"><input type="checkbox"><p>Onion</p></div>
//         <div class="modalCheckDiv"><input type="checkbox"><p>Mustard</p></div>
//         <div class="modalCheckDiv"><input type="checkbox"><p>Cauliflower</p></div>
//         <div class="modalCheckDiv"><input type="checkbox"><p>Spinach</p></div>
//         <div class="modalCheckDiv"><input type="checkbox"><p>Lettuce</p></div>
//         <div class="modalCheckDiv"><input type="checkbox"><p>Carrot</p></div>
//         <div class="modalCheckDiv"><input type="checkbox"><p>Tomato</p></div>
//         </div>
//         <hr>

//         <h4>Fruits</h4>
//         <div class="modalCheckContainer">
//         <div class="modalCheckDiv"><input type="checkbox"><p>PineApple</p></div>
//         <div class="modalCheckDiv"><input type="checkbox"><p>Banana</p></div>
//         <div class="modalCheckDiv"><input type="checkbox"><p>Lemmon</p></div>
//         <div class="modalCheckDiv"><input type="checkbox"><p>Strawberry</p></div>
//         <div class="modalCheckDiv"><input type="checkbox"><p>Apple</p></div>
//         <div class="modalCheckDiv"><input type="checkbox"><p>Orange</p></div>
//         <div class="modalCheckDiv"><input type="checkbox"><p>Pear</p></div>
//         <div class="modalCheckDiv"><input type="checkbox"><p>Melon</p></div>
//         <div class="modalCheckDiv"><input type="checkbox"><p>Grapefruit</p></div>
//         <div class="modalCheckDiv"><input type="checkbox"><p>Grape</p></div>
//         <div class="modalCheckDiv"><input type="checkbox"><p>Watermelon</p></div>
//         </div>
//         <hr>
//         `,
//     });
// };

// const openModalChecklist = document.getElementById("imgCheck");
// openModalChecklist.addEventListener("click", getChecklist);

const checkboxes = document.querySelectorAll('input[type="checkbox"]');
checkboxes.forEach((checkbox) => {
    checkbox.addEventListener('change', () => {
        const usuario = localStorage.getItem("usuario");
        const checkboxId = checkbox.id;
        const isChecked = checkbox.checked;
        const usuarioData = JSON.parse(localStorage.getItem(usuario)) || {};

        // Actualizar valor en el objeto usuarioData
        usuarioData[checkboxId] = isChecked;

        // Guardar el objeto usuarioData en el Local Storage
        localStorage.setItem(usuario, JSON.stringify(usuarioData));
    });
});


const restoreUserChecklist = () => {
    const user =  localStorage.getItem("usuario")
    const storedChecklist = localStorage.getItem(user);
    
    if (storedChecklist) {
        const checklist = JSON.parse(storedChecklist);

        for (const id in checklist) {
        const checkbox = document.getElementById(id);

            if (checkbox) {
                checkbox.checked = checklist[id];
            }
        }
    }  
}

document.addEventListener('DOMContentLoaded', restoreUserChecklist);
// document.getElementById("btn_add").addEventListener('DOMContentLoaded', addCheck);






// LIBRERIA SCROLL REVEAL
ScrollReveal('.smooth', { easing: 'ease-in' });
ScrollReveal({ distance: '60px' });
ScrollReveal().reveal('section', { duration: 1500, origin: 'bottom'});
ScrollReveal().reveal('hr', { duration: 1500, origin: 'bottom'});