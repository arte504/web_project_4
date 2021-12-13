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
  avatarModal,
  avatarModalSelector,
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
const handleApiErr = (err) => console.log(err);
// --- Setting the default fetching method --- //
const api = new Api(apiConfig);
// --- Set what 'profile' will contains --- //
const profile = new UserInfo(
  profileName, 
  profileJob,
  userAvatar
);
let userID;
api
  // --- Get user info method --- //
  .getUserInfo()
  .then((res) => {
    profile.setUserInfo(res);
    userID = res._id;
    return profile;
  })
  // --- Use user info for creation of new cards and card section --- // 
  .then(() => {
    api
      .getCardList()
      .then((data) => {
        // --- On card click handler --- //
        const onCardClick = (name, link) => {
          bigImageModal.open(name, link);
        }
        // --- Delete card button handler --- //
        const deleteCardHandler = (data) => {
          deleteCardModal.setInputValues(data);
          deleteCardModal.open();
        }
        // --- Like button click handler --- //
        const likeClickHandler = (card) => {
          if (card.checkIfLiked(userID)) {
            api
              .unlikeCard(card.getCardId())
              .then((data) => {
                card.refreshCard(data, userID);
              })
              .catch(handleApiErr);
          } 
          else {
            api
              .likeCard(card.getCardId())
              .then((data) => {
                card.refreshCard(data, userID);
              })
              .catch(handleApiErr);
          }
        }
        // --- New card instance adding --- //
        const createNewCardInstance = (cardData) => {
          const cardInstance = new Card(
            cardData,
            onCardClick,
            deleteCardHandler,
            likeClickHandler,
            cardTemplate,
            userID
          );
          return cardInstance;
        };

        const cardSection = new Section(
          {
            items: data,
            renderer: (item) => {
              const cardInstance = createNewCardInstance(item);
              cardSection.addItem(cardInstance.generateCard(userID));
            },
          },
          cardListSelector
        );
        cardSection.renderItems();

        const addNewCardModal = new ModalWithForm(
          addCardModalSelector,
          checkForEscPressed,
          ({ titleInput: name, linkInput: link }) => {
            api
              .addCard({ name, link })
              .then((data) => {
                const addNewCardInstance = createNewCardInstance(data);
                cardSection.addItem(
                  addNewCardInstance.generateCard(userID)
                );
                addNewCardModal.close();
              })
              .catch(handleApiErr);
          }
        );
        addNewCardModal.setEventListeners();
        addCardButton.addEventListener("click", () => {
          addNewCardModal.open();
        });
      })
    .catch(handleApiErr);
})
.catch(handleApiErr);

// ===== 'Edit' profile ===== //
// --- Edit profile modal --- //
const editProfileModal = new ModalWithForm (
  profileModalSelector,
  checkForEscPressed,
  ({nameInput: name, jobInput:about}) => 
  {
    api
      .setUserInfo({name,about})
      .then((res) => {
        profile.setUserInfo(res);
        editProfileModal.close();
      })
      .catch(handleApiErr);
  }
)
editProfileModal.setEventListeners();
// --- Edit button handler --- // 
editButton.addEventListener("click" , () => {
  const userData = profile;
  nameInput.value = userData._name;
  jobInput.value = userData._job;
  editProfileModal.open();
});
// --- Avatar edit modal --- //
const avatarEditModal = new ModalWithForm (
  avatarModalSelector,
  checkForEscPressed,
  ({ avatarLinkInput:avatar }) => 
  {
    api
      .setUserAvatar({avatar})
      .then(() => {
        profile.setUserAvatar(avatar);
        avatarEditModal.close();
      })
      .catch(handleApiErr)
  }
);
avatarEditModal.setEventListeners();
// --- Avatar edit button --- //
avatarEditButton.addEventListener("click", () => {
  avatarEditModal.open();
})

// --- Delete card modal instance and events --- //
const deleteCardModal = new ModalWithForm(
  deleteCardSelector,
  checkForEscPressed,
  (card) => {
    api
      .removeCard(card.getCardId())
      .then(() => {
        card.deleteCard();
        deleteCardModal.close();
      })
      .catch(handleApiErr)
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
