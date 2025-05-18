let knopka = document.querySelectorAll("button");
let cartAmount = document.querySelector('.cart-amount');
cartAmount.innerHTML = "0";
function knopka1() {
    cartAmount.innerHTML = +cartAmount.innerHTML + 1;
    console.log(cartAmount.innerHTML)
}

console.log(knopka)
for (let i = 0; i < knopka.length; i += 1) {
    knopka[i].addEventListener('click', knopka1);
}
