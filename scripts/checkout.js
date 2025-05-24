let cart = JSON.parse(localStorage.getItem('cart')) || [];

function updateCart() {
    document.querySelector('.cont-indicator').textContent = cart.length;

    let cardPanier = '';

    cart.forEach((item, index) => {
        cardPanier += `
                <ul>
                    <li>${item.name}</li>
                </ul>
        `;
    });

document.querySelector('.Cont-panier-Form').innerHTML = cardPanier;
}
updateCart();