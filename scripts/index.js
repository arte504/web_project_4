// -- Profile consts -- //
const modal = document.querySelector('.modal');
const editButton = document.querySelector('.profile__edit-button');
const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__subtitle');
const nameInput = document.querySelector('.modal__input_type_title');
const jobInput = document.querySelector('.modal__input_type_subtitle');
const formModal = document.querySelector('.modal__container')

// -- Close button -- //
const editCloseIcon = modal.querySelector('.modal__close-button');

// --- 'Modal' toggle function --- //
function openModal (card) {
  card.classList.add('modal_visible');
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;  
}

function closeModal (card) {
  card.classList.remove('modal_visible')
}

// --- 'Profile edit' function --- //
function fillProfileValues(edit) {
  edit.preventDefault();      

  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;  

  closeModal(modal);
}

// --- 'Profile edit' event listener --- //
formModal.addEventListener('submit', fillProfileValues);

// --- Open modal on edit button press --- //
editButton.addEventListener('click', () => {
  openModal(modal);
});

// --- Close modal on close button press --- //
editCloseIcon.addEventListener('click', () => {
  closeModal(modal);
});
