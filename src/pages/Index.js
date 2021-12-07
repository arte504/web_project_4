import Api from "../components/scripts/Api.js"
import { Card } from "../components/scripts/Card.js";
import FormValidator from "../components/scripts/FormValidator.js";
import Section from "../components/scripts/Section.js";
import {
  profileName,
  profileJob,
  editButton,
  profileModal,
  addCardButton,
  addCardModal,
  avatarModal,
  avatarImage,
  avatarEditButton,
  cardBigModal,
  deleteCard,
  formConfig
} from "../components/utils/constants.js";
import ModalWithImage from "../components/scripts/ModalWithImage.js";
import ModalWithForm from "../components/scripts/ModalWithForm.js";
import UserInfo from "../components/scripts/UserInfo.js";
import "./index.css";

// ===== Modals ===== //
// --- Big image modal instance --- //
const bigImage = new ModalWithImage(cardBigModal);
bigImage.setEventListeners();
// --- Delete card modal instance and events --- //
const deleteCardModal = new ModalWithForm(deleteCard);
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
api.getAppInfo().then(([userData, cardListData]) => {
  // --- Cards section creation --- //
  const cardsList = new Section({
    items: cardListData,
    renderer: addingNewCard
  }, '.cards__grid')
  // --- Fetching and setting user profile info --- //
  api.getUserInfo().then(res => {
    profileInfo.setUserInfo( res.name, res.job, res.avatar)
  })
  // --- Render cards --- //
  cardsList.renderItems();
  // --- 'Add new card' modal instance --- //
  const addNewCardModal = new ModalWithForm({
    modalSelector: addCardModal,
    modalSubmition: (data) => {
      loadingModal(true, addImageModal);
      api
        .addCard(data)
        .then((res) => {
          console.log(res);
          addingNewCard(res);
          addNewCardModal.close();
          loadingModal(false, addImageModal);
        })
        .catch((err) => console.log(err));
    },
  });
  // --- Add card button functional adding --- //
  addCardButton.addEventListener("click", () => {
    addNewCardModal.open();
    loadingModal(false, addImageModal);
  });
  addNewCardModal.setEventListeners();
  // --- New card adding --- //
  function addingNewCard(data){
    const cardInstance = new Card({data, 
      handleCardClick: ({name, link}) => {
        bigImage.open(link, name)}, 
      handleDeleteClick: (cardId) => {
        deleteCardModal.open(cardId);
        deleteCardModal.setSubmitHandler(() => {
          api.removeCard(cardId)
            .then(() => {
              cardInstance.deleteCardModal();
              deleteCardModal.close();
            })
            .catch(err => console.log(err));
        });
      },
      likeHandler: (cardId) =>{ 
        if(cardElement.querySelector('.card__like-button').classList.contains('card__like-button_active')) { 
          api.deleteLike(cardId).then(res => { 
            cardElement.querySelector('.card__like-button').classList.remove('card__like-button_active');
            cardInstance.showLikes(res.likes.length) 
            cardInstance._likes = res.likes; })
          .catch(err => console.log(err)) 
        }
        else { 
          cardInstance._cardElement.classList.toggle("card__like-button_active"); 
          api.addLike(cardId).then(res => { 
            cardElement.querySelector('.card__like-button').classList.add('card__like-button_active'); 
            cardInstance.showLikes(res.likes.length) 
            cardInstance._likes = res.likes;})
          .catch(err => console.log(err)) 
        } 
      }
    },
    userData._id,'.card__template') 
    const cardElement = cardInstance.generateCard(); 
    cardsList.addItem(cardElement) 
    loadingModal(true, addImageModal);
  }
  // --- 'Profile' info editing --- //
  const profileInfo = new UserInfo( profileName, profileJob, avatarImage);
  const profileForm = new ModalWithForm({
    modalSelector: editProfileModal, 
    modalSubmition: (data) => {
      loadingModal(true, editProfileModal);
      api.setUserInfos({name: data.title, about:data.desc})
      .then(res => {
        loadingModal(false, editProfileModal)
        profileInfo.setUserInfo(res.name, res.about)
        profileForm.close();
        console.log(res)
      })
      .catch(err => console.log(err))
    }
  })
  // --- 'Profile' form handler --- //
  profileForm.setEventListeners();
  // --- Open 'Profile' form with current values as inputs --- //
  editButton.addEventListener('click', () => {
    profileForm.open();
    const user = profileInfo.getUserInfo();
    inputName.value = user.title;
    inputJob.value = user.job;
  })
})
.catch(err => console.log(err));

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