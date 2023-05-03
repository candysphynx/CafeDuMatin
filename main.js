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
if (localStorage.getItem("keyStock") == null) {
  // Crée un tableau vide
  arrayStock = [];
} else {
  // Récupérer le tableau stocké en string dans le localStorage
  arrayStock = JSON.parse(localStorage.getItem("keyStock"));
  displayProduct(arrayStock);
}

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
    li += `<li>${
      element.name
    } <input type="number" name="stock" min="0" value="${
      element.stock
    }"/> Prix d'achat HT : ${element.buyingPriceHT} Prix de vente HT : ${
      element.sellingPriceHT
    } Marge : ${element.margeHT} Prix TTC : ${element.priceTTC} ${
      element.type == "boisson-alcoolise" ? "🔞" : ""
    } ${
      element.type == "boisson-alcoolise" ? `Degrès : ${element.degres}` : ""
    } <button class="deleteBtn">❌</button> <button class="editBtn">✏️</button></li>`;
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
      supprimer(index);

      // On raffraichit le composant displayProduct
      displayProduct(arrayStock, "all");
    });
  });
  // On commenche la boucle des boutons
  allEditButton.forEach((element, index) => {
    // Pour chaque bouton je déclenche un event qui:
    element.addEventListener("click", () => {
      // Supprimer à l'intérieur du tableau arrayStock l'index selectionné au moment du click
      modifier();

      // On raffraichit le composant displayProduct
      displayProduct(arrayStock, "all");
    });
  });
}

//FONCTION MODIFIER
function modifier() {
  //CRÉATION D'UN INPUT TEXT AVEC UNE CLASSE updateInput À L'INTÉRIEUR DE LA LISTE
  li.innerHTML = `<input type="text" value=${li.innerValue} class="nameEdit"/>`;
  let nameEdit = document.querySelector(".nameEdit");
  let validerBtn = document.createElement("button");
  validerBtn.classList.add("Valider");

  li.appendChild(validerBtn);

  validerBtn.addEventListener("click", function () {
    li.innerText = nameEdit.value;
  });

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
}

//FONCTION SUPPRIMER
function supprimer(index) {
  if (confirm("Voulez vous supprimez ?")) {
    //SPLICE arrayStock DU LOCALSTORAGE QUAND LA FONCTION SERA PRÊTE
    arrayStock.splice(index, 1);
    localStorage.setItem("keyStock", JSON.stringify(arrayStock));
  }
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
