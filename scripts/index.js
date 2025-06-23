import { PopularCard } from "../Data/Popular.js";
import { PoductCard } from "../Data/Product.js";

/* === Search Bar Filter === */
/*=== nav filter ===*/
const btnFilter = document.querySelectorAll('.filter-btn');

btnFilter.forEach(button => {
    button.addEventListener('click', () => {
        const NavName = button.getAttribute('data-name');
        const Resultfilter = PoductCard.filter(result => result.Categorie == NavName);

        if (Resultfilter.length > 0) {
            let SearchHtml = '';
            Resultfilter.forEach(Resultfilteritem => {
                SearchHtml += `
                    <div class="card" data-name="${Resultfilteritem.ProductName}" data-price="${Resultfilteritem.Prix}" data-img="${Resultfilteritem.img}">
                        <div class="cont-img"><img class="imgCard" src="${Resultfilteritem.img}" alt=""></div>
                        <div class="cont-titre-categ">
                            <span class="span-titre">${Resultfilteritem.Name}</span>
                        </div>
                        <div class="cont-stars"><img class="stars" src="Img/stars/${Resultfilteritem.rate}.webp" alt=""></div>
                        <div class="cont-prix-btn">
                            <span class="span-prix">${Resultfilteritem.Prix} Fcfa</span>
                        </div>
                    </div>
                `;
            });
            document.querySelector('#cont-popular').innerHTML = SearchHtml;
        } else {
            document.querySelector('#cont-popular').innerHTML = 'Aucun produit trouvé';
        }
    });
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
        <div class="cont-stars"><img class="stars" src="Img/stars/${PopularItems.rate}.webp" alt=""></div>
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
        <div class="cont-stars"><img class="stars" src="Img/stars/${PoductItems.rate}.webp" alt=""></div>
        <div class="cont-prix-btn">
            <span class="span-prix">${PoductItems.Prix} Fcfa</span>
        </div>
    </div>
    `;
});
document.querySelector('#cont-Product').innerHTML = CardProductHtml;

function popup(){
    const Modal = document.querySelector('.modal-overlay');
    Modal.style.display = 'flex';

    setTimeout(()=>{
        Modal.style.display = 'none';
    }, 1000);
};

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
            popup();
        });
    });
    
};

function updateCart() {
    // Additionner toutes les quantités dans le panier
    const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.querySelectorAll('.cont-indicator').forEach(el =>{
        el.textContent = totalQuantity;
    });
    /*ici*/
    
};

// Initialisation des boutons
attachAddToCartEvent();
updateCart();

