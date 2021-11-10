// -- 'Edit profile' modal consts -- //
export const editButton = document.querySelector('.profile__edit-button');
export const profileModal = document.forms.profile;
export const nameInput = profileModal.elements.name;
export const jobInput = profileModal.elements.job;
export const editCloseButton = document.querySelector('.modal__close-button_type_edit');
// -- 'Add-card' modal consts -- //
export const addCardButton = document.querySelector('.profile__add-button');
export const addCardModal = document.querySelector('.modal_type_add-card');
export const cardInputTitle = document.querySelector('.modal__input_type_name');
export const cardInputLink = document.querySelector('.modal__input_type_link');
export const addCardCloseButton = document.querySelector('.modal__close-button_type_add-card');
// --- 'Add-Card' form consts --- //
export const addCardForm = document.forms.add;
export const addCardFormTitel = addCardForm.elements.title;
export const addCardFormLink = addCardForm.elements.link;
// --- General const --- //
export const submitButton = document.querySelector('.modal__submit-button');
export const cardList = document.querySelector('.cards__grid');
// --- Big image modal consts --- //
export const cardBigModal = document.querySelector('.modal_type_big-image');
export const cardBigModalImage = document.querySelector('.modal__big-image');
export const cardBigModalText = document.querySelector('.modal__image-caption');
export const cardBigModalCloseIcon = document.querySelector('.modal__close-button_type_big-image');
// --- Form config consts --- //
export const formConfig = {
  formSelector: ".modal__container",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__submit-button",
  inactiveButtonClass: "modal__submit-button_disabled",
  inputErrorClass: "modal__input_error",
  errorMessageClass: "modal__error_visible"
};
// --- initCards consts --- //
export const initCards = [
  {
    name: "Yosemite Valley",
    link: "https://code.s3.yandex.net/web-code/yosemite.jpg"
  },
  {
    name: "Lake Louise",
    link: "https://code.s3.yandex.net/web-code/lake-louise.jpg"
  },
  {
    name: "Bald Mountains",
    link: "https://code.s3.yandex.net/web-code/bald-mountains.jpg"
  },
  {
    name: "Latemar",
    link: "https://code.s3.yandex.net/web-code/latemar.jpg"
  },
  {
    name: "Vanoise National Park",
    link: "https://code.s3.yandex.net/web-code/vanoise.jpg"
  },
  {
    name: "Lago di Braies",
    link: "https://code.s3.yandex.net/web-code/lago.jpg"
  }
];