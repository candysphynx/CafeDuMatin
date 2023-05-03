//FONCTION CHANGER LA COULEUR SELON SI LA BOISSON EST ALCOOLISÉE OU NON
/* function colorAlcool(li) {
    switch (alcool.value) {
        // Si la valeur de l'input alcool est true
        case "true":
            // On colore l'élément (juste son nom ?) en rouge
            li.style.color = "red";
            break;
        // Si la valeur de l'input alcool est false
        case "false":
            // On colore l'élément (juste son nom ?) en bleu
            li.style.color = "blue";
            break;
        default:
            break;
    }
}*/

//FONCTION RANGEMENT DES ÉLÉMENTS DU STOCK PAR ORDRE ALPHABÉTIQUE
// Récupération des éléments du HTML
let stockContainer = document.querySelector(".stockContainer");
let addProductContainer = document.querySelector(".addProductContainer");
let form = document.querySelector(".formProduct");
let ulContainer = document.querySelector(".ulContainer");
let arrayStock;

// Tableau de produit (a récupérer dans le localStorage si existe)
addEventListener("DOMContentLoaded", () => {
  // On récupère le localStorage en lui rendant sa forme initial (tableau) avec la méthode parse
  let keyStock = JSON.parse(localStorage.getItem("keyStock"));
  // Si il y'a quelque chose dans le localStorage
  if (keyStock.length > 0) {
    // La variable arrayStock récupère le tableau stocké dans le localStorage
    arrayStock = keyStock;
    // On lance l'affichage du tableau arrayStock
    displayProduct(arrayStock);
  } else {
    // Sinon on initialise le tableau arrayStock à vide sans lancer l'affichage
    arrayStock = [];
  }
});

// Fonctions
function createProduct(e) {
  // Empecher le rechargement de la page
  e.preventDefault();

  // On stocke dans une variable data les données du formulaire
  let data = new FormData(form);

  // On crée un nouveau produit en utilisant en paramètres les saisies de l'utilisateur
  let product = new Product(
    data.get("name"),
    data.get("stock"),
    data.get("buyingPriceHT"),
    data.get("sellingPriceHT"),
    data.get("TVA"),
    data.get("type"),
    data.get("degres")
  );

  // On push le nouveau produit dans le tableau arrayStock
  arrayStock.push(product);

  // On enregistre le produit dans le localStorage
  localStorage.setItem("keyStock", JSON.stringify(arrayStock));

  // On affiche dans le stock le nouveau produit en appelant la fonction displayProduct
  displayProduct(arrayStock, "all");

  // On efface les inputs de dans le formulaire
  form.reset();
}

function displayProduct(array, type) {
  // On crée une ligne vide
  let li = "";
  // On boucle sur le tableau arrayStock
  array.forEach((element, index) => {
    // Pour chaque produit de arrayStock, on crée une ligne correspondante
    li += `<li>${element.name} Stock : ${element.stock} Prix d'achat HT : ${
      element.buyingPriceHT
    } Prix de vente HT : ${element.sellingPriceHT} Marge : ${
      element.margeHT
    } Prix TTC : ${element.priceTTC} ${
      element.type == "boisson-alcoolise" ? "🔞" : ""
    } ${
      element.type == "boisson-alcoolise" ? `Degrès : ${element.degres}` : ""
    } <button class="deleteBtn">Supprimer</button> <button class="editBtn">Editer</button></li>`;
    // Fin de boucle du tableau
  });
  // On affiche productLi dans ulContainer
  ulContainer.innerHTML = li;

  // Je récupère tout mes boutons supprimer & edit qui ont été crée juste au dessus
  let allDeleteButton = document.querySelectorAll(".deleteBtn");
  let allEditButton = document.querySelectorAll(".editBtn");
  // On commenche la boucle des boutons
  allDeleteButton.forEach((element, index) => {
    // Pour chaque bouton je déclenche un event qui:
    element.addEventListener("click", () => {
      // Supprimer à l'intérieur du tableau arrayStock l'index selectionné au moment du click
      supprimer(li, deleteBtn);

      // On raffraichit le composant render
      displayProduct(arrayStock, "all");
    });
  });
  // On commenche la boucle des boutons
  allEditButton.forEach((element, index) => {
    // Pour chaque bouton je déclenche un event qui:
    element.addEventListener("click", () => {
      // Supprimer à l'intérieur du tableau arrayStock l'index selectionné au moment du click
      modifier(li, editBtn, deleteBtn);

      // On raffraichit le composant render
      displayProduct(arrayStock, "all");
    });
  });
}

//FONCTION MODIFIER
function modifier(li, editBtn, deleteBtn) {
  //CRÉATION D'UN INPUT TEXT AVEC UNE CLASSE updateInput À L'INTÉRIEUR DE LA LISTE
  li.innerHTML = `<input type="text" value=${li.innerValue} class="nameEdit"/>`;
  let nameEdit = document.querySelector(".nameEdit");
  let validerBtn = document.createElement("button");
  validerBtn.classList.add("Valider");

  li.appendChild(validerBtn);

  validerBtn.addEventListener("click", function () {
    li.innerText = nameEdit.value;
  });

  // //QUERY SUR L'INPUT POUR LE RÉCUPÉRER ET LE STOCKER DANS updateInput
  // let updateInput = document.querySelectorAll(".updateInput");

  //EVENTLISTENER SUR updateInput TEXT
  nameEdit.addEventListener("keydown", function (eventInfo) {
    if (eventInfo.key == "Enter") {
      //updateInput REMPLIE PAR USER REMPLACE LA BALISE INPUT
      li.innerText = nameEdit.value;
      li.innerValue = nameEdit.value;
      //REPLACEMENT DES BOUTONS DELETE ET EDIT
      li.appendChild(editBtn);
      li.appendChild(deleteBtn);
    }
  });
  // REMPLACEMENT DE L'ANCIEN ARRAY NON MODIFIÉ PAR CELUI QU'ON VIENT D'ÉDITER
  //render(FonctionConstructeurModifiée);
}

//FONCTION SUPPRIMER
function supprimer(li, deleteBtn) {
  deleteBtn.addEventListener("click", function () {
    if (confirm("Voulez vous supprimez ?")) {
      li.remove();
      //SPLICE arrayStock DU LOCALSTORAGE QUAND LA FONCTION SERA PRÊTE
      arrayStock.splice(index, 1);
      localStorage.setItem("keyStock", JSON.stringify(arrayStock));
    }
  });
}

// Exécution des fonctions
// Lors du clic sur le bouton Ajouter Produit, appelle la fonction createProduct
form.addEventListener("submit", createProduct);

// Constructor
function Product(
  name,
  stock,
  buyingPriceHT,
  sellingPriceHT,
  TVA,
  type,
  degres
) {
  this.name = name;
  this.stock = stock;
  this.buyingPriceHT = buyingPriceHT + "€";
  this.sellingPriceHT = sellingPriceHT + "€";
  this.margeHT = sellingPriceHT - buyingPriceHT + "€";
  this.priceTTC = sellingPriceHT * (1 + TVA / 100) + "€";
  this.type = type;
  this.degres = degres + "%";
}
