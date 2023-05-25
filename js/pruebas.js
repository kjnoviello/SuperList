
// let title = document.getElementById("titulo");
// title.innerText = "LA LISTA DEL SUPER"


// light mode
let boton = document.getElementById("btn");
let body = document.getElementById("bodyColor")

function lightMode() {
    console.log("antes del clik");
    body.className = "bodyColor";
    console.log("despues del click");
};

boton.onclick = lightMode;

// dark mode
let botondark = document.getElementById("btn-dark");
let bodyDark = document.getElementById("bodyColor")
function darkMode() {
    console.log("antes del clik dark mode");
    bodyDark.className = "body";
    console.log("despues del click dark mode");
}

botondark.onclick = darkMode;


