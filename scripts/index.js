import initCards from '../scripts/initCards.js';
import {toggleModal} from '../scripts/utils.js';
// -- 'Edit profile' consts -- //
const editButton = document.querySelector('.profile__edit-button');
const profileModal = document.querySelector('.modal_type_edit')
const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__subtitle');
const nameInput = document.querySelector('.modal__input_type_title');
const jobInput = document.querySelector('.modal__input_type_subtitle');
const editCloseButton = document.querySelector('.modal__close-button_type_edit');
// -- 'Add-card' consts -- //
const cards = document.querySelector('.cards__grid');
const cardTemplate = document.querySelector('#card__template').content;
const cardSelector = cardTemplate.querySelector('.card');
const openAddCardModal = document.querySelector('.profile__add-button');
const addCardCloseButton = document.querySelector('.modal__close-button_type_add-card');
const cardInputTitle = document.querySelector('.modal__input_type_name');
const cardInputLink = document.querySelector('.modal__input_type_link');
const addCardModal = document.querySelector('.modal_type_add-card');
// --- General const --- //
const submitButton = document.querySelector('.modal__submit-button');
// --- 'Big image' consts --- //
const cardBigModal = document.querySelector('.modal_type_big-image');
const cardBigModalFigure = document.querySelector('.modal__image');
const cardBigModalCloseIcon = document.querySelector('.modal__close-button_type_big-image');
// --- Initial cards array adding to page --- //
initCards.slice().forEach((card) => {
  addCard(card.name, card.link);
});
// --- Adding card function --- //
function addCard(name, link) {
  const newCard = createCard(name, link);
  renderCard(newCard);
}
// --- Card creation function --- //
function createCard(name, link) {
  const newCard = cardSelector.cloneNode(true);
  const newCardImg = newCard.querySelector('.card__image');
  newCardImg.alt = name;
  newCardImg.src = link;
  newCard.querySelector('.card__title').textContent = name;

  newCardImg.addEventListener('click', () => {
    const bigImage = cardBigModalFigure.querySelector('.modal__big-image');
    const bigImageCaption = cardBigModalFigure.querySelector('.modal__image-caption');

    bigImage.src = newCardImg.src;
    bigImage.alt = newCardImg.alt;
    bigImageCaption.textContent = newCardImg.alt;

    toggleModal(cardBigModal);
  });

  newCard.querySelector('.card__like-button').addEventListener('click', (event) => {
    event.target.classList.toggle('card__like-button_active');
  });

  newCard.querySelector('.card__delete-button').addEventListener('click', () => {
    newCard.remove();
  });

  return newCard;
}
// --- Card render to page function --- //
function renderCard(newCard) {
  cards.prepend(newCard);
}
// --- Open/close 'Edit' modal on edit button press --- //
editCloseButton.addEventListener('click', () => { toggleModal(profileModal); });
// --- 'Edit' modal open up with pre-entered info --- //
editButton.addEventListener('click', () => {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  toggleModal(profileModal);
});
// --- 'Edit' modal input submition --- // 
profileModal.addEventListener('submit', (submit) => {
  submit.preventDefault();

  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  toggleModal(profileModal);
});
// --- 'Add card' modal all in one event --- //
openAddCardModal.addEventListener('click', () => {
  toggleModal(addCardModal);
});
addCardModal.addEventListener('submit', (submit) => {
  submit.preventDefault();

  addCard(cardInputTitle.value, cardInputLink.value);
  cardInputTitle.value = "";
  cardInputLink.value = "";
  toggleModal(addCardModal);
  submitButton.disabled = true;
});
addCardCloseButton.addEventListener('click', () => {
  toggleModal(addCardModal);
});
// --- 'Big image' ---//
cardBigModalCloseIcon.addEventListener('click', () => toggleModal(cardBigModal));