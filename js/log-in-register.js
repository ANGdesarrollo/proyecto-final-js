const iconUser = document.getElementById("user");
const body = document.querySelector("body");
const localStorageUser = [];
const userLoggedIn = [];

iconUser.addEventListener("click", () => {
    createDivLogIn()
})

function createDivLogIn() {
    let containerGeneral = document.createElement("div");
    let container = document.createElement("div");
    let upperContainer = document.createElement("div");
    let spanPoint1 = document.createElement("span");
    let spanPoint2 = document.createElement("span");
    let spanPoint3 = document.createElement("span");
    let closeImg = document.createElement("img");
    let containerForm = document.createElement("form");
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
    let buttonLogIn = document.createElement("button");
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
    registerUser.append(buttonLogIn);
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
    labelUser.textContent = "USER";
    labelUser.setAttribute("for", "name-user");
    labelPassword.textContent = "PASSWORD";
    labelPassword.setAttribute("for", "password-user");
    inputUser.setAttribute("placeholder", "user");
    inputUser.setAttribute("id", "name-user");
    inputPassword.setAttribute("id", "password-user");
    inputPassword.setAttribute('placeholder', "password");
    inputPassword.setAttribute('type', "password");
    buttonLogIn.textContent = "Log In";
    buttonRegister.textContent = "Register";
    buttonRegister.setAttribute("id", "js-submit-button-register");

    logInUser(buttonLogIn, containerForm, containerGeneral);

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
        confirmUser.classList.add("register-user");

        divUserContainer.append(divRepeatPassword);
        divRepeatPassword.append(labelRepeatPassword, inputRepeatPassword);
        containerForm.append(confirmUser);
        confirmUser.append(buttonConfirm);

        labelRepeatPassword.textContent = "REPEAT PASSWORD";
        labelRepeatPassword.setAttribute("for", "repeat-password");
        inputPassword.setAttribute('type', "password");
        inputRepeatPassword.setAttribute("placeholder", "repeat password");
        inputRepeatPassword.setAttribute("type", "password");
        inputRepeatPassword.setAttribute("id", "repeat-password");
        buttonConfirm.textContent = "Submit";
        inputUser.setAttribute("name", "nameUser");
        inputPassword.setAttribute("name", "passwordUser");
        inputRepeatPassword.setAttribute("name", "repeatPasswordUser");

        registerUser.remove();
        buttonRegister.remove();

        captureData(buttonConfirm, containerForm, containerGeneral);


    })

    removeScreen(containerGeneral, closeImg);
}

function captureData(register, form, deleteDiv) {
    let repeatUsers = JSON.parse(localStorage.getItem("user"));

    register.addEventListener("click", (event) => {
        event.preventDefault();

        if (repeatUsers != null) {
            let filterRepeatUser = repeatUsers.filter(item => item.user == form.querySelector("#name-user").value)

            if (filterRepeatUser[0].user == form.querySelector("#name-user").value) {
                alert("el usuario ya existe, por favor ingrese otro nombre")

            }
        } else if (form.querySelector("#password-user").value != form.querySelector("#repeat-password").value) {
            alert("password don't match");


        } else if (form.querySelector("#name-user").value == "") {
            alert("El campo de usuario es obligatorio!")

        } else {
            if (form.querySelector("#password-user").value == form.querySelector("#repeat-password").value) {
                let captureData = {
                    user: form.querySelector("#name-user").value,
                    password: form.querySelector("#password-user").value
                }
                localStorageUser.push(captureData);
                localStorage.setItem("user", JSON.stringify(localStorageUser));
                deleteDiv.innerHTML = "";
                deleteDiv.classList.remove("container-general-log-in");
                alert("se ha registrado exitosamente , por favor loguee")
                createDivLogIn()
            }
        }
    })
}

function logInUser(button, form, deleteDiv) {
    let saveStorageUser = JSON.parse(localStorage.getItem("user"));
    button.addEventListener("click", (e) => {
        e.preventDefault();

        if (saveStorageUser == null) {
            alert("Usuario o contraseña incorrecto")
        } else {
            let checkUser = saveStorageUser.filter(item => item.user == form.querySelector("#name-user").value);
            let checkPassword = saveStorageUser.filter(item => item.password == form.querySelector("#password-user").value);
            if (checkUser.length == 0 || checkPassword.length == 0) {
                alert("usuario o contraseña incorrecto")
            } else if (checkUser[0].user == form.querySelector("#name-user").value && checkPassword[0].password == form.querySelector("#password-user").value) {
                alert("esto es correcto")
                let userLogged = {
                    user: checkUser[0].user,
                    password: checkPassword[0].password
                }

                userLoggedIn.push(userLogged);
                localStorage.setItem("userLoggedIn", JSON.stringify(userLoggedIn));
                deleteDiv.innerHTML = "";
                deleteDiv.classList.remove("container-general-log-in");
            }
        }
    })

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


