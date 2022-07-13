const form = document.querySelector(".inputs.form")
const name = document.querySelector("#name");
const email = document.querySelector("#email");
const contact = document.querySelector("#contact");
const message = document.querySelector("#message");
const button = document.getElementById("js-send");

button.addEventListener("click", () => {
    Email.send({
        Host : "smtp.yourisp.com",
        Username : "username",
        Password : "password",
        To : 'them@website.com',
        From : "you@isp.com",
        Subject : "This is the subject",
        Body : "And this is the body"
    }).then(
        message => alert(message)
    );

    Email.send({
        SecureToken : "963337cb-587e-4951-aba9-9d7da5009606",
        To : 'alexisgraff123@gmail.com',
        From : email.value,
        Subject : "Contact Form",
        Body : message.value
    }).then(
        message => alert(message)
    );

})



// setTimeout(function() {
//     window.location.replace('../sections/home.html')}, 4000);

// 158C13EBD2E671C5C944DEDF8E42A343EA3A
// smtp.elasticemail.com
// 2525

