import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
 import { getFirestore, collection, getDocs , addDoc, Timestamp} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";
 // Configuration Firebase (à personnaliser)
// Configuration Firebase
const firebaseConfig = {
    apiKey: "AIzaSyDrL1yE-q5P5-Glv1BlP3dqk_q7--QgJfw",
    authDomain: "training-aeaf8.firebaseapp.com",
    projectId: "training-aeaf8",
    storageBucket: "training-aeaf8.firebasestorage.app",
    messagingSenderId: "236575398994",
    appId: "1:236575398994:web:f8e2e119c4df92e5e1d38b",
    measurementId: "G-NHMVZPZWB4"
  };

// Initialisation Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Panier
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function updateCart() {
  document.querySelector('.cont-indicator').textContent = cart.length;

  let cardPanier = '';
  cart.forEach((item) => {
    cardPanier += `<ul><li>${item.name}</li></ul>`;
  });

  document.querySelector('.Cont-panier-Form').innerHTML = cardPanier;
}

document.addEventListener("DOMContentLoaded", updateCart);

// Formulaire
const form = document.querySelector(".form");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const NomComplet = document.querySelector('#nom-form').value.trim();
  const NumeroTel = document.querySelector('#tel').value.trim();
  const Quartier = document.querySelector('#Quartier').value.trim();
  console.log(NomComplet, NumeroTel, Quartier);

  try {
    await addDoc(collection(db, "Commande"), {
      utilisateurId: NomComplet,
      Numero: NumeroTel,
      lieu: Quartier,
      dateCreation: Timestamp.now(),
      statut: "en cours",
      panier: cart,
    });
    console.log("✅ Commande enregistrée !");
    form.reset();
    
  } catch (error) {
    console.error("❌ Erreur d'ajout :", error);
  }
});
console.log(cart);
