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
let userID;
api
  // --- Get user info method --- //
  .getUserInfo()
  .then((res) => {
    profile.setUserInfo(res.name, res.about);
    userAvatar.src = res.avatar;
    userID = res._id;
    return profile;
  })
  // --- Use user info for creation of new cards and card section --- // 
  .then((profile) => {
    api
      .getCardList()
      .then((data) => {
        // --- On card click handler --- //
        const onCardClick = (name, link) => {
          bigImageModal.open(name, link);
        }
        // --- Delete card button handler --- //
        const deleteCardHandler = (data) => {
          deleteCardModal.open();
          deleteConfirm(data);
        }
        // --- Like button click handler --- //
        const likeClickHandler = (card) => {
          if (card.checkIfLiked(userID)) {
            api
              .unlikeCard(card.getCardId())
              .then((data) => {
                card.refreshCard(data, userID);
              })
              .catch(apiErr);
          } 
          else {
            api
              .likeCard(card.getCardId())
              .then((data) => {
                card.refreshCard(data, userID);
              })
              .catch(apiErr);
          }
        }
        // --- New card instance adding --- //
        const newCardInstance = (cardData) => {
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
              const cardInstance = newCardInstance(item);
              console.log();
              cardSection.addItem(cardInstance.generateCard());
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
                const addNewCardInstance = newCardInstance(data);
                cardSection.addItem(
                  addNewCardInstance.generateCard(profile.id)
                );
                modalResetInputs();
                addNewCardModal.close(modalResetInputs);
              })
              .catch(apiErr);
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
  ({nameInput: name, jobInput:about}) => 
  {
    api
      .setUserInfo({name,about})
      .then(() => {
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
  ({ avatarLinkInput:avatar }) => 
  {
    api
      .setUserAvatar({avatar})
      .then(() => {
        avatarEditModal.close();
      })
      .catch(apiErr)
      .finally(avatarEditModal.close())
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
  deleteConfirm
);
function deleteConfirm(card) {
  addEventListener("submit", () => {
    api
      .removeCard(card.getCardId())
      .then(() => {
        deleteCardModal.close();
      })
      .catch(apiErr)
      .finally(card.deleteCard(),deleteCardModal.close());
  });
}
deleteCardModal.setEventListeners();
// --- Big image modal instance --- //
const bigImageModal = new ModalWithImage(
  bigImageSelector,
  checkForEscPressed,
  bigImage,
  bigImageTitle
);
bigImageModal.setEventListeners();
