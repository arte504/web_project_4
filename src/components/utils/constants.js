// --- 'Edit profile' modal consts --- //
export const editButton = document.querySelector('.profile__edit-button');
export const profileModal = document.querySelector('.modal_type_edit');
export const profileName = document.querySelector('.profile__title');
export const nameInput = document.querySelector('.modal__input_type_title');
export const profileJob = document.querySelector('.profile__subtitle');
export const jobInput = document.querySelector('.modal__input_type_subtitle');
export const editCloseButton = document.querySelector('.modal__close-button_type_edit');
// --- 'Avatar" modal consts --- //
export const userAvatar = document.querySelector('.profile__image');
export const avatarEditButton = document.querySelector('.profile__image-overlay');
export const avatarModal = document.querySelector('.modal_type_avatar');
export const avatarModalInput = avatarModal.querySelector('.modal__input_type_avatar');
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
export const cardTemplate = document.querySelector('#card__template');
// --- Big image modal consts --- //
export const bigImageModal = document.querySelector('.modal_type_big-image');
export const bigImage = bigImageModal.querySelector('.modal__big-image');
export const bigImageTitle = bigImageModal.querySelector('.modal__image-caption');
export const cardBigModalCloseIcon = document.querySelector('.modal__close-button_type_big-image');
// --- 'Delete card' modal consts --- //
export const deleteCard = document.querySelector('.modal_type_delete-card');
// --- Selectors --- //
export const profileModalSelector = '.modal_type_edit';
export const avatarModalSelector = '.modal_type_avatar';
export const addCardModalSelector = '.modal_type_add-card';
export const deleteCardSelector = '.modal_type_delete-card';
export const bigImageSelector = '.modal_type_big-image';
export const cardListSelector = '.cards__grid'
// --- Form config consts --- //
export const formConfig = {
  formSelector: ".modal__container",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__submit-button",
  inactiveButtonClass: "modal__submit-button_disabled",
  inputErrorClass: "modal__input_error",
  errorMessageClass: "modal__error_visible"
};
// --- API const --- //
export const apiConfig = {
  baseUrl: "https://around.nomoreparties.co/v1/group-12",
  headers: 
  {
    authorization: "709a0d9d-db06-4890-a594-b07e7309a353",
    'Content-Type': 'application/json' 
  },
};