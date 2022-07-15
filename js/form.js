const form = document.querySelector(".inputs.form");
const button = document.getElementById("js-send");
const completeName = document.querySelector("#name");
const mail = document.querySelector("#email");
const message = document.querySelector("#message");

button.addEventListener("click", (e) => {
    e.preventDefault();
    if((completeName.value != "") && (mail.value != "") && (message.value != "")) {
        sendMail()
    } else {
        Swal.fire({
            icon: "error",
            position: "top-right",
            title: "You must complete all fields!",
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
})

function sendMail() {
    let tempParams = {
        from_name: document.querySelector("#name").value,
        from_mail: document.querySelector("#email").value,
        phone_number: document.querySelector("#contact").value,
        message: document.querySelector("#message").value,
    }

    emailjs.send('service_2wdmhbd', 'template_wq8wnrm', tempParams)
    .then(function(res) {
        console.log("success", res.status);
    })
    .then(setTimeout(function() {
        window.location.replace('../sections/success-form.html')}, 3000));
}





