let editBtn = document.querySelector(".editBtn");
//editBtn.innerText = "MODIFIER"
//stockContainer.appendChild(editBtn)

let deleteBtn = document.querySelector(".deleteBtn");
//deleteBtn.innerText = "SUPPRIMER"
//stockContainer.appendChild(deleteBtn)

let ulContainer = document.querySelector(".ulContainer");
// POUR RAJOUTER UN PRODUIT CRÉÉ À L'UL DU STOCKCONTAINER
let li = document.createElement("li");

//FonctionConstructeur POUR LES PRODUITS CRÉÉS PUIS AJOUTÉS AU STOCK

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

//ECOUTER D'ÉVÈNEMENT SUR LE BOUTON MODIFIER
editBtn.addEventListener("click", function () {
  modifier();
});

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

//FONCTION MODIFIER
function modifier(li) {
  //CRÉATION D'UN INPUT TEXT AVEC UNE CLASSE updateInput À L'INTÉRIEUR DE LA LISTE
  // li.innerHTML = `<input type="text" value=${li.innerText} class="nameEdit"/>`;
  // let nameEdit = document.getElementsByClassName(".spanName");
  // let buyingPriceEdit = document.getElementsByClassName(".spanBuyingPrice");
  // let sellingPriceEdit = document.getElementsByClassName(".spanSellingPrice");
  // let typeEdit = document.getElementsByClassName(".spanTypeBoisson");
  // let degresEdit = document.getElementsByClassName(".spanDegres");
  // let validerBtn = document.createElement("button");
  // validerBtn.classList.add("Valider");
  // li.appendChild(validerBtn);
  // validerBtn.addEventListener("click", function () {
  //   nameEdit.innerText = nameEdit.value;
  //   buyingPriceEdit.innerText = buyingPriceEdit.value;
  //   sellingPriceEdit.innerText = sellingPriceEdit.value;
  //   typeEdit.innerText = typeEdit.value;
  //   degresEdit.innerText = degresEdit.value;
  // });
  // //EVENTLISTENER SUR updateInput TEXT
  // nameEdit.addEventListener("keydown", function (eventInfo) {
  //   if (eventInfo.key == "Enter") {
  //     //updateInput REMPLIE PAR USER REMPLACE LA BALISE INPUT
  //     nameEdit.innerText = nameEdit.value;
  //     buyingPriceEdit.innerText = buyingPriceEdit.value;
  //     sellingPriceEdit.innerText = sellingPriceEdit.value;
  //     typeEdit.innerText = typeEdit.value;
  //     degresEdit.innerText = degresEdit.value;
  //     //REPLACEMENT DES BOUTONS DELETE ET EDIT
  //     li.appendChild(editBtn);
  //     li.appendChild(deleteBtn);
  //   }
  // });
  // On raffraichit le composant displayProduct
  // displayProduct(arrayStock, "all");
}
