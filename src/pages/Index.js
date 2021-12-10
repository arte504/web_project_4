import "./index.css";
import FormValidator from "../components/scripts/FormValidator.js";
import Card from "../components/scripts/Card.js";
import ModalWithImage from "../components/scripts/ModalWithImage.js";
import ModalWithForm from "../components/scripts/ModalWithForm.js";
import Api from "../components/scripts/Api.js"
import Section from "../components/scripts/Section.js";
import UserInfo from "../components/scripts/UserInfo.js";
import {
  profileName,
  profileJob,
  editButton,
  cardListSelector,
  profileModal,
  profileModalSelector,
  cardTemplate,
  addCardButton,
  addCardModal,
  addCardModalSelector,
  cardInputTitle,
  cardInputLink,
  avatarModal,
  avatarModalSelector,
  avatarModalInput,
  userAvatar,
  avatarEditButton,
  bigImageModal,
  bigImageSelector,
  bigImage,
  bigImageTitle,
  deleteCardSelector,
  apiConfig,
  formConfig
} from "../components/utils/constants.js";

// ===== Modals ===== //
// --- 'Esc' check --- //
const checkForEscPressed = (key) => key === "Escape";
// --- Add modal reset input --- //
const modalResetInputs = () => {
  cardInputTitle.value = "";
  cardInputLink.value = "";
}

// ===== Validation ===== //
// --- 'Edit profile' form validation --- //
const profileFormValidation = new FormValidator(formConfig, profileModal);
profileFormValidation.enableValidation();
// --- 'Avatar' form validation --- //
const avatarFormValidation = new FormValidator(formConfig, avatarModal);
avatarFormValidation.enableValidation();
// --- 'Add card' form validation --- //
const addCardFormValidation = new FormValidator(formConfig, addCardModal);
addCardFormValidation.enableValidation();

// ===== API & Card ===== //
// --- API error handler --- // 
const apiErr = (err) => console.log(err);
// --- Setting the default fetching method --- //
const api = new Api(apiConfig);
// --- Set what 'profile' will contains --- //
const profile = new UserInfo({
  name: '.profile__title', 
  job: '.profile__subtitle', 
  avatar: '.profile__image'
});
api
  // --- Get user info method --- //
  .getUserInfo()
  .then((res) => {
    profile.setUserInfo(res)
    return profile;
  })
  // --- Use user info for creation of new cards and card section --- // 
  .then((profile) => {
    api
      .getCardList()
      .then((data) => {
        const userInfo = profile.getUserInfo();
        // --- Delete card button handler --- //
        const deleteCardHandler = (card) => {
          deleteCardModal.setInputValues(card);
          deleteCardModal.open();
        }
        // --- Like button click handler --- //
        const likeButtonClickHandler = (card) => {
          if(card.isLiked()) 
          {
            api
              .unlikeCard(card.getCardId())
              .then((data) => {
                card.updateCard(data, userInfo);
              })
              .catch(apiErr);
          }
          else 
          {
            api
              .likeCard(card.getCardId(), profile.getUserInfo())
              .then((data) => {
                card.updateCard(data, userInfo);
              })
              .catch(apiErr);
          }
        };
        // --- On card click handler --- //
        const onCardClick = (name, link) => {
          bigImageModal.open(
          {
            url: name,
            text: link
          });
        };
        // --- New card instance adding --- //
        const newCardInstance = (data) => { 
          const cardInstance = new Card(
            {
              data,
              onCardClick,
              deleteCardHandler,
              likeButtonClickHandler
            },
            cardTemplate
          );
          return cardInstance;
      };

      const cardSection = new Section (
        {
          items: data,
          renderer: (item) => {
            const cardInstance = newCardInstance(item);
            cardSection.addItem(cardInstance.generateCard(profile.id))
          },
        },
        cardListSelector
      );
      cardSection.renderItems();

      const addNewCardModal = new ModalWithForm (
        addCardModalSelector,
        checkForEscPressed,
        ({ cardInputTitle: name, cardInputLink: link }) => {
          api
            .addCard({name, link})
            .then((data) => {
              const cardInstance = newCardInstance(data);
              cardSection.addItem(cardInstance.generateCard(user.id));
              modalResetInputs();
              addNewCardModal.close(modalResetInputs);
            })
            .catch(apiErr);
        }
      );

      addNewCardModal.setEventListeners();
      deleteCardModal.setEventListeners();

      addCardButton.addEventListener("click", () => {
        addCardFormValidation.resetValidation();
        addNewCardModal.open();
      });
    })
    .catch(apiErr);
})
.catch(apiErr);

// ===== 'Edit' profile ===== //
// --- Edit profile modal --- //
const editProfileModal = new ModalWithForm (
  profileModalSelector,
  checkForEscPressed,
  ({"nameInput":name, "jobInput":job}) => 
  {
    api
      .updateUserInfo({name,job})
      .then((res) => {
        profile.setUserInfo(res.avatar);
        editProfileModal.close();
      })
      .catch(apiErr);
  }
)
editProfileModal.setEventListeners();
// --- Edit button handler --- // 
editButton.addEventListener("click" , () => {
  modalResetInputs();
  profileFormValidation.resetValidation();
  editProfileModal.open();
});
// --- Avatar edit modal --- //
const avatarEditModal = new ModalWithForm (
  avatarModalSelector,
  checkForEscPressed,
  ({ avatarModalInput:avatar }) => 
  {
    api
      .updateUserAvatar({avatar})
      .then((data) => {
        profile.setUserInfo(data);
        avatarEditModal.close();
      })
      .catch(apiErr);
  }
);
avatarEditModal.setEventListeners();
// --- Avatar edit button --- //
avatarEditButton.addEventListener("click", () => {
  avatarModalInput.value = "";
  avatarFormValidation.resetValidation();
  avatarEditModal.open();
})

// --- Delete card modal instance and events --- //
const deleteCardModal = new ModalWithForm(
  deleteCardSelector,
  checkForEscPressed,
  (card) => {
    api
      .deleteCard(card.getCardId())
      .then(() =>{
        card.deleteCard();
        deleteCardModal.close();
      })
      .catch(apiErr);
  }
);

// --- Big image modal instance --- //
const imageModal = new ModalWithImage(
  bigImageSelector,
  checkForEscPressed,
  bigImage,
  bigImageTitle
);
imageModal.setEventListeners();
