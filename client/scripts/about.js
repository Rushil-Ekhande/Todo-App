console.log("About us");

let rating = 0;
let img = document.querySelectorAll('img');
let len = img.length;

for (let i = 0; i < len; i++) {
    img[i].addEventListener('click', () => {
        img[i].src = "assets/images/filed-star.png"
        rating++;
    });
}
let submit_btn = document.querySelector("button");

submit_btn.addEventListener('click', () => {
    if(rating!=0){
        alert(`Thank you for rating our website ${rating} :)`);
    }
    else{
        alert("You have not rated us :(");
    }
});
