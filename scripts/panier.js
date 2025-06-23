const container = document.querySelector('.inner-panier');

let cart = JSON.parse(localStorage.getItem('cart')) || [];

function updateCart() {
    const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.querySelectorAll('.cont-indicator').forEach(el =>{
        el.textContent = totalQuantity;
    });

    let cardPanier = '';

    cart.forEach((item, index) => {
        cardPanier += `
        <div class="Cont-Panier">
            <div class="Card-panier">
                <img class="img-panier" src="${item.img}" alt="">
                <div class="cont-nom-panier">
                    <span class="span-nom-panier">${item.name}</span>
                    <span class="span-prix-panier">${item.price} Fcfa</span>
                </div>
                <input class="quantity-panier" type="number" value="${item.quantity || 1}" min="1" data-index="${index}">
                <img class="btn-delete-panier" src="icon/croix.png" alt="" data-index="${index}">
            </div>
        </div>
        `;
    });

    container.innerHTML = cardPanier;

    // Bouton Supprimer
    const removeBtns = document.querySelectorAll('.btn-delete-panier');
    removeBtns.forEach(button => {
        button.addEventListener('click', () => {
            const index = button.dataset.index;
            cart.splice(index, 1);
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCart();
        });
    });

    // Mise à jour des quantités
    const quantityInputs = document.querySelectorAll('.quantity-panier');
    quantityInputs.forEach(input => {
        input.addEventListener('change', () => {
            const index = input.dataset.index;
            const newQty = parseInt(input.value);
            cart[index].quantity = newQty;
            localStorage.setItem('cart', JSON.stringify(cart));
            updateTotal();
        });
    });

    // Mettre à jour le total après l'affichage du panier
    updateTotal();
}

function updateTotal() {
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    document.querySelector('.Total').textContent = total + ' Fcfa';
    
    
}

updateCart();

//open checkout
document.querySelector('.Btn-Valider').addEventListener('click', function(){
    if(cart.length === 0){
        e.preventDefault()
    }
    // Remplace le contenu par le loader immédiatement
    this.innerHTML = `<div class="loader"></div>`;
    
    // Redirection après 3 secondes
    setTimeout(() => {
        window.location.href = './Checkout.Html';
    }, 2000);
});

