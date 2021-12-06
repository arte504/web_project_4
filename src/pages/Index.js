import Api from "../components/scripts/Api.js";
import { Card } from "../components/scripts/Card.js";
import FormValidator from "../components/scripts/FormValidator.js";
import Section from "../components/scripts/Section.js";
import {
  editButton,
  profileModal,
  addCardButton,
  addCardModal,
  formConfig
} from "../components/utils/constants.js";
import ModalWithImage from "../components/scripts/ModalWithImage.js";
import ModalWithForm from "../components/scripts/ModalWithForm.js";
import ModalDeleteConfirmation from "../components/scripts/ModalDeleteConfirmation.js";
import UserInfo from "../components/scripts/UserInfo.js";
import "./index.css";

const api = new Api({
  baseUrl: 'https://around.nomoreparties.co/v1/group-12',
  headers: {
    authorization: '709a0d9d-db06-4890-a594-b07e7309a353',
    'Content-Type': 'application/json'
  }
});

// +++++ Card Section +++++ //
const cardSelector = '#card';
// --- Card render function --- //
function renderCard (initCard, user, selector) {
  return new Card({
    cardData: initCard,
    isLiked: (listLikes) => {
      return (listLikes.find(item => item._id === user._id) !== undefined);
    },
    isOwner: (owner) => {
      return (user._id === owner);
    },
    onCardClick: (cardInfo) => {
      bigImageModal.open(cardInfo);
    },
    deleteCardHandler: (id, card) => {
      const deleteConfirm = new ModalDeleteConfirmation('.delete-card', () => {
        api.removeCard(id)
          .then(res => card.removeCard())
          .catch((err) => console.log(err))
          .finally(function () {
            deleteConfirm.close();
          });
      });
      deleteConfirm.open();
    },
    likeHandler: (cardInfo) => {
      if (cardInfo._likes.find(item => item._id === user._id) !== undefined) {
        api.removeLike(cardInfo)
          .then(res => {
            cardInfo._likes = res.likes;
            cardInfo.setLikes(res.likes.length);
          });
      } 
      else {
        api.addLike(cardInfo)
          .then(res => {
            cardInfo._likes = res.likes;
            cardInfo.setLikes(res.likes.length);
        });
      }
    }
  },
  cardSelector);
}

api.getAppInfo()
  .then(([initialCards, userInfo]) => {
    const cardsSection = new Section({
      data: initialCards,
      renderer: function (initialCard) {
        const card = renderCard(initialCard, userInfo, cardSelector);
        cardsSection.addItem(card.generateCard());
      }
    }, '.cards__grid');
    cardsSection.renderItems();

    user.setUserInfo({
      name: userInfo.name,
      job: userInfo.about
    });

    user.setUserAvatar({
      avatar: userInfo.avatar
    });

    const modalAddCard = new ModalWithForm('.add-card', (cardData) => {
      api.addCard({ name: cardData.name, link: cardData.link })
        .then((res) => {
          const newCard = renderCard(res, userInfo, cardSelector);
          cardsSection.addItem(newCard.generateCard());
        })
        .catch((err) => console.log(err))
        .finally(function () {
          modalAddCard.close();
        });
    });

    addCardButton.addEventListener('click', () => {
      addCardFormValidation.resetValidation();
      modalAddCard.open();
    });
  })
  .catch((err) => console.log(err));

// --- ModalWithImage instance --- //
const bigImageModal = new ModalWithImage(".modal_type_big-image");
bigImageModal.setEventListeners();

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
  const newCard = addCardForm.getInputValues();
  cardsSection.prependItem(createCard(newCard));
  addCardForm.close();
});
// --- Set event listeners for 'add card' modal --- //
addCardForm.setEventListeners();

// +++++ Validation +++++ //
// --- 'Edit profile' form validation adding --- //
const profileFormValidation = new FormValidator(formConfig, profileModal);
profileFormValidation.enableValidation();
// --- 'Add card' form validation adding --- //
const addCardFormValidation = new FormValidator(formConfig, addCardModal);
addCardFormValidation.enableValidation();