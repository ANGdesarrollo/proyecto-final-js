const form = document.querySelector(".inputs.form")
const button = document.getElementById("js-send");

button.addEventListener("click", (e) => {
    e.preventDefault();
    sendMail()
    
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





