// --- 'Edit profile' modal consts --- //
export const editButton = document.querySelector('.profile__edit-button');
export const profileModal = document.forms.profile;
export const profileName = document.querySelector('.profile__title');
export const nameInput = profileModal.elements.name;
export const profileJob = document.querySelector('.profile__subtitle');
export const jobInput = profileModal.elements.job;
export const editCloseButton = document.querySelector('.modal__close-button_type_edit');
// --- 'Avatar" modal consts --- //
export const avatarImage = document.querySelector('.profile__image');
export const avatarEditButton = document.querySelector('.profile__image-edit');
export const avatarModal = document.forms.avatar;
export const avatarModalInput = avatarModal.elements.link;
export const avatarCloseButton = document.querySelector('.modal__close-button_type_avatar')
// --- 'Add-card' modal consts --- //
export const addCardButton = document.querySelector('.profile__add-button');
export const addCardModal = document.forms.add;
export const cardInputTitle = addCardForm.elements.title;;
export const cardInputLink = addCardForm.elements.link;;
export const addCardCloseButton = document.querySelector('.modal__close-button_type_add-card');
// --- General const --- //
export const submitButton = document.querySelector('.modal__submit-button');
export const cardList = document.querySelector('.cards__grid');
// --- Big image modal consts --- //
export const cardBigModal = document.querySelector('.modal_type_big-image');
export const cardBigModalImage = document.querySelector('.modal__big-image');
export const cardBigModalText = document.querySelector('.modal__image-caption');
export const cardBigModalCloseIcon = document.querySelector('.modal__close-button_type_big-image');
// --- 'Delete card' modal consts --- //
export const deleteCardModal = document.querySelector(".modal_type_delete-card");
// --- Form config consts --- //
export const formConfig = {
  formSelector: ".modal__container",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__submit-button",
  inactiveButtonClass: "modal__submit-button_disabled",
  inputErrorClass: "modal__input_error",
  errorMessageClass: "modal__error_visible"
};
