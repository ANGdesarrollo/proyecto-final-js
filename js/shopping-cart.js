let containerShoppingCart = document.querySelector("#js-test")

const defaultMessage = document.createElement("div");
defaultMessage.classList.add("default-message");
defaultMessage.innerHTML = `<span>hola</span>`;
containerShoppingCart.append(defaultMessage)
console.log(defaultMessage)

