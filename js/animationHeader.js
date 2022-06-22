/* Animacion menu Hamburguesa */

let nav = document.querySelector(".nav");
let animation = document.querySelector(".img-hambur");

animation.addEventListener("click", () => {
    nav.classList.toggle("nav-active");
})


/* /* Animacion dropdown */

let mainDropDown = document.querySelector(".main-dropdown");
let dropdown = document.querySelector(".dropdown");
let dropdownImg = document.querySelector(".search-icon1");

mainDropDown.addEventListener("click", () => {
    dropdown.classList.toggle("active-dropdown");
    dropdownImg.classList.toggle("active-search-icon");
})

