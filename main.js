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
// Développé par Diogo
arrayStock = [];

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

  //ECOUTER D'ÉVÈNEMENT SUR LE BOUTON MODIFIER
  editBtn.addEventListener("click", function () {
    modifier();
  });
}

//FONCTION MODIFIER
function modifier() {
  let inputAdd = editInput.value;

  //DEMANDE DE REMPLISSAGE
  if (inputAdd.value == "") {
    alert("Veuillez remplir le formulaire avant de valider.");
  }

  //CRÉATION D'UN INPUT TEXT AVEC UNE CLASSE updateInput À L'INTÉRIEUR DE LA LISTE
  li.innerHTML = `<input type="text" value=${li.innerValue} class="updateInput"/>`;

  //CRÉATION D'UN INPUT NUMBER AVEC UNE CLASSE updateInput À L'INTÉRIEUR DE LA LISTE
  //li.innerHTML = `<input type="number" value=${li.innerValue} class="updateInput"/>`;

  //CRÉATION D'UN INPUT DATALIST AVEC UNE CLASSE updateInput À L'INTÉRIEUR DE LA LISTE
  //li.innerHTML = `<input type="datalist" value=${li.innerValue} class="updateInput"/>`;

  //QUERY SUR L'INPUT POUR LE RÉCUPÉRER ET LE STOCKER DANS updateInput
  let updateInput = document.querySelectorAll(".updateInput");

  //EVENTLISTENER SUR updateInput TEXT
  updateInput.addEventListener("keydown", function (eventInfo) {
    if (eventInfo.key == "Enter") {
      //updateInput REMPLIE PAR USER REMPLACE LA BALISE INPUT
      li.innerText = updateInput.value;
      li.innerValue = updateInput.value;

      //REPLACEMENT DES BOUTONS DELETE ET EDIT
      li.appendChild(deleteBtn);
      li.appendChild(editBtn);
    }
  });

  //EVENTLISTENER SUR updateInput NUMBER

  //EVENTLISTENER SUR updateInput DATALIST

  // REMPLACEMENT DE L'ANCIEN ARRAY NON MODIFIÉ PAR CELUI QU'ON VIENT D'ÉDITER
  //render(FonctionConstructeurModifiée);
}

//FONCTION SUPPRIMER
function supprimer() {
  deleteBtn.addEventListener("click", function () {
    if (confirm("Voulez vous supprimez ?")) {
      li.remove();
      //SPLICE arrayStock DU LOCALSTORAGE QUAND LA FONCTION SERA PRÊTE
      // arrayStock.splice(index, 1);
      // localStorage.setItem("keyStock", JSON.stringify(arrayStock));
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
