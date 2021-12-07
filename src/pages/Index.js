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
  nameInput,
  profileJob,
  jobInput,
  editButton,
  profileModal,
  cardTemplate,
  addCardButton,
  addCardModal,
  avatarModal,
  avatarImage,
  avatarEditButton,
  cardBigModal,
  deleteCard,
  formConfig
} from "../components/utils/constants.js";

// ===== Modals ===== //
// --- Big image modal instance --- //
const bigImage = new ModalWithImage(cardBigModal);
bigImage.setEventListeners();
// --- Delete card modal instance and events --- //
const deleteCardModal = new ModalWithForm({
  modal: deleteCard
});
deleteCardModal.setEventListeners();
// --- UX for modals --- //
function loadingModal(isLoading, modal) {
  if (isLoading) { modal.querySelector(".modal__submit-button").textContent = "Saving..."; } 
  else { modal.querySelector(".modal__submit-button").textContent = "Save"; }
}

// ===== API ===== //
// --- Setting the default fetching url and token --- //
const api = new Api({
  baseUrl: "https://around.nomoreparties.co/v1/group-12",
  headers: 
  {
    authorization: "709a0d9d-db06-4890-a594-b07e7309a353",
    'Content-Type': 'application/json' 
  }
});
// --- GetAppInfo method --- //
api
  .getAppInfo()
  .then( ([cardList, userData]) => {
    // --- 'Profile' info editing --- //
    const profile = new UserInfo(profileName, profileJob, avatarImage);
    profile.setUserInfo(userData);
    // --- New card adding --- //
    const addingNewCard = (data) =>{
      const cardInstance = new Card(data, cardTemplate, userData._id, {
        onCardClick: ({name, link}) => {
          bigImage.open(link, name);
        },
        removeHandler: (cardId) => {
          deleteCardModal.open();
          deleteCardModal.handleRemove(() => {
            api
              .removeCard(cardId)
              .then(() => {
                cardInstance.deleteCardModal();
                deleteCardModal.close();
              })
              .catch(err => console.log(err));
          });
        },
        likeHandler: (cardId) =>{
          const likeToggle = cardInstance.isLiked();
          if(likeToggle) {
            api
              .unlikeCard(cardId)
              .then((count) => {
                cardInstance.unlikeCard();
                cardInstance.showLikes(count.likes.lenght);
              });
          }
          else {
            api
              .likeCard(cardId)
              .then((count) => {
                cardInstance.unlikeCard();
                cardInstance.showLikes(count.likes.lenght);
              })
              .catch((err) => console.log(err));
          }
        }
      });
      return cardInstance;
    };
    // --- Cards section creation --- //
    const cardsList = new Section({
      items: cardList,
      renderer: (data) => {
        cardsList.addItem(addingNewCard(data).generateCard());
      }
    }, 
    '.cards__grid');
    console.log(cardList);
    // --- Render cards --- //
    cardsList.renderer();
    // --- New card adding form --- //
    const addCardForm = new ModalWithForm({
      modal: addCardModal,
      handleSubmit: (data) =>{
        loadingModal(true, addCardModal);
        api
          .addCard(data)
          .then((res) => {
            cardsList.prependItem(addingNewCard(res).generateCard());
          })
          .then(() => {
            addCardForm.close();
          })
          .catch((err) => console.log(err))
          .finally(() => loadingModal(false, addCardModal));
      },
    });
    // --- Add card button functional adding --- //
    addCardButton.addEventListener("click", () => {
      addCardFormValidation.resetValidation();
      addNewCardModal.open();
    });
    addCardForm.setEventListeners();
    // --- Profile edit form --- //
    const profileForm = new ModalWithForm({
      modal: profileModal, 
      handleSubmit: (userInfo) => {
        loadingModal(true, profileModal);
        api
        .updateUserInfo(UserInfo)
        .then((res) => {
          profile.setUserInfo(res)
        })
        .then(() => {
          profileForm.close()
        })
        .catch((err) => console.log(err))
        .finally(() => loadingModal(false,profileModal))
      }
    });
    // --- Open 'Profile' form with current values as inputs --- //
    editButton.addEventListener('click', () => {
      profileFormValidation.resetValidation();
      const { name, job } = profile.getUserInfo();
      nameInput.value = name;
      jobInput.value = job;
      profileForm.open();
    });
    // --- 'Avatar' edit/update form --- //
    const avatarForm = new ModalWithForm({
      modal: avatarModal,
      handleSubmit: (imgLink) => {
        loadingModal(true, avatarModal);
        api
          .updateUserInfo(imgLink.avatar)
          .then((res) => {
            profile.setUserInfo(res);
          })
          .then(() => {
            avatarForm.close();
          })
          .catch((err) => console.log(err))
          .finally(() => {
            loadingModal(false, avatarModal);
          });
      },
    });
})
.catch((err) => console.log(err));

// ===== Avatar ===== //
// --- 'Avatar' form functional --- //
function handleAvatarEdit(data) {
  loadingModal(true, avatarModal);
  api.setUserAvatar({
    avatar: data.avatarURL
  })
  .then(res => {
    avatarImage.src = res.avatar;
    loadingModal(false, avatarModal);
    editAvatar.close();
  })
  .catch(err => console.log(err));
}
// --- 'Avatar' form creation --- //
const editAvatar = new ModalWithForm({
  modalSelector: avatarModal,
  modalSubmition: (data) => {
    handleAvatarEdit(data)
  }
});
// --- Open avatar edit modal on click --- //
avatarEditButton.addEventListener("click", () => {
  editAvatar.open();
});
// --- 'Avatar' form handler --- //
editAvatar.setEventListeners();

// ===== Validation ===== //
// --- 'Edit profile' form validation adding --- //
const profileFormValidation = new FormValidator(formConfig, profileModal);
profileFormValidation.enableValidation();
// --- 'Avatar' form validation adding --- //
const avatarFormValidation = new FormValidator(formConfig, avatarModal);
avatarFormValidation.enableValidation();
// --- 'Add card' form validation adding --- //
const addCardFormValidation = new FormValidator(formConfig, addCardModal);
addCardFormValidation.enableValidation();

export { profileName, profileJob, bigImage, avatarImage }