function exitLogin(){
    const outer_box = document.querySelector('.outer-box');
    outer_box.classList.add('class_display_none');
    console.log("Button Clicked");
    location.replace("../index.html")

}

function proceedFn(){
    window.location = "../index.html";
}