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
  bigImageSelector,
  bigImage,
  bigImageTitle,
  deleteCardSelector,
  apiConfig,
  formConfig,
  nameInput,
  jobInput
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
const profile = new UserInfo(
  profileName, 
  profileJob
);
api
  // --- Get user info method --- //
  .getUserInfo()
  .then((res) => {
    profile.setUserInfo(res.name, res.about);
    userAvatar.src = res.avatar;
    return profile;
  })
  // --- Use user info for creation of new cards and card section --- // 
  .then((profile) => {
    api
      .getCardList()
      .then((data) => {
        // --- On card click handler --- //
        const onCardClick = ( name, link ) => {
          bigImageModal.open(name, link);
        };
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
        // --- New card instance adding --- //
        const newCardInstance = (data) => { 
          const cardInstance = new Card(
            data,
            onCardClick,
            deleteCardHandler,
            likeButtonClickHandler,
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
        (inputs) => {
          api
            .addCard(inputs)
            .then((res) => {
              const cardInstance = newCardInstance(res);
              cardSection.addItem(cardInstance.generateCard(user.id));
              modalResetInputs();
              addNewCardModal.close(modalResetInputs);
            })
            .catch(apiErr)
        }
      );
      addNewCardModal.setEventListeners();
      addCardButton.addEventListener("click", () => {
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
  ({name, job}) => 
  {
    api
      .setUserInfo({name,job})
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
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  editProfileModal.open();
});
// --- Avatar edit modal --- //
const avatarEditModal = new ModalWithForm (
  avatarModalSelector,
  checkForEscPressed,
  ({ "avatarLink":avatar }) => 
  {
    api
      .setUserAvatar({avatar})
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
deleteCardModal.setEventListeners();
// --- Big image modal instance --- //
const bigImageModal = new ModalWithImage(
  bigImageSelector,
  checkForEscPressed,
  bigImage,
  bigImageTitle
);
bigImageModal.setEventListeners();
