const iconUser = document.getElementById("user");
const body = document.querySelector("body");

iconUser.addEventListener("click", () => {
    let containerGeneral = document.createElement("div");
    let container = document.createElement("div");
    let upperContainer = document.createElement("div");
    let spanPoint1 = document.createElement("span");
    let spanPoint2 = document.createElement("span");
    let spanPoint3 = document.createElement("span");
    let closeImg = document.createElement("img");
    let containerForm = document.createElement("div");
    let divTitle = document.createElement("div");
    let titleSpan1 = document.createElement("span");
    let titleSpan2 = document.createElement("span");
    let divUserContainer = document.createElement("div");
    let divUser = document.createElement("div");
    let labelUser = document.createElement("label");
    let inputUser = document.createElement("input");
    let divPassword = document.createElement("div");
    let labelPassword = document.createElement("label");
    let inputPassword = document.createElement("input");
    let registerUser = document.createElement("div");
    let buttonRegister = document.createElement("button");


    containerGeneral.classList.add("container-general-log-in");
    container.classList.add("container-log-in");
    upperContainer.classList.add("upper-container");
    containerForm.classList.add("form-container-user");
    divUserContainer.classList.add("user-container-data")
    divTitle.classList.add("title-user");
    divUser.classList.add("complete-data");
    divPassword.classList.add("complete-data");
    registerUser.classList.add("register-user");

    body.append(containerGeneral);
    containerGeneral.append(container);
    container.append(upperContainer, containerForm);
    upperContainer.append(spanPoint1, spanPoint2, spanPoint3, closeImg);
    containerForm.append(divTitle);
    containerForm.append(divUserContainer);
    containerForm.append(registerUser);
    registerUser.append(buttonRegister);
    divUserContainer.append(divUser, divPassword);
    divUser.append(labelUser, inputUser);
    divPassword.append(labelPassword, inputPassword);
    divTitle.append(titleSpan1, titleSpan2);


    spanPoint1.setAttribute("id", "js-span-a");
    spanPoint2.setAttribute("id", "js-span-b");
    spanPoint3.setAttribute("id", "js-span-c");
    titleSpan2.setAttribute("id", "span-left-title-user");
    titleSpan1.textContent = "LOG";
    titleSpan2.textContent = "IN";
    closeImg.setAttribute("src", "../images/user/close.png");
    labelUser.textContent = "User";
    labelPassword.textContent = "Password";
    inputUser.setAttribute("placeholder", "user")
    inputPassword.setAttribute('placeholder', "password");
    inputPassword.setAttribute('type', "password");
    buttonRegister.textContent = "Register";


    buttonRegister.addEventListener("click", () => {
        titleSpan1.textContent = "SIGN";
        titleSpan2.textContent = "UP";
        inputUser.setAttribute("placeholder", "enter your user");
        inputPassword.setAttribute('type', "enter your password");
        let divRepeatPassword = document.createElement("div");
        let labelRepeatPassword = document.createElement("label");
        let inputRepeatPassword = document.createElement("input");
        let confirmUser = document.createElement("div");
        let buttonConfirm = document.createElement("button");


        divRepeatPassword.classList.add("complete-data");
        confirmUser.classList.add("active-register-user");

        divUserContainer.append(divRepeatPassword);
        divRepeatPassword.append(labelRepeatPassword, inputRepeatPassword);
        containerForm.append(confirmUser);
        confirmUser.append(buttonConfirm);

        labelRepeatPassword.textContent = "Repeat Password";
        inputPassword.setAttribute('type', "password");
        inputRepeatPassword.setAttribute("placeholder", "repeat password");
        inputRepeatPassword.setAttribute("type", "password");
        buttonConfirm.textContent = "Submit";

        registerUser.remove();
        buttonRegister.remove();


    })

    removeScreen(containerGeneral, closeImg);
})

function captureData () {


}

function removeScreen(containerGeneral, closeImg) {
    window.addEventListener("keydown", (element) => {
        if (element.key === "Escape") {
            containerGeneral.remove()
        }
    });

    closeImg.addEventListener("click", () => {
        containerGeneral.remove()
    })


}
