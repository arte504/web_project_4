// --- 'Edit profile' modal consts --- //
export const editButton = document.querySelector('.profile__edit-button');
export const profileModal = document.forms.profile;
export const nameInput = profileModal.elements.name;
export const jobInput = profileModal.elements.job;
export const editCloseButton = document.querySelector('.modal__close-button_type_edit');
// --- 'Avatar" modal consts --- //
export const avatarEditButton = document.querySelector('.profile__image-edit');
export const avatarModal = document.querySelector('.modal_type_avatar');
export const avatarModalInput = document.querySelector('.modal__input_type_avatar');
export const avatarCloseButton = document.querySelector('.modal__close-button_type_avatar')
// --- 'Add-card' modal consts --- //
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
