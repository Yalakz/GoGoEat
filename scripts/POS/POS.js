import {ProductPOS} from "/scripts/POS/Product.js";

let CardPOSHtml = '';

ProductPOS.forEach (ProductItemsPOS => {
    CardPOSHtml += `
  <div class="Card-POS">
    <img class="img-POS" src="${ProductItemsPOS.img}" alt="">
    <div class="Nom-Prix-POS">
      <span class="Nom-Card-POS" data-name="${ProductItemsPOS.Name}">${ProductItemsPOS.Name}</span>
      <span class="Pirx-Card-POS" data-price="${ProductItemsPOS.Prix}">${ProductItemsPOS.Prix}Fcfa</span>
    </div>
  </div>
`;
});

document.querySelector('#List-Card').innerHTML = CardPOSHtml;

let total = 0;

document.querySelectorAll('.Card-POS').forEach(card => {
  card.addEventListener('click', function () {
    const name = this.querySelector('.Nom-Card-POS').dataset.name;
    const price = parseInt(this.querySelector('.Pirx-Card-POS').dataset.price);
    const qty = 1;

    const table = document.querySelector('#factureTable tbody');
    let found = false;

    // Vérifier si l'article existe déjà dans le tableau
    Array.from(table.rows).forEach(row => {
      if (row.cells[0].innerText === name) {
        let currentQty = parseInt(row.cells[1].innerText);
        currentQty += qty;
        row.cells[1].innerText = currentQty;
        row.cells[3].innerText = (currentQty * price) + " FCFA";
        found = true;
      }
    });

    // Si l'article n'existe pas, on ajoute une nouvelle ligne
    if (!found) {
      const row = table.insertRow();
      row.innerHTML = `
        <td>${name}</td>
        <td>${qty}</td>
        <td>${price} FCFA</td>
        <td>${qty * price} FCFA</td>
      `;
    }

    // Recalculer le total général
    total = 0;
    Array.from(table.rows).forEach(row => {
      const subtotal = parseInt(row.cells[3].innerText);
      total += subtotal;
    });

    document.getElementById('total').innerText = "Total : " + total + " FCFA";
  });
});
document.addEventListener('keydown', function(event) {
  if (event.key === 'Enter') {
    window.print();
  } 
  // Réinitialiser le tableau
  const tbody = document.querySelector('#factureTable tbody');
  tbody.innerHTML = '';

  // Réinitialiser le total
  total = 0;
  document.getElementById('total').innerText = "Total : 0 FCFA";
});