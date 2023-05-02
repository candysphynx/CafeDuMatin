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
}

function editProduct(params) {
  // Développé par Héloïse
}

function deleteProduct(params) {
  // Développé par Héloïse
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
