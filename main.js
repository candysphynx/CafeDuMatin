// Récupération des éléments du HTML
let stockContainer = document.querySelector(".stockContainer");
let addProductContainer = document.querySelector(".addProductContainer");

// Tableau de produit
let arrayStock = [];

// Fonctions
function createProduct(params) {
  let product = new Product();
}

function displayProduct(params) {}

function editProduct(params) {}

function deleteProduct(params) {}

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
  this.buyingPriceHT = buyingPriceHT;
  this.sellingPriceHT = sellingPriceHT;
  this.margeHT = sellingPriceHT - buyingPriceHT;
  this.priceTTC = sellingPriceHT + TVA;
  this.type = type;
  this.degres = degres;
}
