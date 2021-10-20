import { Card } from './Card.js';
import { openModal, closeModal } from './Modal.js';
import { FormValidator } from './FormValidator.js';
import { initCards } from './InitCards.js'

import{
  /* 'Edit' consts import */
  editButton,
  profileModal,
  profileName,
  profileJob,
  nameInput,
  jobInput,
  editCloseButton,
  /* 'Add-Card' consts import */
  openAddCardModal,
  addCardModal,
  cardInputTitle,
  cardInputLink,
  addCardCloseButton,
  addCardForm,
  addCardFormTitel,
  addCardFormLink,
  /* Big image consts */
  cardBigModal,
  cardBigModalCloseIcon,
  /* General consts */
  formConfig,
  cardList
}from './Utils.js';

// ===== Card manipulation functions ===== //
// --- Creating new card function --- //
function createNewCard(name, link, cardSelector) {
  const newCard = new Card(name, link, cardSelector);
  const card = newCard.createCard();

  return card;
}
// --- Submit card info for creation --- //
function submitNewCard(e){
  e.preventDefault();
  const name = addCardFormTitel.value;
  const link = addCardFormLink.value;
  cardList.append(createNewCard(name, link, ".card__template"));
  closeModal(addCardModal);
}
// --- Initial pre-entred cards array --- //
initCards.forEach((card) => { cardList
  .append(createNewCard(card.name, card.link, ".card__template"));
});

// ===== Event listeners ===== //
// +++++ 'Edit' Modal +++++ //
// --- Open up with pre-entered info --- //
editButton.addEventListener('click', () => {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  openModal(profileModal);
});
// --- Input submition --- // 
profileModal.addEventListener('submit', (submit) => {
  submit.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closeModal(profileModal);
});
// --- Close on 'X' button press --- //
editCloseButton.addEventListener('click', () => {closeModal(profileModal);});

// +++++ 'Add-Card' Modal +++++ //
// --- Open on add button press --- //
openAddCardModal.addEventListener('click', () => {openModal(addCardModal);});
// --- Input submition --- // 
addCardModal.addEventListener('submit', submitNewCard);
// --- Close on 'X' button press --- //
addCardCloseButton.addEventListener('click', () => {closeModal(addCardModal);});

// +++++ 'Big-Image' Modal +++++ //
cardBigModalCloseIcon.addEventListener('click', () => {closeModal(cardBigModal);});

// ===== Enable validation ===== //
// --- Creating list/array of forms --- //
const formList = Array.from(
  document.querySelectorAll(formConfig.formSelector)
);
// --- Adding validation for any form on page --- //
formList.forEach((form) => {
  const validateForm = new FormValidator(formConfig, form);
  validateForm.enableValidation()
})
