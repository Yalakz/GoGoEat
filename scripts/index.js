import { PopularCard } from "../Data/Popular.js";
import { PoductCard } from "../Data/Product.js";

/* === Search Bar Filter === */
const BarSearch = document.querySelector('.myinput');

BarSearch.addEventListener('input', function () {
    const input = BarSearch.value.trim().toLowerCase();
    const results = PoductCard.filter(p => p.ProductName.toLowerCase().includes(input));
    const container = document.querySelector('#cont-popular');

    if (results.length > 0) {
        container.innerHTML = results.map(result => `
            <div class="card" data-name="${result.ProductName}" data-price="${result.Prix}" data-img="${result.img}">
                <div class="cont-img">
                    <img class="imgCard" src="${result.img}" alt="">
                </div>
                <div class="cont-titre-categ">
                    <span class="span-titre">${result.ProductName}</span>
                </div>
                <div class="cont-prix-btn">
                    <span class="span-prix">${result.Prix} Fcfa</span>
                </div>
            </div>
        `).join('');
    } else {
        container.innerHTML = 'Aucun produit trouvé';
    }

    attachAddToCartEvent(); // réattacher les événements click
});

/* === Popular Cards === */
let CardPopularHtml = '';

PopularCard.forEach((PopularItems) => {
    CardPopularHtml += `
    <div class="card" data-name="${PopularItems.ProductName}" data-price="${PopularItems.Prix}" data-img="${PopularItems.img}">
        <div class="cont-img"><img class="imgCard" src="${PopularItems.img}" alt=""></div>
        <div class="cont-titre-categ">
            <span class="span-titre">${PopularItems.ProductName}</span>
        </div>
        <div class="cont-stars"><img class="stars" src="Img/stars/${PopularItems.rate}.png" alt=""></div>
        <div class="cont-prix-btn">
            <span class="span-prix">${PopularItems.Prix} Fcfa</span>
        </div>
    </div>
    `;
});
document.querySelector('#cont-popular').innerHTML = CardPopularHtml;

/* === Product Cards === */
let CardProductHtml = '';

PoductCard.forEach((PoductItems) => {
    CardProductHtml += `
    <div class="card" data-name="${PoductItems.Name}" data-price="${PoductItems.Prix}" data-img="${PoductItems.img}">
        <div class="cont-img"><img class="imgCard" src="${PoductItems.img}" alt=""></div>
        <div class="cont-titre-categ">
            <span class="span-titre">${PoductItems.Name}</span>
        </div>
        <div class="cont-stars"><img class="stars" src="Img/stars/${PoductItems.rate}.png" alt=""></div>
        <div class="cont-prix-btn">
            <span class="span-prix">${PoductItems.Prix} Fcfa</span>
        </div>
    </div>
    `;
});
document.querySelector('#cont-Product').innerHTML = CardProductHtml;

/* === Cart Logic === */
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function attachAddToCartEvent() {
    const addToCartButtons = document.querySelectorAll('.card');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', () => {
            const name = button.getAttribute('data-name');
            const price = parseFloat(button.getAttribute('data-price'));
            const img = button.getAttribute('data-img'); // <-- Correction ici

            const existingItem = cart.find(item => item.name === name);

            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push({
                    img: img,
                    name: name,
                    price: price,
                    quantity: 1
                });
            }

            localStorage.setItem('cart', JSON.stringify(cart));
            updateCart();
        });
    });
}

function updateCart() {
    // Additionner toutes les quantités dans le panier
    const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.querySelector('.cont-indicator').textContent = totalQuantity;
}

// Initialisation des boutons
attachAddToCartEvent();
updateCart();
