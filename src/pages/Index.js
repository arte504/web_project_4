import { api } from "../components/scripts/Api.js";
import { Card } from "../components/scripts/Card.js";
import FormValidator from "../components/scripts/FormValidator.js";
import Section from "../components/scripts/Section.js";
import {
  editButton,
  profileModal,
  addCardButton,
  addCardModal,
  avatarModal,
  avatarEditButton,
  formConfig
} from "../components/utils/constants.js";
import ModalWithImage from "../components/scripts/ModalWithImage.js";
import ModalWithForm from "../components/scripts/ModalWithForm.js";
import ModalDeleteConfirmation from "../components/scripts/ModalDeleteConfirmation.js";
import UserInfo from "../components/scripts/UserInfo.js";
import "./index.css";

const api = new Api({
  baseUrl: 'https://around.nomoreparties.co/v1/group-2',
  headers: { 
      authorization: "709a0d9d-db06-4890-a594-b07e7309a353",
      'Content-Type': 'application/json' 
  }
});

// --- Big image modal instance --- //
const bigImageModal = new ModalWithImage(".modal_type_big-image");

// --- Delete card modal instance and events --- //
const deleteCardModal = new ModalWithForm(".modal_type_delete-card");
deleteCardModal.setEventListeners();

// +++++ Card Section +++++ //
// --- Card render function --- //
function createCard(data) {
  const card = new Card({
    data: data,
    user: userId,
    cardSelector: ".cards__grid",
    handleCardClick: (evt) => {
      // --- Open big image modal --- //
      evt.preventDefault();
      const target = evt.target;
      const link = target.src;
      const name = target.alt;
      bigImageModal.open(link, name);
      bigImageModal.setEventListeners();
    },
    handleDeleteCard: (cardId) => {
      ModalDeleteConfirmation.open();
      ModalDeleteConfirmation.setAction(() =>
        api.deleteCard(cardId)
          .then((res) => {
            card.deleteCard();
            ModalDeleteConfirmation.close();
          })
          .catch((err) => console.log(err))
      );
    },
    handleLikes: (cardId) => {
      const isLiked = card.isLiked();
      if (isLiked) {
        api.removeLike(cardId)
          .then((res) => {
            card.updateLikes(res.likes);
          })
          .catch((err) => console.log(err))
      } 
      else {
        api.addLike(cardId)
          .then((res) => {
            card.updateLikes(res.likes);
          })
          .catch((err) => console.log(err))
      }
    },
  });
  // --- Clone from template --- //
  const cardsItem = card.generateCard();
  return cardsItem;
}

const cardsSection = new Section(
  (item) => {
    cardsSection.addItem(createCard(item));
  },
  ".cards__grid"
);

// +++++ 'User Info' +++++ //
// --- UserInfo instance --- //
const userInfoValues = new UserInfo({
  name: ".profile__title",
  about: ".profile__subtitle",
  avatar: ".profile__image",
});
// --- UserInfo init --- //
api.getUserInfo()
  .then((res) => {
    userInfoValues.setUserInfo(res);
    userId = res._id;
    userInfoValues.setUserAvatar(res.avatar);
  })
  .catch((err) => console.log(err));

// +++++ Card list +++++ //
// --- Cards init --- //
api.getInitialCards().then((res) => {
  cardsSection.renderItems(res);
})
.catch((err) => console.log(err));

// +++++ Forms +++++ //
// === 'Edit profile' form === //
// --- Form creation method --- //
const editProfileForm = new ModalWithForm(".modal_type_edit", () => {
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

// === 'Avatar' edit form === //
const avatarForm = new ModalWithForm(".modal_type_avatar", () => {
  const newAvatar = avatarForm.getInputValues();
  setUserAvatar(newAvatar);
  avatarForm.close();
});

// --- Set event lesteners to the form --- //
avatarForm.setEventListeners();

avatarEditButton.addEventListener("click", () => {
  avatarFormValidation.resetValidation();
  avatarForm.open();
});

// === 'Add card' form === //
// --- Form creation method --- //
const addCardForm = new ModalWithForm(".modal_type_add-card", () => {
  const newCard = addCardForm.getInputValues();
  cardsSection.addItem(generateCard(newCard));
  addCardForm.close();
});

// --- Set event listeners for 'add card' modal --- //
addCardForm.setEventListeners();

// --- Open 'Add Card' form --- //
addCardButton.addEventListener("click", () => {
  addCardFormValidation.resetValidation();
  addCardForm.open();
});

// +++++ Validation +++++ //
// --- 'Edit profile' form validation adding --- //
const profileFormValidation = new FormValidator(formConfig, profileModal);
profileFormValidation.enableValidation();

// --- 'Avatar' form validation adding --- //
const avatarFormValidation = new FormValidator(formConfig, avatarModal);
avatarFormValidation.enableValidation();

// --- 'Add card' form validation adding --- //
const addCardFormValidation = new FormValidator(formConfig, addCardModal);
addCardFormValidation.enableValidation();

// --- Store user ID --- //
let userId;