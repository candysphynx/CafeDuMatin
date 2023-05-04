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

<<<<<<< Updated upstream
=======
  stockColor(li);

>>>>>>> Stashed changes
  // On efface les inputs de dans le formulaire
  form.reset();
}

function displayProduct(array, type) {
  // On crée une ligne vide
  let li = "";
  // On boucle sur le tableau arrayStock
  array.forEach((element, index) => {
    // Pour chaque produit de arrayStock, on crée une ligne correspondante
<<<<<<< Updated upstream
    li += `<li>${element.name} Prix d'achat HT : ${
      element.buyingPriceHT
    } Prix de vente HT : ${element.sellingPriceHT} Marge : ${
      element.margeHT
    } Prix TTC : ${element.priceTTC} ${
      element.type == "boisson-alcoolise" ? "🔞" : ""
    } ${
      element.type == "boisson-alcoolise" ? `Degrès : ${element.degres}` : ""
    } Stock : ${
      element.stock
    } <button class="deleteBtn">❌</button> <button class="editBtn">✏️</button></li>`;
    // Fin de boucle du tableau
  });
=======
    li += `<li class="liProduct">${
      element.name
    }  \u00a0 ‖ \u00a0   Prix d'achat HT : ${
      element.buyingPriceHT
    }   \u00a0 ‖ \u00a0  Prix de vente HT : ${
      element.sellingPriceHT
    }   \u00a0 ‖ \u00a0  Marge : ${
      element.margeHT
    }   \u00a0 ‖ \u00a0  Prix TTC : ${element.priceTTC}  \u00a0 ‖ \u00a0   ${
      element.type == "boisson-alcoolise" ? "🔞" : ""
    }   \u00a0 ‖ \u00a0  ${
      element.type == "boisson-alcoolise" ? `Degrès : ${element.degres}` : ""
    }   \u00a0 ‖ \u00a0  Stock : <input type="number" name="stock" min="0" class=${
      element.stock > 5 ? "high" : "low"
    } value="${
      element.stock
    }"/> <button class="deleteBtn">❌</button> <button class="editBtn">✏️</button>
    </li>`;

    // Fin de boucle du tableau
  });

>>>>>>> Stashed changes
  // On affiche li dans ulContainer
  ulContainer.innerHTML = li;

  // Je récupère tout mes boutons supprimer & edit qui ont été crée juste au dessus
  let allDeleteButton = document.querySelectorAll(".deleteBtn");
  let allEditButton = document.querySelectorAll(".editBtn");
  // On commence la boucle des boutons
  allDeleteButton.forEach((element, index) => {
    // Pour chaque bouton je déclenche un event qui:
    element.addEventListener("click", () => {
      // Supprimer à l'intérieur du tableau arrayStock l'index selectionné au moment du click
      supprimer(index);

      // On raffraichit le composant displayProduct
      displayProduct(arrayStock, "all");
    });
  });
  // On commence la boucle des boutons
  allEditButton.forEach((element, li) => {
    // Pour chaque bouton je déclenche un event qui:
    element.addEventListener("click", () => {
      // Modifier à l'intérieur du tableau arrayStock l'index selectionné au moment du click
      modifier(li);

      // On raffraichit le composant displayProduct
      displayProduct(arrayStock, "all");
    });
  });
}

//FONCTION MODIFIER
function modifier(li) {
  //CRÉATION D'UN INPUT TEXT AVEC UNE CLASSE updateInput À L'INTÉRIEUR DE LA LISTE
<<<<<<< Updated upstream
  li.innerHTML = `<input type="text" value=${li.innerText} class="nameEdit"/>`;
  let nameEdit = document.querySelector(".nameEdit");
=======
  li[
    liIndex
  ].innerHTML = `<input type="text" value=${arrayStock[liIndex].name} class="nameEdit"/> <input type="text" value=${arrayStock[liIndex].stock} class="stockEdit"/> <input type="text" value=${arrayStock[liIndex].buyingPriceHT} class="buyingPriceHTEdit"/> <input type="text" value=${arrayStock[liIndex].sellingPriceHT} class="sellingPriceHTEdit"/> <select name="type" class="typeEdit">
  <option value=${arrayStock[liIndex].type}>Choisissez un type de boisson</option>
  <option value="boisson-alcoolise">Boisson alcoolisée</option>
  <option value="boisson-non-alcoolise">
    Boisson non alcoolisée
  </option>
</select> <input type="text" value=${arrayStock[liIndex].degres} class="degresEdit"/>`;
  let nameEdit = document.querySelector(".nameEdit");
  let stockEdit = document.querySelector(".stockEdit");
  let buyingPriceHTEdit = document.querySelector(".buyingPriceHTEdit");
  let sellingPriceHTEdit = document.querySelector(".sellingPriceHTEdit");
  let typeEdit = document.querySelector(".typeEdit");
  let degresEdit = document.querySelector(".degresEdit");

>>>>>>> Stashed changes
  let validerBtn = document.createElement("button");
  validerBtn.classList.add("Valider");

  li.appendChild(validerBtn);

  validerBtn.addEventListener("click", function () {
<<<<<<< Updated upstream
    li.innerText = nameEdit.value;
  });

  //EVENTLISTENER SUR updateInput TEXT
  nameEdit.addEventListener("keydown", function (eventInfo) {
    if (eventInfo.key == "Enter") {
      //updateInput REMPLIE PAR USER REMPLACE LA BALISE INPUT
      li.innerText = nameEdit.value;
      //REPLACEMENT DES BOUTONS DELETE ET EDIT
      li.appendChild(editBtn);
      li.appendChild(deleteBtn);
    }
=======
    arrayStock[liIndex].name = nameEdit.value;
    arrayStock[liIndex].stock = stockEdit.value;
    arrayStock[liIndex].buyingPriceHT = buyingPriceHTEdit.value;
    arrayStock[liIndex].sellingPriceHT = sellingPriceHTEdit.value;
    arrayStock[liIndex].type = typeEdit.value;
    arrayStock[liIndex].degres = degresEdit.value;
    localStorage.setItem("keyStock", JSON.stringify(arrayStock));
    displayProduct(arrayStock);
>>>>>>> Stashed changes
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
