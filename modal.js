// Navigation responsive
function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// Éléments DOM
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");

// Ouverture modal au click
modalBtn.forEach(btn => btn.addEventListener("click", launchModal));

// Fonction ouverture modal
function launchModal() {
  modalbg.style.display = "block";
}

// Fermeture modal
const closeBtn = document.querySelector(".close");
closeBtn.addEventListener("click", closeModal);

document.addEventListener("click", function (e) {
  const element = e.target.closest(".close2");
  if (element) {
    closeModal();
  }
});

// Fonction fermeture modal
function closeModal() {
  modalbg.style.display = "none";
}

// Validation formulaire
function validateForm() {
  // Réinitialiser messages erreur
  resetErrorMessages();

  // Valider prénom
  validateName("first", "first-error");

  // Valider nom
  validateName("last", "last-error");

  // Valider email
  validateEmail("email", "email-error");

  // Valider date de naissance
  validateBirthdate("birthdate", "birthdate-error");

  // Valider nombre de concours
  validateQuantity("quantity", "quantity-error");

  // Valider boutons radio
  validateRadio("location", "location-error");

  // Valider checkbox conditions
  validateCheckbox("checkbox1", "checkbox1-error");

  // Vérifier erreurs
  const formIsValid = checkErrors();

  // Afficher message confirmation
  if (formIsValid) {
    showConfirmationMessage();
  }

  return formIsValid;
}

// Réinitialiser messages erreur
function resetErrorMessages() {
  const errorMessages = document.querySelectorAll(".error-message");

  errorMessages.forEach(message => {
    message.textContent = "";
  });
}

// Valider prénom/nom
function validateName(fieldName, errorId) {
  const name = document.getElementById(fieldName).value;

  if (name.length < 2) {
    displayErrorMessage(errorId, "Minimum 2 caractères requis");
  }
}

// Valider email
function validateEmail(fieldName, errorId) {
  const email = document.getElementById(fieldName).value;
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!regex.test(email)) {
    displayErrorMessage(errorId, "Adresse e-mail invalide");
  }
}

// Valider nombre de concours
function validateQuantity(fieldName, errorId) {
  const quantity = document.getElementById(fieldName).value;

  if (isNaN(quantity) || quantity < 0) {
    displayErrorMessage(errorId, "Valeur numérique positive requise");
  }
}

// Valider boutons radio
function validateRadio(fieldName, errorId) {
  const radioButtons = document.getElementsByName(fieldName);
  let selected = false;

  radioButtons.forEach(button => {
    if (button.checked) {
      selected = true;
    }
  });

  if (!selected) {
    displayErrorMessage(errorId, "Veuillez sélectionner une option");
  }
}

// Valider checkbox conditions
function validateCheckbox(fieldName, errorId) {
  const checkbox = document.getElementById(fieldName);

  if (!checkbox.checked) {
    displayErrorMessage(errorId, "Vous devez accepter les conditions");
  }
}

// Valider date de naissance
function validateBirthdate(fieldName, errorId) {
  const birthdate = document.getElementById(fieldName).value;

  if (!birthdate) {
    displayErrorMessage(errorId, "Vous devez entrer votre date de naissance");
  }
}

// Afficher message erreur
function displayErrorMessage(errorId, message) {
  const errorElement = document.getElementById(errorId);

  errorElement.textContent = message;
}

// Vérifier erreurs
function checkErrors() {
  const errorMessages = document.querySelectorAll(".error-message");
  let hasErrors = false;

  errorMessages.forEach(message => {
    if (message.textContent !== "") {
      hasErrors = true;
    }
  });

  return !hasErrors;
}

// Afficher message confirmation
function showConfirmationMessage() {
  // Message
  const confirmationMessage = "Merci ! Votre réservation a été reçue.";

  // Récupérer élément modal
  const modalContent = document.querySelector(".modal-body");

  // Créer bouton Fermer
  const closeButton = document.createElement("button");
  closeButton.classList.add("button");
  closeButton.classList.add("close2");
  closeButton.classList.add("centered");
  closeButton.textContent = "Fermer";

  // Ajouter évènement click sur bouton
  closeButton.addEventListener("click", closeModal);

  // Construire HTML
  modalContent.innerHTML = `
    <div class="confirmation-message">${confirmationMessage}</div>
    ${closeButton.outerHTML}  
  `;
}

// Ajouter évènement submit
const form = document.querySelector("form[name='reserve']");
form.addEventListener("submit", function (event) {
  if (!validateForm()) {
    event.preventDefault();
  }
});
