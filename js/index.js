import Card from './card.js';
import initCards from './initCards.js';
import {togglePopup, saveButtonDisabled} from './utils.js';

// ---- Consts  ---- //
const defaultConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: '.popup__error_visible'
};

// ---- 'Add card' container ---- //
const addCardModalWindow = document.querySelector('.popup_type_add-card');
// ---- 'Edit profile' container ---- //
const editProfileModalWindow = document.querySelector('.popup_type_edit-profile');

// ---- Input fields ---- //
const inputName = document.querySelector('.popup__input_type_name');
const inputAboutme = document.querySelector('.popup__input_type_about');
const profileName = document.querySelector('.profile__name');
const profileAboutme = document.querySelector('.profile__about-me');
const inputTitle = document.querySelector('.popup__input_type_card-title');
const inputLink = document.querySelector('.popup__input_type_url'); 

// ---- 'Edit profile' buttons ---- //
const editButton = document.querySelector('.profile__edit-button');
const closeProfileButton = editProfileModalWindow.querySelector('.popup__close-button');
// ---- 'Add card' buttons ---- //
const addButton = document.querySelector('.profile__post-button');
const closeCardButton = addCardModalWindow.querySelector('.popup__close-button');

// ---- Card list ---- //
const list = document.querySelector('.gallery__grid');

// ---- Functions ---- //
function fillDefaultEditProfileValues() {
  if (!editProfileModalWindow.classList.contains("popup_opened")) {
    inputName.value = profileName.textContent;
    inputAboutme.value = profileAboutme.textContent;
  }  
}

function fillDefaultCardModalValues() {
  if(!addCardModalWindow.classList.contains("popup_opened")) {
    newPlace.reset();
    }    
}

// ---- 'Profile' filling function ---- //
function fillProfileValues(event) {
  event.preventDefault();       
  profileName.textContent = inputName.value;
  profileAboutme.textContent = inputAboutme.value;        
  togglePopup(editProfileModalWindow);
}

// ---- 'Card' filling function ---- //
function fillCardValues(event) {
  event.preventDefault();
  const tempObject = {};
  tempObject.name = inputTitle.value;
  tempObject.link = inputLink.value;

  list.prepend(new Card(tempObject, '.card-template').renderNewCard());
  togglePopup(addCardModalWindow);
}

// ---- Cards initialization function ---- //
initCards.forEach((data) => 
list.prepend(new Card(data, '.card-template').renderNewCard()));

// ---- Edit profile modal events listeners ---- //
editButton.addEventListener('click', ()=> {  
  fillDefaultEditProfileValues();
  togglePopup(editProfileModalWindow);
});

closeProfileButton.addEventListener('click', ()=> {
  fillDefaultEditProfileValues();
  togglePopup(editProfileModalWindow);
});

editProfileModalWindow.addEventListener('submit', fillProfileValues);

// ---- Add card modal events listeners ---- //
addButton.addEventListener('click', () => {
  fillDefaultCardModalValues();
  saveButtonDisabled(addCardModalWindow);
  togglePopup(addCardModalWindow);
});

closeCardButton.addEventListener('click', ()=> {
  fillDefaultCardModalValues();
  togglePopup(addCardModalWindow);
});

addCardModalWindow.addEventListener('submit', fillCardValues);
