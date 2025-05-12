const container = document.querySelector('.inner-panier');

let cart = JSON.parse(localStorage.getItem('cart')) || [];
let total = 0;

function updateCart(){
    document.querySelector('.cont-indicator').textContent = cart.length;
    /*insert le panier */
    let cardPanier = '';

    cart.forEach((item) => {
        cardPanier += `
        <div class="Cont-Panier">
            <div class="Card-panier">
                <img class="img-panier" src="${item.img}" alt="">
                <div class="cont-nom-panier">
                    <span class="span-nom-panier">${item.name}</span>
                    <span class="span-prix-panier">${item.price}Fcfa</span>
                </div>
                <input class="quantity-panier" type="number" value="${item.quantity || 1}">
                <img  class="btn-delete-panier" src="icon/croix.png" alt="">
            </div>
        </div>
        `

    });
    container.innerHTML = cardPanier;
    // Bouton Supprimer
    const removeBtn = document.querySelectorAll('.btn-delete-panier');
    removeBtn.forEach((button, index) =>{
        button.addEventListener('click', () => {
      cart.splice(index, 1);
      localStorage.setItem('cart', JSON.stringify(cart));
      updateCart();
    });  
})
}
updateCart();
console.log(cart);