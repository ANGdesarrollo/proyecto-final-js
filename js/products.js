document.addEventListener("DOMContentLoaded", () => {
    let shopCartSelected = [];
    let productCategorySelected = [];

    const pedirDatos = async () => {
        const respuesta = await fetch("../json/products.json");
        let data = await respuesta.json();


        // LOAD DOM CATEGORY
        let containerCategory = document.querySelector(".products-container__list-products");
        let blockShop = document.querySelector(".block-shop");

        function addCategoryDom() {
            //CREACION DE CONTENIDO
            let ulCategoryDiv = document.createElement("div");
            let ulCategory = document.createElement("ul");
            let filterPrice = document.createElement("form");
            let filterPriceOne = document.createElement("div");
            let filterPriceTwo = document.createElement("div");
            let filterPriceInput = document.createElement("input");
            let filterPriceInput2 = document.createElement("input");
            let filterPriceLabel = document.createElement("label");
            let filterPriceLabel2 = document.createElement("label");
            let filterPriceTitle = document.createElement("h2");
            //ASIGNACION DE PADRE
            containerCategory.append(ulCategoryDiv);
            containerCategory.append(filterPrice);
            ulCategoryDiv.append(ulCategory);
            filterPrice.append(filterPriceTitle, filterPriceOne, filterPriceTwo);
            filterPriceOne.append(filterPriceInput, filterPriceLabel);
            filterPriceTwo.append(filterPriceInput2, filterPriceLabel2);
            filterPriceInput.setAttribute("type", "checkbox");
            filterPriceInput2.setAttribute("type", "checkbox");
            filterPriceTitle.textContent = "Order by:"
            filterPriceLabel.textContent = "Lower price";
            filterPriceLabel2.textContent = "Higher price";
            filterPriceInput.setAttribute("id", "js-filter-price-input");
            filterPriceInput2.setAttribute("id", "js-filter-price-input2");
            filterPriceLabel.setAttribute("id", "js-filter-price-input");
            filterPriceLabel2.setAttribute("id", "js-filter-price-input2");

            //FOR EACH PARA CREAR CADA ITEM
            let categoryFragment = document.createDocumentFragment();
            data.forEach((category) => {
                let liCategory = document.createElement("li");
                liCategory.setAttribute("id", category.id);
                liCategory.classList.add("category-li");
                liCategory.textContent = category.name;
                categoryFragment.append(liCategory);
            });
            ulCategory.append(categoryFragment);

        }

        // FUNCION PARA AGREGAR PRODUCTOS AL HACER CLICK EN ALGUNA CATEGORIA
        function addProductsDom() {
            let lowerPrice = document.getElementById("js-filter-price-input");
            let higherPrice = document.getElementById("js-filter-price-input2");
            let liCategory = document.querySelectorAll(".category-li");
            let videoChange = document.getElementById("js-video-change");

            liCategory.forEach((category) => {
                category.addEventListener("click", (e) => {

                    if (e.target.id == 0) {
                        lowerPrice.checked = false;
                        higherPrice.checked = false;
                        targetCategory(data[0].KEYBOARD)
                        localStorage.removeItem("productSelected");
                        localStorage.setItem("productSelected", JSON.stringify(data[0].KEYBOARD));
                        videoChange.setAttribute("src", "../images/products/background_products_headset.mp4");


                    } else if (e.target.id == 1) {
                        lowerPrice.checked = false;
                        higherPrice.checked = false;
                        targetCategory(data[1].HEADSET);
                        localStorage.removeItem("productSelected");
                        localStorage.setItem("productSelected", JSON.stringify(data[1].HEADSET));
                        videoChange.setAttribute(
                            "src",
                            "../images/products/background_products_headset.mp4"
                        );
                    } else if (e.target.id == 2) {
                        lowerPrice.checked = false;
                        higherPrice.checked = false;
                        targetCategory(data[2].MOUSE);
                        localStorage.removeItem("productSelected");
                        localStorage.setItem("productSelected", JSON.stringify(data[2].MOUSE));
                        videoChange.setAttribute(
                            "src",
                            "../images/products/background_products_mouse.mp4"
                        );
                    } else if (e.target.id == 3) {
                        lowerPrice.checked = false;
                        higherPrice.checked = false;
                        targetCategory(data[3].NOTEBOOK);
                        localStorage.removeItem("productSelected");
                        localStorage.setItem("productSelected", JSON.stringify(data[3].NOTEBOOK));
                        videoChange.setAttribute(
                            "src",
                            "../images/products/background_products_notebook.mp4"
                        );
                    }

                });

            });
        }

        // CONVERVAR LOS PRODUCTOS SELECCIONADOS POR EL USUARIO EN PANTALLA

        JSON.parse(localStorage.getItem("productSelected")) != null && targetCategory(JSON.parse(localStorage.getItem("productSelected")));

        function targetCategory(eTarget) {

            let containerProducts = document.querySelector(".products-container__buy-products");
            let cardFragment = document.createDocumentFragment();
            eTarget.forEach((value) => {
                containerProducts.innerHTML = "";
                // CREACION DE CONTENIDO
                let containerBoxProduct = document.createElement("div");
                let divImgProduct = document.createElement("div");
                let imgProduct = document.createElement("img");
                let divShopPrice = document.createElement("div");
                let price = document.createElement("div");
                let divShoppingCart = document.createElement("div");
                let imgShoppingCart = document.createElement("img");
                let nameProductDiv = document.createElement("div");
                let nameCategory = document.createElement("h2");
                let nameProduct = document.createElement("h4");

                //   AGREGADO DE CLASES
                containerBoxProduct.classList.add("product-box");
                divImgProduct.classList.add("img-product-container");
                divShopPrice.classList.add("price-product-container");
                price.classList.add("price-product");
                divShoppingCart.classList.add("shopping-img");
                nameProductDiv.classList.add("name-product");
                imgShoppingCart.classList.add("img-shopping-cart");
                imgShoppingCart.classList.add(value.category);
                // AGREGADO DE PADRES
                cardFragment.append(containerBoxProduct);
                containerBoxProduct.append(divImgProduct);
                divImgProduct.append(imgProduct);
                containerBoxProduct.append(nameProductDiv);
                nameProductDiv.append(nameCategory);
                nameProductDiv.append(nameProduct);
                containerBoxProduct.append(divShopPrice);
                divShopPrice.append(price);
                divShopPrice.append(divShoppingCart);
                divShoppingCart.append(imgShoppingCart);
                // AGREGADO DE VALORES
                nameCategory.textContent = value.category;
                imgProduct.setAttribute("src", value.imgPath);
                price.textContent = `$ ${value.price} `;
                imgShoppingCart.setAttribute("src", "../images/header-images/shopping-cart.png"
                );
                imgShoppingCart.setAttribute("id", value.id);
                nameProduct.textContent = value.name;


                // ORDENAR DE MENOR A MAYOR LOS ITEMS EN CASO QUE EL USUARIO CLIKEE EL BOTON DE ORDER BY


                // FUNCION CLICK PARA AGREGAR PRODUCTOS AL CARRITO CUANDO HACES CLICK A LA BOLSA
                imgShoppingCart.addEventListener("click", (e) => {
                    let userLogIn = JSON.parse(localStorage.getItem("userLoggedIn"));

                    if (userLogIn == null) {
                        alert("debe registrarse para poder comprar")
                    } else {
                        selectProduct(e.target.id, e.target.className);
                        addNumberShop(shopCartSelected);
                        let timerInterval;

                        Swal.fire({
                            icon: "success",
                            position: "bottom-start",
                            title: "Product added!",
                            timer: 1000,
                            background: "hsl(193, 80%, 58%)",
                            width: "17rem",
                            customClass: "swal-height",
                            toast: true,
                            showConfirmButton: false,
                            iconColor: '#fff',
                            color: '#fff',

                        });
                    }
                });
            });
            containerProducts.append(cardFragment);
        }


        function selectProduct(id, category) {
            if (category == "img-shopping-cart Headset") {
                getProductInfo(data[1].HEADSET[id]);
            } else if (category == "img-shopping-cart Keyboard") {
                getProductInfo(data[0].KEYBOARD[id]);
            } else if (category == "img-shopping-cart Mouse") {
                getProductInfo(data[2].MOUSE[id]);
            } else if (category == "img-shopping-cart Notebook") {
                getProductInfo(data[3].NOTEBOOK[id]);
            }
        }

        // TOMAR INFORMACION DEL PRODUCTO CLIKEADO
        function getProductInfo(selectedProduct) {
            let clickedProduct = {
                name: selectedProduct.name,
                price: selectedProduct.price,
                qty: 1,
                imgPath: selectedProduct.imgPath,
            };


            // PUSHEO AL ARRAY VACIO Y FILTRADO SI YA ESTA EN EL CARRITO ASI NO SE AGREGA DOS VECES

            let exist = false;
            shopCartSelected.forEach((item) => {
                if (item.name === clickedProduct.name) {
                    item.qty++;
                    exist = true;
                }
            });

            exist === false && shopCartSelected.push(clickedProduct);

            loadDomProducts(shopCartSelected);
            // CREACION DEL ESPACIO EN LOCAL STORAGE
            localStorage.setItem("cart", JSON.stringify(shopCartSelected));
        }

        //CREACION DE EL CONTENIDO DEL CARRITO

        const loadDomProducts = (shopCartSelected) => {
            let hiddenContainer = document.querySelector(".hidden-shopping-cart");
            let container = document.querySelector(".hidden");
            // PARTE ESTATICA
            let titleHiddenContainer = document.getElementById("js-hidden-title");
            let totalHiddenContainer = document.getElementById("js-hidden-total");
            // BORRAR DIVS PARA QUE NO SE REPITAN LOS PRODUCTOS
            container.innerHTML = "";
            titleHiddenContainer.innerHTML = "";
            totalHiddenContainer.innerHTML = "";
            // CREACION DE ESPACIOS
            let hiddenTitleDiv = document.createElement("div");
            let hiddenTitleImg = document.createElement("img");
            let hiddenTitleh2 = document.createElement("h2");
            let hiddenTotalDiv = document.createElement("div");
            let hiddenTotalNumberDiv = document.createElement("div");
            let hiddenTotalNumberh2 = document.createElement("h2");
            let hiddenTotalNumberh2a = document.createElement("h2");
            let hiddenContinueDiv = document.createElement("div");
            let hiddenDeleteDiv = document.createElement("div");
            let hiddenContinueButton = document.createElement("button");
            //AGREGAR CLASES
            hiddenTitleDiv.classList.add("hidden-title");
            hiddenTitleImg.classList.add("arrow-close");
            hiddenTotalDiv.classList.add("hidden-total");
            hiddenContinueDiv.classList.add("hidden-continue");
            hiddenTotalNumberDiv.classList.add("hidden-total-number");
            hiddenDeleteDiv.classList.add("hidden-delete");
            //AGREGAR PADRES
            titleHiddenContainer.append(hiddenTitleDiv);
            totalHiddenContainer.append(hiddenTotalDiv);
            hiddenTitleDiv.append(hiddenTitleImg, hiddenTitleh2);
            hiddenTotalDiv.append(hiddenTotalNumberDiv, hiddenContinueDiv, hiddenDeleteDiv);
            hiddenTotalNumberDiv.append(hiddenTotalNumberh2, hiddenTotalNumberh2a);
            hiddenContinueDiv.append(hiddenContinueButton)
            //AGREGAR VALORES
            hiddenTitleImg.setAttribute("src", "../images/home-main-images/go-right.png");
            hiddenTitleh2.textContent = "Shopping Cart";
            //LLAMADO A FUNCIONES
            closeCart(hiddenTitleImg, hiddenContainer);
            removeAllItemsCart(hiddenDeleteDiv, container, hiddenTotalDiv);

            //PARTE DINAMICA
            let totalToPay = 0;
            let contador = -1;
            // FOR EACH PARA CREAR EL CONTENIDO
            shopCartSelected.forEach((item) => {
                contador++;
                // CALCULADOR DEL TOTAL A COMPRAR
                totalToPay += item.qty * item.price;
                // CREADOR DE ESPACIOS
                let containerAddedProduct = document.createElement("div");
                let imgDivProduct = document.createElement("div");
                let imgProduct = document.createElement("img");
                let nameDivProduct = document.createElement("div");
                let priceDivProduct = document.createElement("div");
                let priceDivProductPerUnit = document.createElement("div");
                let countDiv = document.createElement("div");
                let input = document.createElement("input");
                let spanLeft = document.createElement("span");
                let spanRight = document.createElement("span");
                let deleteProductDiv = document.createElement("div");
                let deleteProductImg = document.createElement("img");
                // AGREGAR CLASES
                containerAddedProduct.classList.add("hidden__shop-product");
                nameDivProduct.classList.add("name-product");
                imgDivProduct.classList.add("img-product");
                priceDivProduct.classList.add("price-product-cart");
                priceDivProductPerUnit.classList.add("price-product-per-unit-cart");
                countDiv.classList.add("count-product");
                deleteProductDiv.classList.add("delete-product");
                spanLeft.classList.add("span-left");
                spanRight.classList.add("span-right");
                hiddenContinueDiv.classList.add("hidden-continue-active")
                hiddenContinueDiv.classList.remove("hidden-continue")
                // AGREGAR PADRES
                container.append(containerAddedProduct);
                containerAddedProduct.append(imgDivProduct);
                imgDivProduct.append(imgProduct);
                containerAddedProduct.append(nameDivProduct);
                containerAddedProduct.append(priceDivProductPerUnit);
                containerAddedProduct.append(priceDivProduct);
                containerAddedProduct.append(countDiv);
                countDiv.append(spanLeft, input, spanRight);
                containerAddedProduct.append(deleteProductDiv);
                deleteProductDiv.append(deleteProductImg);
                // AGREGAR VALORES
                imgProduct.setAttribute("src", item.imgPath);
                nameDivProduct.textContent = item.name;
                priceDivProductPerUnit.textContent = `${item.price} USD`
                priceDivProduct.textContent = `${item.price * item.qty} USD`;
                spanLeft.textContent = "-";
                spanRight.textContent = "+";
                input.setAttribute("value", item.qty);
                deleteProductImg.setAttribute("src", "../images/shopping-cart/delete.png"
                );
                hiddenTotalNumberh2.textContent = "Subtotal :"
                hiddenTotalNumberh2a.textContent = `${totalToPay} USD`;
                hiddenDeleteDiv.textContent = "Empty Cart";
                spanLeft.setAttribute("id", `${contador}`);
                spanRight.setAttribute("id", `${contador}`);
                deleteProductImg.setAttribute("id", `${contador}`);
                hiddenContinueButton.textContent = "Continue";


                // LLAMADO A FUNCION
                dynamicChanges(spanLeft, spanRight, item, input, deleteProductImg);

            });

            resumenBuy(hiddenContinueButton, container);
        };

        function resumenBuy(hiddenContinueButton, container) {
            hiddenContinueButton.addEventListener("click", () => {
                container.innerHTML = "";
            })

        }

        // FUNCION QUE AUMENTA UN CONTADOR DE NUMEROS
        function addNumberShop(shopCartSelected) {
            let container = document.getElementById("js-shopping-cart");
            let circleNumberP = document.createElement("p");

            container.append(circleNumberP);
            circleNumberP.textContent = "";
            circleNumberP.textContent = shopCartSelected.length;
        }

        // CAMBIOS DINAMICOS EN EL CARRITO

        function dynamicChanges(left, right, item, input, deleteItem) {
            // BORRADO DE UN ITEM INDIVIDUAL
            deleteItem.addEventListener("click", (e) => {
                let saveStorage = JSON.parse(localStorage.getItem("cart"));
                saveStorage = saveStorage.filter(
                    (item) => item != saveStorage[e.target.id]
                );
                shopCartSelected = [];
                saveStorage.forEach((item) => {
                    shopCartSelected.push(item);
                });
                localStorage.setItem("cart", JSON.stringify(shopCartSelected));
                loadDomProducts(shopCartSelected);
                addNumberShop(shopCartSelected)
            });

            //AGREGAR O RESTAR PRODUCTOS DESDE EL CARRITO
            left.addEventListener("click", (e) => {
                let saveStorage = JSON.parse(localStorage.getItem("cart"));
                if (item.qty === 0) {
                    item.qty++;
                    input.setAttribute("value", item.qty);
                }
                item.qty--;
                input.setAttribute("value", item.qty);
                saveStorage[e.target.id].qty = item.qty;
                shopCartSelected = [];

                saveStorage.forEach((item) => {
                    shopCartSelected.push(item);
                });
                localStorage.setItem("cart", JSON.stringify(shopCartSelected));
                loadDomProducts(shopCartSelected);
            });

            right.addEventListener("click", (e) => {
                let saveStorage = JSON.parse(localStorage.getItem("cart"));
                item.qty++;
                input.setAttribute("value", item.qty);
                saveStorage[e.target.id].qty = item.qty;
                shopCartSelected = [];

                saveStorage.forEach((item) => {
                    shopCartSelected.push(item);
                });
                localStorage.setItem("cart", JSON.stringify(shopCartSelected));
                loadDomProducts(shopCartSelected);
            });
        }

        // FUNCION PARA ELIMINAR TODOS LOS PRODUCTOS DEL CARRITO
        function removeAllItemsCart(item, item2, item3) {
            item.addEventListener("click", () => {
                const swalWithBootstrapButtons = Swal.mixin({
                    customClass: {
                        confirmButton: "btn btn-success",
                        cancelButton: "btn btn-danger",
                        position: "center",
                    },
                    buttonsStyling: false,
                });
                //SWAL ALERT
                swalWithBootstrapButtons
                    .fire({
                        title: "Are you sure?",
                        text: "You won't be able to revert this!",
                        color: '#fff',
                        showCancelButton: true,
                        confirmButtonText: "Yes, delete it!",
                        cancelButtonText: "No, cancel!",
                        reverseButtons: true,
                        background: '#3ec4ea',
                    })
                    .then((result) => {
                        if (result.isConfirmed) {
                            item2.innerHTML = "";
                            item.innerHTML = "";
                            localStorage.removeItem("cart");
                            item3.innerHTML = "";
                            shopCartSelected = [];
                            addNumberShop(shopCartSelected)
                        }
                    });
            });
        }

        //ORDENAR PRECIOS DE MENOR A MAYOR
        function orderLowerPrice() {
            let filterPrice = document.getElementById("js-filter-price-input")
            filterPrice.addEventListener("click", () => {
                if (filterPrice.checked) {
                    targetCategory(JSON.parse(localStorage.getItem("productSelected")).sort((a, b) => {
                        if (a.price == b.price) {
                            return 0;
                        } else if (a.price < b.price) {
                            return -1
                        } else {
                            return 1
                        }
                    }))
                }
            })
        }

        //ORDENAR PRECIOS DE MAYOR A MENOR
        function orderHigherPrice() {
            let filterPrice = document.getElementById("js-filter-price-input2");
            filterPrice.addEventListener("click", () => {
                if (filterPrice.checked) {
                    targetCategory(JSON.parse(localStorage.getItem("productSelected")).sort((a, b) => {
                        if (a.price == b.price) {
                            return 0;
                        } else if (a.price < b.price) {
                            return 1
                        } else {
                            return -1
                        }
                    }))
                }
            })
        }

        // LOCAL STORAGE
        function loadLocalStorageData() {
            let saveStorage = JSON.parse(localStorage.getItem("cart"));

            saveStorage != null &&
            saveStorage.forEach((item) => {
                shopCartSelected.push(item);
            });

            loadDomProducts(shopCartSelected);
        }

        loadLocalStorageData();

        // OPEN / CLOSE CART
        function closeCart(a, b) {
            // CLOSECART
            a.addEventListener("click", () => {
                b.classList.remove("desactive-hidden");
                b.classList.add("active-hidden");
                blockShop.classList.remove("block-shop-active");
            });

            window.addEventListener("keydown", (element) => {
                if (element.key === "Escape") {
                    b.classList.remove("desactive-hidden");
                    b.classList.add("active-hidden");
                    blockShop.classList.remove("block-shop-active");
                }
            });
        }

        function openCart() {
            let hiddenContainer = document.querySelector(".hidden-shopping-cart");
            let imgShopping = document.getElementById("js-active");
            //OPEN CART
            imgShopping.addEventListener("click", () => {
                hiddenContainer.classList.remove("active-hidden");
                hiddenContainer.classList.add("desactive-hidden");
                blockShop.classList.add("block-shop-active");
            });
        }


        // ACTIVAR FUNCIONES
        addCategoryDom();
        addProductsDom();
        openCart();
        orderLowerPrice()
        orderHigherPrice()
    }

    pedirDatos()
});


