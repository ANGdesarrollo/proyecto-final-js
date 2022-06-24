let videos = document.querySelector(".videos");
let circles = document.querySelectorAll(".circle");
let arrowRight = document.getElementById('js-arrow-right');
let arrowLeft = document.getElementById('js-arrow-left');
let videoCarousel = document.getElementById("js-video-carousel");

videos.addEventListener("click", () => {
    videos.classList.toggle("videos-active");
})

let videoPaths = ["../images/home-main-videos/publicidad-razer.mp4", "../images/home-main-videos/publicidad-corsair.mp4", "../images/home-main-videos/publicidad-steelseries.mp4"];


let position = 0;
circles[position].classList.add("circle-active");

arrowRight.addEventListener('click', () => {
    position++;
    if (position >= circles.length) {
        position = 0;
    }
    for (let index = 0; index < circles.length; index++) {
        circles.forEach(elem => elem.classList.remove("circle-active"));
    }
    circles[position].classList.add("circle-active");
    videoCarousel.setAttribute('src',videoPaths[position]);
    console.log(position);
})

arrowLeft.addEventListener('click', () => {
    position--;
    if (position < 0) {
        position = circles.length - 1;
    }
    for (let index = 0; index < circles.length; index++) {
        circles.forEach(elem => elem.classList.remove("circle-active"));
    }
    circles[position].classList.add("circle-active");
    videoCarousel.setAttribute('src',videoPaths[position]);
    console.log(position);
})


for (let i = 0; i < videoCarousel.length; i++) {
    if (i === 0) {
        console.log(circles)


    }


}



