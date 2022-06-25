// AGREGAR CATEGORIAS A LOS PRODUCTOS

const products = ["KEYBOARD", "HEADSET", "MOUSE", "NOTEBOOK"];
const category = document.getElementById("js-category");

let addItemCategory = document.createDocumentFragment();
for (const category of products) {
    let addCategory = document.createElement("LI");
    addCategory.textContent = category;
    addItemCategory.append(addCategory);

}

category.append(addItemCategory);

// ACTUALIZACION DE LA PAGINA DE PRODUCTOS EN BASE AL CLICK

// AGREGADO DE PRODUCTOS

let containerProducts = document.querySelector(".products-container__buy-products");


const Products = [
    {category: "Keyboard", brand: "Razer", name: "Huntsman V2 Analog US", price: 200, imgPath: "../images/products/Keyboard_Razer%20Huntsman%20V2%20Analog%20US.webp"},
    {category: "Keyboard", brand: "Razer", name: "Huntsman V2 Tenkeyless Linear Optical Switch", price: 250, imgPath: "../images/products/Keyboard_Razer%20Huntsman%20V2%20Tenkeyless%20Linear%20Optical%20Switch.webp"},
    {category: "Keyboard", brand: "Razer", name: "Huntsman Mini Linear Optical Switch", price: 170, imgPath: "../images/products/Keyboard_Razer%20Huntsman%20Mini%20Linear%20Optical%20Switch.webp"},
    {category: "Keyboard", brand: "Razer", name: "Pro Type Ultra US", price: 200, imgPath: "../images/products/Keyboard_Razer%20Pro%20Type%20Ultra%20US.webp"},
]


let addDivContainerProducts = document.createDocumentFragment();
for (const item of Products) {
    //CREACION DE DIVS
    let addDiv = document.createElement("div");
    let addImgDiv = document.createElement("div");
    let imgProducts = document.createElement("img")
    let addPriceDivContainer = document.createElement("div");
    let addPrice = document.createElement("div");
    let addShoppingCart = document.createElement("div");
    let imgShoppingCart = document.createElement("img");
    let addName = document.createElement("div");
    //ADD CLASS
    addDiv.classList.add("product-box");
    addImgDiv.classList.add("img-product-container");
    addPriceDivContainer.classList.add("price-product-container");
    addPrice.classList.add("price-product");
    addShoppingCart.classList.add("shopping-img")
    addName.classList.add("name-product")

    //ASIGNAR SU PADRE
    addDiv.append(addImgDiv);
    addImgDiv.append(imgProducts);
    addDiv.append(addPriceDivContainer);
    addPriceDivContainer.append(addPrice, addShoppingCart);
    addShoppingCart.append(imgShoppingCart);
    addDiv.append(addName);
    addDivContainerProducts.append(addDiv);


//    ASIGNAR VALORES AL DOM

    addPrice.textContent = `${item.price} USD`;
    addName.textContent = item.name;
    imgProducts.setAttribute('src', item.imgPath)
    imgShoppingCart.setAttribute('src', "../images/header-images/shopping-cart.png")


    // videoCarousel.setAttribute('src',videoPaths[position]);


}

// IMPRIMIR AL HTML
containerProducts.append(addDivContainerProducts);












