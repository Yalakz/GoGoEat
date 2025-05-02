import {PopularCard} from "../Data/Popular.js";
import {PoductCard} from "../Data/Product.js";


/*Filter*/
function filterColor(FilterItem){
    document.querySelector(`${FilterItem}`).style.backgroundColor = "#C50000";
    document.querySelector(`${FilterItem}`).style.color = "#FFFFFF";
};

document.querySelector('.FilterBurger').addEventListener('click', ()=>{
    const FilterBurger = document.querySelector('.FilterBurger');
    if(FilterBurger.style.backgroundColor === ""){
        filterColor('.FilterBurger');
    }else{
        FilterBurger.style.color = "#343232";
        FilterBurger.style.backgroundColor = "";
    };
    /*HtmlBurger*/

    let BurgerHtml = '';
    const filteredBurgers = PoductCard.filter((BurgerItems) => BurgerItems.Categorie === "Burger");
    filteredBurgers.forEach((BurgerItems)=>{
        BurgerHtml += `
        <div class="card">
                <div class="cont-img-fav"><img src="icon/favori.png" alt=""></div>
                <div class="cont-img"><img src="${BurgerItems.img}" alt=""></div>
                <div class="cont-titre-categ">
                    <span class="span-titre">${BurgerItems.ProductName}</span>
                    <span class="span-categ">${BurgerItems.Categorie}</span>
                </div>
                <div class="cont-prix-btn">
                    <span class="span-prix">${BurgerItems.Prix}XOF</span>
                    <div class="btn-add"><img src="icon/plus.png" alt=""></div>
                </div>
            </div>
        `;
        
    });
    

        document.querySelector('.cont-categ-card').innerHTML= BurgerHtml;
    
    
});
/*
document.querySelector().addEventListener('', ()=>{
    
})
document.querySelector().addEventListener('', ()=>{
    
})
document.querySelector().addEventListener('', ()=>{
    
})*/


let CardPopularHtml = '';

PopularCard.forEach((PopularItems) =>{
    CardPopularHtml += `
    <div class="card">
                <div class="cont-img"><img class="imgCard" src="${PopularItems.img}" alt=""></div>
                <div class="cont-titre-categ">
                    <span class="span-titre">${PopularItems.ProductName}</span>
                </div>
                <div class="cont-prix-btn">
                    <span class="span-prix">${PopularItems.Prix}Fcfa</span>
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
                <div class="cont-img"><img class="imgCard" src="${PoductItems.img}" alt=""></div>
                <div class="cont-titre-categ">
                    <span class="span-titre">${PoductItems.Name}</span>
                </div>
                <div class="cont-prix-btn">
                    <span class="span-prix">${PoductItems.Prix}Fcfa</span>
                </div>
            </div>
    `;
});

document.querySelector('#cont-Product').innerHTML= CardProductHtml;

