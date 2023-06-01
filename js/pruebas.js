
// // dark mode

// const darkMode = () => {
//     document.classList.replace("section", "section_dark_mode");
// }

// document.getElementById("dark_mode").addEventListener("click", darkMode)



function sweetAlert(text, icon) {
    Swal.fire({
        title: `Confirmar?` , 
        text: text,
        icon: icon,
        confirmButtonText: 'Cool'
        });
};


sweetAlert("esto es un texto", "warning")




