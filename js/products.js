document.addEventListener("DOMContentLoaded", () => {

    Swal.fire(
        'Good job!',
        'You clicked the button!',
        'success'
    )

    const cartItems = [];
    console.log(cartItems)
    // AGREGAR CATEGORIAS A LOS PRODUCTOS

    const products = ["KEYBOARD", "HEADSET", "MOUSE", "NOTEBOOK"];

    const addCategory = () => {
        const category = document.getElementById("js-category");


        let addItemCategory = document.createDocumentFragment();
        for (const category of products) {
            let addCategory = document.createElement("LI");
            addCategory.textContent = category;
            addItemCategory.append(addCategory);
        }
        category.append(addItemCategory);
    }

// AGREGADO DE PRODUCTOS

    const listProducts = [
        {
            id: 0,
            category: "Keyboard",
            brand: "Razer",
            name: "Huntsman V2 Analog US",
            price: 200,
            imgPath: "../images/products/Keyboard_Razer%20Huntsman%20V2%20Analog%20US.webp"
        },
        {
            id: 1,
            category: "Keyboard",
            brand: "Razer",
            name: "Huntsman V2 Tenkeyless Linear Optical Switch",
            price: 250,
            imgPath: "../images/products/Keyboard_Razer%20Huntsman%20V2%20Tenkeyless%20Linear%20Optical%20Switch.webp"
        },
        {
            id: 2,
            category: "Keyboard",
            brand: "Razer",
            name: "Huntsman Mini Linear Optical Switch",
            price: 170,
            imgPath: "../images/products/Keyboard_Razer%20Huntsman%20Mini%20Linear%20Optical%20Switch.webp"
        },
        {
            id: 3,
            category: "Keyboard",
            brand: "Razer",
            name: "Pro Type Ultra US",
            price: 200,
            imgPath: "../images/products/Keyboard_Razer%20Pro%20Type%20Ultra%20US.webp"
        }
    ]


// CREADOR DEL DOM PRODUCTOS

    let containerProducts = document.querySelector(".products-container__buy-products");
    let addDivContainerProducts = document.createDocumentFragment();
    for (const item of listProducts) {

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
        imgProducts.classList.add("src-img")
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
        //ASIGNAR VALORES AL DOM

        addPrice.textContent = `${item.price} USD`;
        addName.textContent = item.name;
        imgShoppingCart.setAttribute("id", item.id);
        imgProducts.setAttribute('src', item.imgPath);
        imgShoppingCart.setAttribute('src', "../images/header-images/shopping-cart.png");


        //ADD EVENT LISTENER PARA TARGETEAR LA INFO
        imgShoppingCart.addEventListener("click", (e) => {
            getProductInfo(listProducts[e.target.id])
        })
        //IMPRIMIR AL HTML
        containerProducts.append(addDivContainerProducts);
    }

    const getProductInfo = (product) => {
        let productInfo = {
            id: product.id,
            pathImg: product.imgPath,
            price: product.price,
            name: product.name,
            qty: 1,
        }


        let exist = false;
        cartItems.forEach(item => {
            if (item.id === productInfo.id) {
                item.qty++;
                exist = true;
            }
        })


        exist === false && cartItems.push(productInfo)

        loadDom(cartItems);
        localStorage.setItem("carrito", JSON.stringify(cartItems));


    }


    //CREAR CONTENIDO EN EL DOM

    const loadDom = (cartItems) => {

        //CALCULO DEL TOTAL A PAGAR
        let resultado = 0
        cartItems.forEach(item => {
            resultado += item.price * item.qty
        })

        //DECLARACION DEL PADRE GENERAL
        let hiddenContainer = document.querySelector(".hidden")
        //RESETEO DEL DIV
        hiddenContainer.innerHTML = "";

        // CREACION ESTATICA DEL CARRITO

        //CREACION DE DIV

        let divHiddenTitle = document.createElement("div");
        let imgHidden = document.createElement("img");
        let h2Hidden = document.createElement("h2");
        let divResult = document.createElement("div");
        let totalResult = document.createElement("h2")

        //ASIGNACION DE CLASE
        divHiddenTitle.classList.add("hidden__title");
        imgHidden.classList.add("arrow-close");

        hiddenContainer.append(divHiddenTitle);
        divHiddenTitle.append(imgHidden, h2Hidden);

        //ASIGNACION DE VALOR

        h2Hidden.textContent = "Shopping Cart";
        imgHidden.setAttribute('src', "../images/home-main-images/go-left.png");
        totalResult.textContent = `${resultado} USD`

        cartItems.forEach(product => {
            console.log(product)

            // CREACION DE DOM

            let divProduct = document.createElement("div");
            let divImage = document.createElement("div");
            let divNameProduct = document.createElement("div");
            let divPriceProduct = document.createElement("div");
            let divDeleteProduct = document.createElement("div")
            let imageProduct = document.createElement("img");
            let nameProduct = document.createElement("h2");
            let priceProduct = document.createElement("h2");
            let divCountProduct = document.createElement("div");
            let countProduct = document.createElement("input");
            let spanLeft = document.createElement("span");
            let spanRight = document.createElement("span");
            let deleteProduct = document.createElement("img");

            //AGRAGAR CLASES

            divProduct.classList.add("hidden__shop-product");
            divNameProduct.classList.add("name-product");
            divImage.classList.add("img-product");
            divPriceProduct.classList.add("price-product-cart");
            divCountProduct.classList.add("count-product");
            divDeleteProduct.classList.add("delete-product");
            spanRight.classList.add("add-quantity");
            spanLeft.classList.add("subtract-quantity");
            divResult.classList.add("hidden__shop-result");

            //AGREGAR PADRES

            hiddenContainer.append(divProduct);
            divProduct.append(divImage);
            divProduct.append(divNameProduct);
            divProduct.append(divPriceProduct);
            divProduct.append(nameProduct);
            divProduct.append(divCountProduct);
            divProduct.append(divDeleteProduct);
            divImage.append(imageProduct);
            divNameProduct.append(nameProduct);
            divPriceProduct.append(priceProduct);
            divCountProduct.append(spanLeft);
            divCountProduct.append(countProduct);
            divCountProduct.append(spanRight);
            divDeleteProduct.append(deleteProduct);
            hiddenContainer.append(divResult);
            divResult.append(totalResult);

            //    ASIGNAR VALORES AL DOM

            imageProduct.setAttribute('src', product.pathImg)
            nameProduct.textContent = product.name;
            priceProduct.textContent = `${product.price * product.qty} USD`;
            spanLeft.textContent = "-";
            spanRight.textContent = "+";
            countProduct.setAttribute('value', product.qty);
            countProduct.setAttribute('id', "idInputShop")
            deleteProduct.setAttribute('src', "../images/shopping-cart/delete.png");

        })
    }

    const showCart = () => {
        let hiddenContainer = document.querySelector(".hidden-shopping-cart");
        let showContainer = document.getElementById("js-active");
        let hideContainer = document.querySelector(".arrow-close");


        showContainer.addEventListener("click", () => {
            hiddenContainer.classList.remove("active-hidden");
            hiddenContainer.classList.add("desactive-hidden")

        })

        hideContainer.addEventListener("click", () => {
            hiddenContainer.classList.remove("desactive-hidden")
            hiddenContainer.classList.add("active-hidden")

        })

        window.addEventListener("keydown", (element) => {
            if (element.key === 'Escape') {
                hiddenContainer.classList.remove("desactive-hidden")
                hiddenContainer.classList.add("active-hidden")
            }
        })
    }

    const loadLocalStorageData = () => {
        let carritoGuardado = JSON.parse(localStorage.getItem("carrito"));

        carritoGuardado != null && carritoGuardado.forEach(item => {
            cartItems.push(item)
        })
        loadDom(cartItems);
    }

    loadLocalStorageData();

    // ACTIVACION DE FUNCIONES

    addCategory();
    showCart()
});

