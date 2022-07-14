document.addEventListener("DOMContentLoaded", () => {
    let shopCartSelected = [];

    const pedirDatos = async () => {
        const respuesta = await fetch("../json/products.json");
        let data = await respuesta.json();


        // LOAD DOM CATEGORY
        let containerCategory = document.querySelector(".products-container__list-products");
        let blockShop = document.createElement("div");
        let body = document.querySelector("body");
        body.append(blockShop)
        console.log(body)

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
            filterPriceTitle.textContent = "ORDER BY:"
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
                imgShoppingCart.setAttribute("src", "../images/header-images/shopping-cart.png");
                imgShoppingCart.setAttribute("id", value.id);
                nameProduct.textContent = value.name;

                // FUNCION CLICK PARA AGREGAR PRODUCTOS AL CARRITO CUANDO HACES CLICK A LA BOLSA
                imgShoppingCart.addEventListener("click", (e) => {
                    let userLogIn = JSON.parse(localStorage.getItem("userLoggedIn"));

                    if (userLogIn == null) {
                        Swal.fire({
                            icon: "error",
                            position: "bottom-start",
                            title: "You must log in to buy !",
                            timer: 1000,
                            background: "hsl(193, 80%, 58%)",
                            width: "17rem",
                            customClass: "swal-height",
                            toast: true,
                            showConfirmButton: false,
                            iconColor: '#fff',
                            color: '#fff',

                        });
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
            const hiddenTitleDiv = document.createElement("div"),
                hiddenTitleImg = document.createElement("img"),
                hiddenTitleh2 = document.createElement("h2"),
                hiddenTotalDiv = document.createElement("div"),
                hiddenTotalNumberDiv = document.createElement("div"),
                hiddenTotalNumberh2 = document.createElement("h2"),
                hiddenTotalNumberh2a = document.createElement("h2"),
                hiddenContinueDiv = document.createElement("div"),
                hiddenDeleteDiv = document.createElement("div"),
                hiddenContinueButton = document.createElement("button"),
                emptyProductImg = document.createElement("img"),
                emptyProducth2 = document.createElement("h2");
            //AGREGAR CLASES
            hiddenTitleDiv.classList.add("hidden-title");
            hiddenTitleImg.classList.add("arrow-close");
            hiddenTotalDiv.classList.add("hidden-total");
            hiddenContinueDiv.classList.add("hidden-continue");
            hiddenTotalNumberDiv.classList.add("hidden-total-number");
            hiddenDeleteDiv.classList.add("hidden-delete");
            hiddenContinueButton.classList.add("button-class-style")
            //AGREGAR PADRES
            titleHiddenContainer.append(hiddenTitleDiv);
            totalHiddenContainer.append(hiddenTotalDiv);
            hiddenTitleDiv.append(hiddenTitleImg, hiddenTitleh2);
            hiddenTotalDiv.append(hiddenTotalNumberDiv, hiddenContinueDiv, hiddenDeleteDiv);
            hiddenDeleteDiv.append(emptyProductImg, emptyProducth2);
            hiddenTotalNumberDiv.append(hiddenTotalNumberh2, hiddenTotalNumberh2a);
            hiddenContinueDiv.append(hiddenContinueButton)
            //AGREGAR VALORES
            hiddenTitleImg.setAttribute("src", "../images/home-main-images/go-right.png");
            hiddenTitleh2.textContent = "SHOPPING CART";
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
                const containerAddedProduct = document.createElement("div"),
                    imgDivProduct = document.createElement("div"),
                    imgProduct = document.createElement("img"),
                    nameDivProduct = document.createElement("div"),
                    priceDivProduct = document.createElement("div"),
                    priceTotal = document.createElement("div"),
                    priceDivProductPerUnit = document.createElement("div"),
                    countDiv = document.createElement("div"),
                    input = document.createElement("input"),
                    spanLeft = document.createElement("span"),
                    spanRight = document.createElement("span"),
                    deleteProductDiv = document.createElement("div"),
                    deleteProductImg = document.createElement("img");


                    // AGREGAR CLASES
                containerAddedProduct.classList.add("hidden__shop-product");
                nameDivProduct.classList.add("name-product");
                imgDivProduct.classList.add("img-product");
                priceDivProduct.classList.add("price-product-cart");
                countDiv.classList.add("count-product");
                deleteProductDiv.classList.add("delete-product");
                spanLeft.classList.add("span-left");
                spanRight.classList.add("span-right");
                hiddenContinueDiv.classList.add("hidden-continue-active");
                hiddenContinueDiv.classList.remove("hidden-continue");
                // AGREGAR PADRES
                container.append(containerAddedProduct);
                containerAddedProduct.append(imgDivProduct);
                imgDivProduct.append(imgProduct);
                containerAddedProduct.append(nameDivProduct, countDiv, priceDivProduct, deleteProductDiv);
                priceDivProduct.append(priceTotal, priceDivProductPerUnit)
                countDiv.append(spanLeft, input, spanRight);
                deleteProductDiv.append(deleteProductImg);
                // AGREGAR VALORES
                imgProduct.setAttribute("src", item.imgPath);
                nameDivProduct.textContent = item.name;
                priceDivProductPerUnit.textContent = `${item.price} USD`
                priceTotal.textContent = `${item.price * item.qty} USD`;
                spanLeft.textContent = "-";
                spanRight.textContent = "+";
                input.setAttribute("value", item.qty);
                deleteProductImg.setAttribute("src", "../images/shopping-cart/delete.png"
                );
                hiddenTotalNumberh2.textContent = "Subtotal :"
                hiddenTotalNumberh2a.textContent = `${totalToPay} USD`;
                emptyProductImg.setAttribute('src', '../images/shopping-cart/empty.png')
                emptyProducth2.textContent = "Empty Cart";
                spanLeft.setAttribute("id", `${contador}`);
                spanRight.setAttribute("id", `${contador}`);
                deleteProductImg.setAttribute("id", `${contador}`);
                hiddenContinueButton.textContent = "Continue";


                // LLAMADO A FUNCION
                dynamicChanges(spanLeft, spanRight, item, input, deleteProductImg);

            });

            resumenBuy(hiddenContinueButton, container, hiddenDeleteDiv, hiddenContinueDiv, hiddenTotalNumberh2, hiddenTotalNumberh2a);
        };
        //    RESUMEN DE LA COMPRA QUE QUIERE HACER EL CLIENTE
        function resumenBuy(hiddenContinueButton, container, emptyCart, divTotal, total, price) {

            hiddenContinueButton.addEventListener("click", () => {
                container.innerHTML = "";
                emptyCart.remove();

                let goBack = document.createElement("button");
                let titleResumeBuy = document.createElement("div");
                let detailsDiv = document.createElement("div");
                let shippingDetailDiv = document.createElement("form");
                let shippingDetailTitle = document.createElement("div");
                let containerInput = document.createElement("div");
                let inputCP = document.createElement("input");
                let labelCP = document.createElement("label");
                let buttonCheck = document.createElement("button");
                let buttonCheckDiv = document.createElement("div");
                let costShipment = document.createElement("div");
                let freeDetail = document.createElement("div");
                let divFreeOne = document.createElement("div");
                let divFreeTwo = document.createElement("div");
                let divFreeThree = document.createElement("div");

                divTotal.children[1] && divTotal.removeChild(divTotal.lastChild);

                divTotal.append(goBack);
                container.append(titleResumeBuy, detailsDiv, shippingDetailDiv, freeDetail);
                freeDetail.append(divFreeOne, divFreeTwo, divFreeThree);
                shippingDetailDiv.append(shippingDetailTitle, containerInput);
                containerInput.append(inputCP, labelCP, buttonCheckDiv, costShipment);
                buttonCheckDiv.append(buttonCheck)

                detailsDiv.classList.add("hidden__box-container-details");
                containerInput.classList.add("container-inputs");
                shippingDetailTitle.classList.add("title-ship");
                costShipment.classList.add("cost-shipment");
                goBack.classList.add("button-class-style");
                buttonCheckDiv.classList.add("button-check-div");
                container.classList.add("remove-scroll");
                freeDetail.classList.add("free-retire");
                divFreeOne.classList.add("free-retire__title");
                divFreeTwo.classList.add("free-retire__location");
                divFreeThree.classList.add("free-retire__free");

                goBack.textContent = "Back";
                titleResumeBuy.textContent = "Resume";
                shippingDetailTitle.textContent = "Shipping methods";
                labelCP.setAttribute("id", "inputCP");
                inputCP.setAttribute("id", "inputCP");
                labelCP.textContent = "Enter your zip";
                buttonCheck.textContent = "Calculate";
                total.textContent = "Total : ";
                divFreeOne.textContent = "Our place";
                divFreeTwo.textContent = "Game On Calle Culo Duro 5332";
                divFreeThree.textContent = "FREE";

                goBack.addEventListener("click", () => {
                    container.classList.remove("remove-scroll");
                    loadDomProducts(shopCartSelected)

                })

                // COSTO DE ENVIO

                //CALCULAR EL TOTAL CON ENVIO

                let dataLocal = JSON.parse(localStorage.getItem("cart"));
                let totalToPay = 0;
                dataLocal.forEach(item => {
                    totalToPay += item.price * item.qty
                    console.log(totalToPay)
                    let boxProductDetail = document.createElement("div");
                    let nameProduct = document.createElement("div");
                    let imgProductDiv = document.createElement("div");
                    let imgProduct = document.createElement("img");
                    let qtyProduct = document.createElement("div");
                    let TotalPerProduct = document.createElement("div");


                    detailsDiv.append(boxProductDetail);
                    boxProductDetail.append(imgProductDiv, nameProduct, qtyProduct, TotalPerProduct);
                    imgProductDiv.append(imgProduct)

                    boxProductDetail.classList.add("products-details-container");
                    nameProduct.classList.add("name-product-detail");
                    qtyProduct.classList.add("qty-product-detail");
                    TotalPerProduct.classList.add("total-product-detail");
                    imgProductDiv.classList.add("img-product-detail");

                    imgProduct.setAttribute('src', item.imgPath);
                    nameProduct.textContent = item.name;
                    qtyProduct.textContent = item.qty;
                    TotalPerProduct.textContent = `$ ${item.qty * item.price}`;
                })

                buttonCheck.addEventListener("click", (e) => {
                    e.preventDefault();
                    let costShipmentCP = 0;

                    if(inputCP.value < 10000) {
                        costShipmentCP = 100
                    } else if(inputCP.value > 10000) {
                        costShipmentCP = 50
                    } else {
                        costShipmentCP = 75
                    }

                    if (inputCP.value != "") {
                        price.textContent = `$ ${totalToPay + costShipmentCP}`
                    }

                    costShipment.textContent = `$ ${costShipmentCP}`


                })
            })
        }

        // FUNCION QUE AUMENTA UN CONTADOR DE NUMEROS
        function addNumberShop(shopCartSelected) {
            let container = document.getElementById("js-shopping-cart");
            let circleNumberP = document.createElement("p");

            (container.children[1]) && container.removeChild(container.lastChild);

            container.append(circleNumberP);

            circleNumberP.textContent = shopCartSelected.length;

            shopCartSelected.length === 0 && circleNumberP.remove()
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
                        customClass: "swal-height",
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
            let filterPriceHigh = document.getElementById("js-filter-price-input2");
            filterPrice.addEventListener("click", () => {
                if (filterPriceHigh.checked) {
                    filterPriceHigh.checked = false;
                }
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
            let filterPriceLower = document.getElementById("js-filter-price-input");
            filterPrice.addEventListener("click", () => {
                if (filterPriceLower.checked) {
                    filterPriceLower.checked = false;
                }
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
        addNumberShop(shopCartSelected)
    }

    pedirDatos()
});


