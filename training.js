
  /* Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/11.7.3/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.7.3/firebase-analytics.js";

  // Your web app's Firebase configuration
  
    const firebaseConfig = {
    apiKey: "AIzaSyDrL1yE-q5P5-Glv1BlP3dqk_q7--QgJfw",
    authDomain: "training-aeaf8.firebaseapp.com",
    projectId: "training-aeaf8",
    storageBucket: "training-aeaf8.firebasestorage.app",
    messagingSenderId: "236575398994",
    appId: "1:236575398994:web:f8e2e119c4df92e5e1d38b",
    measurementId: "G-NHMVZPZWB4"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  */
 // Import Firebase modules depuis CDN
 import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
 import { getFirestore, collection, getDocs , addDoc, Timestamp} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";
 // Configuration Firebase (à personnaliser)
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

 // Gestion du formulaire
 const form = document.getElementById("panierForm");
 const message = document.getElementById("message");

 form.addEventListener("submit", async (e) => {
   e.preventDefault();

   const nom = document.getElementById("nomProduit").value;
   const quantite = parseInt(document.getElementById("quantiteProduit").value);
   const prix = parseInt(document.getElementById("prixProduit").value);

   const total = quantite * prix;

   try {
     await addDoc(collection(db, "paniers"), {
       utilisateurId: "utilisateur_123", // À personnaliser selon ton système
       dateCreation: Timestamp.now(),
       statut: "en cours",
       articles: [
         {
           nom: nom,
           quantité: quantite,
           prixUnitaire: prix
         }
       ],
       total: total
     });

     message.textContent = "Panier ajouté avec succès ! 🎉";
     form.reset();
   } catch (error) {
     console.error("Erreur d'ajout :", error);
     message.textContent = "Erreur lors de l'ajout du panier.";
   }
 });

 async function afficherPaniers() {
    const querySnapshot = await getDocs(collection(db, "paniers"));
    if (querySnapshot.empty) {
      document.querySelector('.container').textContent = "Aucun panier trouvé.";
      return;
    }
  
    let command = '';
  
    querySnapshot.forEach((doc) => {
      const panier = doc.data();
  
      // Afficher les articles sous forme de liste
      let listeArticles = '';
      panier.articles.forEach((article) => {
        listeArticles += `
          <li>${article.nom} - ${article.quantité} x ${article.prixUnitaire} FCFA</li>
        `;
      });
  
      command += `
        <div style="border:1px solid #ccc; padding:10px; margin-bottom:10px;">
          <span><strong>Utilisateur:</strong> ${panier.utilisateurId}</span><br>
          <span><strong>Statut:</strong> ${panier.statut}</span><br>
          <span><strong>Total:</strong> ${panier.total} FCFA</span><br>
          <strong>Articles :</strong>
          <ul>${listeArticles}</ul>
        </div>
      `;
    });
  
    document.querySelector('.container').innerHTML = command;
    console.log(command);
  }
  

  afficherPaniers();

 