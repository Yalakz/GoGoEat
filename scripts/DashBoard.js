import { initializeApp } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-app.js";
import { getFirestore, collection, onSnapshot, doc, deleteDoc} from "https://www.gstatic.com/firebasejs/11.8.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDrL1yE-q5P5-Glv1BlP3dqk_q7--QgJfw",
  authDomain: "training-aeaf8.firebaseapp.com",
  projectId: "training-aeaf8",
  storageBucket: "training-aeaf8.firebasestorage.app",
  messagingSenderId: "236575398994",
  appId: "1:236575398994:web:f8e2e119c4df92e5e1d38b",
  measurementId: "G-NHMVZPZWB4"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore();

// 🔴  Mise à jour en temps réel
function listenToCommandes() {
  const commandesRef = collection(db, "Commande");

  onSnapshot(commandesRef, (querySnapshot) => {
    let commandHtml = "";

    querySnapshot.forEach((docSnap) => {
      const data = docSnap.data();
      const panier = data.panier || []; // tableau d'articles
      let panierHtml = "";

      panier.forEach(item => {
        panierHtml += `
          <div class="Cont-third-inner">
            <div>
              <span class="span-produit-third span-third">${item.name}</span>
              <span class="span-Qty-third span-third">${item.quantity}</span>
              <span class="span-prix-third span-third">${item.price} Fcfa</span>
            </div>
          </div>
        `;
      });

      commandHtml += `
        <div class="CardDash">
          <div class="cont-num-imgDash">
            <img class="img-UserCommand" src="icon/user-interface.png" alt="">
            <div class="cont-spandash">
              <span class="span-dash span-dashName">${data.utilisateurId}</span>
              <span class="span-dash span-dashNum">${data.Numero}</span>
              <span class="span-dash span-dashQuartier">${data.lieu}</span>
            </div>
          </div>

          <div class="Second">
            <div class="Cont-qty-prix">
              <span class="span-produit-Second span-Second">Produit</span>
              <span class="span-Qty-Second span-Second">Quantité</span>
              <span class="span-prix-Second span-Second">Prix</span>
            </div>

            <div class="third">
              <div class="Cont-third-qty-prix">
                ${panierHtml}
              </div>
            </div>

            <div class="third">
              <div class="Cont-fourthy">
                <div class="Cont-fourthy-img">
                  <img class="img-fourthy" src="icon/livreur (1).png" alt="">
                  <img class="img-fourthy delete-command" src="icon/supprimer.png" alt="" data-id="${docSnap.id}">
                </div>
              </div>
            </div>
          </div>
        </div>
      `;
    });

    document.querySelector('.Cont-Commande').innerHTML = commandHtml;

    // Ajoute les écouteurs de suppression
    document.querySelectorAll('.delete-command').forEach(img => {
      img.addEventListener('click', (e) => {
        const id = e.target.getAttribute('data-id');
        if (confirm("Voulez-vous vraiment supprimer cette commande ?")) {
          deleteCommande(id);
        }
      });
    });
  });
}

function deleteCommande(id) {
  const docRef = doc(db, "Commande", id);
  deleteDoc(docRef)
    .then(() => {
      console.log("Commande supprimée avec succès");
    })
    .catch((error) => {
      console.error("Erreur lors de la suppression :", error);
    });
}

// Démarrer l'écoute
listenToCommandes();
