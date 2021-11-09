import { Card } from "../scripts/Card.js";
import FormValidator from "../scripts/FormValidator.js";
import Section from "../scripts/Section.js";
import {
  editButton,
  profileModal,
  addCardButton,
  addCardModal,
  initCards,
  formConfig
} from "../scripts/Utils.js";
import ModalWithImage from "../scripts/ModalWithImage.js";
import ModalWithForm from "../scripts/ModalWithForm.js";
import UserInfo from "../scripts/UserInfo.js";
import "./index.css";

// --- ModalWithImage instance --- //
const bigImageModal = new ModalWithImage(".modal_type_big-image");
bigImageModal.setEventListeners();

// +++++ Card Section +++++ //
// --- Create new card --- //
const createCard = (newCard) => {
  const card = new Card(newCard, ".card__template", (event) => {
    // --- Open 'big image' modal method --- //
    bigImageModal.open(event);
  });
  const renderedCard = card.generateCard();
  return renderedCard;
}
// --- 'Cards' section creation method --- //
const cardsSection = new Section(
  {
    // --- Initial cards from file --- ///
    items: initCards,
    // --- Itterating cards from recived list --- //
    renderer: (data) => {
      cardsSection.addCard(createCard(data));
    }
  },
  // --- Container selector, where the cards will be added --- //
  ".cards__grid",
);
// --- Render cards from initCards list --- //
cardsSection.renderCards();

// +++++ 'User Info' +++++ //
// --- UserInfo instance --- //
const userInfoValues = new UserInfo(".profile__title", ".profile__subtitle");
userInfoValues.setUserInfo({ name: "Artiom Shlyusberg", job: "Junior Web Dev" });

// +++++ Forms +++++ //
// === 'Edit profile' form === //
// --- Form creation method --- //
const editProfileForm = new ModalWithForm(".modal_type_edit", (data) => {
  userInfoValues.setUserInfo(editProfileForm.getInputValues());
  editProfileForm.close();
});
// --- Set event listeners for the form --- //
editProfileForm.setEventListeners();
// --- Set values and open the form --- //
editButton.addEventListener("click", () => {
  editProfileForm.setInputValues(userInfoValues.getUserInfo())
  profileFormValidation.resetValidation();
  editProfileForm.open();
});
// === 'Add card' form === //
// --- Form creation method --- //
const addCardForm = new ModalWithForm(".modal_type_add-card", () => {
  var newCard = addCardForm.getInputValues();
  console.log(newCard);
  cardsSection.prependItem(createCard(newCard));
  addCardForm.close();
});
// --- Set event listeners for 'add card' modal --- //
addCardForm.setEventListeners();
// --- Open the form --- //
addCardButton.addEventListener("click", () => {
  addCardFormValidation.resetValidation();
  addCardForm.open();
});

// +++++ Validation +++++ //
// --- 'Edit profile' form validation adding --- //
const profileFormValidation = new FormValidator(formConfig, profileModal);
profileFormValidation.enableValidation();
// --- 'Add card' form validation adding --- //
const addCardFormValidation = new FormValidator(formConfig, addCardModal);
addCardFormValidation.enableValidation();