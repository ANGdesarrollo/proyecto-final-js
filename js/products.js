document.addEventListener("DOMContentLoaded", () => {
    let shopCartSelected = [];

    const pedirDatos = async () => {
        const respuesta = await fetch("../json/products.json");
        const data = await respuesta.json();
        console.log(data)


        // LOAD DOM CATEGORY
        let containerCategory = document.querySelector(".products-container__list-products");

        function addCategoryDom() {
            //LLAMADO AL PADRE DEL HTML
            //CREACION DE CONTENIDO
            let ulCategoryDiv = document.createElement("div");
            let ulCategory = document.createElement("ul");
            //ASIGNACION DE PADRE
            containerCategory.append(ulCategoryDiv);
            ulCategoryDiv.append(ulCategory);

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

        // LOAD DOM PRODUCTS
        function addProductsDom() {
            let liCategory = document.querySelectorAll(".category-li");
            let videoChange = document.getElementById("js-video-change");

            liCategory.forEach((category) => {
                category.addEventListener("click", (e) => {
                    if (e.target.id == 0) {
                        targetCategory(data[0].KEYBOARD);
                        videoChange.setAttribute(
                            "src",
                            "../images/products/background_products_headset.mp4"
                        );
                    } else if (e.target.id == 1) {
                        targetCategory(data[1].HEADSET);
                        videoChange.setAttribute(
                            "src",
                            "../images/products/background_products_headset.mp4"
                        );
                    } else if (e.target.id == 2) {
                        targetCategory(data[2].MOUSE);
                        videoChange.setAttribute(
                            "src",
                            "../images/products/background_products_mouse.mp4"
                        );
                    } else if (e.target.id == 3) {
                        targetCategory(listProducts[3].NOTEBOOK);
                        videoChange.setAttribute(
                            "src",
                            "../images/products/background_products_notebook.mp4"
                        );
                    }
                });
            });

            function targetCategory(eTarget) {
                let containerProducts = document.querySelector(
                    ".products-container__buy-products"
                );
                let cardFragment = document.createDocumentFragment();
                eTarget.forEach((value) => {
                    containerProducts.innerHTML = "";
                    // CREATING CONTENT

                    let containerBoxProduct = document.createElement("div");
                    let divImgProduct = document.createElement("div");
                    let imgProduct = document.createElement("img");
                    let divShopPrice = document.createElement("div");
                    let price = document.createElement("div");
                    let divShoppingCart = document.createElement("div");
                    let imgShoppingCart = document.createElement("img");
                    let nameProduct = document.createElement("div");
                    let nameCategory = document.createElement("h4");
                    //   ADDING CLASS
                    containerBoxProduct.classList.add("product-box");
                    divImgProduct.classList.add("img-product-container");
                    divShopPrice.classList.add("price-product-container");
                    price.classList.add("price-product");
                    divShoppingCart.classList.add("shopping-img");
                    nameProduct.classList.add("name-product");
                    imgShoppingCart.classList.add("img-shopping-cart");
                    imgShoppingCart.classList.add(value.category);

                    //    ADDING FATHER
                    cardFragment.append(containerBoxProduct);
                    containerBoxProduct.append(divImgProduct);
                    divImgProduct.append(imgProduct);
                    containerBoxProduct.append(nameCategory);
                    containerBoxProduct.append(nameProduct);
                    containerBoxProduct.append(divShopPrice);
                    divShopPrice.append(price);
                    divShopPrice.append(divShoppingCart);
                    divShoppingCart.append(imgShoppingCart);

                    //    ADDING VALUES TO DOM
                    nameCategory.textContent = value.category;
                    imgProduct.setAttribute("src", value.imgPath);
                    price.textContent = `$${value.price} `;
                    imgShoppingCart.setAttribute(
                        "src",
                        "../images/header-images/shopping-cart.png"
                    );
                    imgShoppingCart.setAttribute("id", value.id);
                    nameProduct.textContent = value.name;

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
        }

        //SELECT ITEMS SHOPPING CART AND ADDING TO DOM

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

        //EMPTY ARRAY TO PUSH

        //LOAD DOM SHOP CART DINAMIC PART / PUSH TO EMPTY ARRAY / LOCALSTORAGE
        function getProductInfo(selectedProduct) {
            let clickedProduct = {
                name: selectedProduct.name,
                price: selectedProduct.price,
                qty: 1,
                imgPath: selectedProduct.imgPath,
            };

            //PUSH TO EMPTY ARRAY

            let exist = false;
            shopCartSelected.forEach((item) => {
                if (item.name === clickedProduct.name) {
                    item.qty++;
                    exist = true;
                }
            });

            exist === false && shopCartSelected.push(clickedProduct);

            loadDomProducts(shopCartSelected);
            // SAVE IN LOCALSTORAGE
            localStorage.setItem("cart", JSON.stringify(shopCartSelected));
        }

        const loadDomProducts = (shopCartSelected) => {
            let hiddenContainer = document.querySelector(".hidden-shopping-cart");
            let container = document.querySelector(".hidden");
            //LOAD STATIC PART
            let titleHiddenContainer = document.getElementById("js-hidden-title");
            let totalHiddenContainer = document.getElementById("js-hidden-total");

            container.innerHTML = "";
            titleHiddenContainer.innerHTML = "";
            totalHiddenContainer.innerHTML = "";

            let hiddenTitleDiv = document.createElement("div");
            let hiddenTitleImg = document.createElement("img");
            let hiddenTitleh2 = document.createElement("h2");
            let hiddenTotalDiv = document.createElement("div");
            let hiddenTotalNumberDiv = document.createElement("div");
            let hiddenDeleteDiv = document.createElement("div");

            /* ADDING CLASS */
            hiddenTitleDiv.classList.add("hidden-title");
            hiddenTitleImg.classList.add("arrow-close");
            hiddenTotalDiv.classList.add("hidden-total");
            hiddenTotalNumberDiv.classList.add("hidden-total-number");
            hiddenDeleteDiv.classList.add("hidden-delete");
            /* ADDING FATHER */
            titleHiddenContainer.append(hiddenTitleDiv);
            totalHiddenContainer.append(hiddenTotalDiv);
            hiddenTitleDiv.append(hiddenTitleImg, hiddenTitleh2);
            hiddenTotalDiv.append(hiddenTotalNumberDiv, hiddenDeleteDiv);
            /* ADDING CONTENT */
            hiddenTitleImg.setAttribute(
                "src",
                "../images/home-main-images/go-right.png"
            );
            hiddenTitleh2.textContent = "Shopping Cart";

            closeCart(hiddenTitleImg, hiddenContainer);
            removeAllItemsCart(hiddenDeleteDiv, container);

            //LOAD DOM SHOP CART DINAMIC PART
            let totalToPay = 0;
            let contador = -1;

            shopCartSelected.forEach((item) => {
                contador++;
                // CALCULATING TOTAL TO PAY
                totalToPay += item.qty * item.price;

                let containerAddedProduct = document.createElement("div");
                let imgDivProduct = document.createElement("div");
                let imgProduct = document.createElement("img");
                let nameDivProduct = document.createElement("div");
                let priceDivProduct = document.createElement("div");
                let countDiv = document.createElement("div");
                let input = document.createElement("input");
                let spanLeft = document.createElement("span");
                let spanRight = document.createElement("span");
                let deleteProductDiv = document.createElement("div");
                let deleteProductImg = document.createElement("img");
                //    ADD CLASS
                containerAddedProduct.classList.add("hidden__shop-product");
                nameDivProduct.classList.add("name-product");
                imgDivProduct.classList.add("img-product");
                priceDivProduct.classList.add("price-product-cart");
                countDiv.classList.add("count-product");
                deleteProductDiv.classList.add("delete-product");
                spanLeft.classList.add("span-left");
                spanRight.classList.add("span-right");
                //    ADD FATHER

                container.append(containerAddedProduct);
                containerAddedProduct.append(imgDivProduct);
                imgDivProduct.append(imgProduct);
                containerAddedProduct.append(nameDivProduct);
                containerAddedProduct.append(priceDivProduct);
                containerAddedProduct.append(countDiv);
                countDiv.append(spanLeft, input, spanRight);
                containerAddedProduct.append(deleteProductDiv);
                deleteProductDiv.append(deleteProductImg);

                //ADD CONTENT
                imgProduct.setAttribute("src", item.imgPath);
                nameDivProduct.textContent = item.name;
                priceDivProduct.textContent = `${item.price * item.qty} USD`;
                spanLeft.textContent = "-";
                spanRight.textContent = "+";
                input.setAttribute("value", item.qty);
                deleteProductImg.setAttribute(
                    "src",
                    "../images/shopping-cart/delete.png"
                );
                hiddenTotalNumberDiv.textContent = `Total = ${totalToPay} USD`;
                hiddenDeleteDiv.textContent = "Empty Cart";
                spanLeft.setAttribute("id", `${contador}`);
                spanRight.setAttribute("id", `${contador}`);
                deleteProductImg.setAttribute("id", `${contador}`);

                //ADDING A NUMBER TO COUNT AMOUNT OF ITEMS ON IMG SHOPPING CART

                dynamicChanges(spanLeft, spanRight, item, input, deleteProductImg);

                //    DINAMYC CHANGES
            });
        };

        function addNumberShop(shopCartSelected) {
            let container = document.getElementById("js-shopping-cart");
            let circleNumberP = document.createElement("p");

            container.append(circleNumberP);
            circleNumberP.textContent = "";
            circleNumberP.textContent = shopCartSelected.length;


        }

        //DYNAMIC CHANGES IN THE CART

        function dynamicChanges(left, right, item, input, deleteItem) {
            // DELETE ITEM

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
                // console.log(saveStorage[e.target.id])
            });
        }

        //REMOVE ALL ITEMS FROM CART


        function removeAllItemsCart(item, item2) {
            item.addEventListener("click", () => {
                const swalWithBootstrapButtons = Swal.mixin({
                    customClass: {
                        confirmButton: "btn btn-success",
                        cancelButton: "btn btn-danger",
                        position: "center",
                    },
                    buttonsStyling: false,
                });

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
                            shopCartSelected = [];
                            addNumberShop(shopCartSelected)
                        }
                    });
            });
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
            });

            window.addEventListener("keydown", (element) => {
                if (element.key === "Escape") {
                    b.classList.remove("desactive-hidden");
                    b.classList.add("active-hidden");
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
            });
        }

        //ACTIVE FUNCTIONS
        addCategoryDom();
        addProductsDom();
        openCart();
    }

    pedirDatos()
});


