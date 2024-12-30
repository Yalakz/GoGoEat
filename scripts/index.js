import {PopularCard} from "../Data/Popular.js";
import {PoductCard} from "../Data/Product.js";
import {ComboCard} from "../Data/Combo.js";

let CardPopularHtml = '';

PopularCard.forEach((PopularItems) =>{
    CardPopularHtml += `
    <div class="card">
                <div class="cont-img-fav"><img src="icon/favori.png" alt=""></div>
                <div class="cont-img"><img src="${PopularItems.img}" alt=""></div>
                <div class="cont-titre-categ">
                    <span class="span-titre">${PopularItems.ProductName}</span>
                    <span class="span-categ">${PopularItems.Categorie}</span>
                </div>
                <div class="cont-prix-btn">
                    <span class="span-prix">${PopularItems.Prix}XOF</span>
                    <div class="btn-add"><img src="icon/plus.png" alt=""></div>
                </div>
            </div>
    `;
});

document.querySelector('#cont-popular').innerHTML= CardPopularHtml;

/*Product */
let CardProductHtml = '';


PoductCard.forEach((PoductItems) =>{
    CardProductHtml += `
    <div class="card">
                <div class="cont-img-fav"><img src="icon/favori.png" alt=""></div>
                <div class="cont-img"><img src="${PoductItems.img}" alt=""></div>
                <div class="cont-titre-categ">
                    <span class="span-titre">${PoductItems.ProductName}</span>
                    <span class="span-categ">${PoductItems.Categorie}</span>
                </div>
                <div class="cont-prix-btn">
                    <span class="span-prix">${PoductItems.Prix}XOF</span>
                    <div class="btn-add"><img src="icon/plus.png" alt=""></div>
                </div>
            </div>
    `;
});

document.querySelector('#cont-Product').innerHTML= CardProductHtml;

/*Combo */
let CardComboHtml = '';


ComboCard.forEach((ComboItems) =>{
    CardComboHtml += `
    <div class="card">
                <div class="cont-img-fav"><img src="icon/favori.png" alt=""></div>
                <div class="cont-img"><img src="${ComboItems.img}" alt=""></div>
                <div class="cont-titre-categ">
                    <span class="span-titre">${ComboItems.ProductName}</span>
                    <span class="span-categ">${ComboItems.Categorie}</span>
                </div>
                <div class="cont-prix-btn">
                    <span class="span-prix">${ComboItems.Prix}XOF</span>
                    <div class="btn-add"><img src="icon/plus.png" alt=""></div>
                </div>
            </div>
    `;
});

document.querySelector('#cont-combo').innerHTML= CardComboHtml;


