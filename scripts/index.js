// -- Profile consts -- //
const editModal = document.querySelector('.modal_edit-profile');
const editButton = document.querySelector('.profile__edit-button');
const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__subtitle');
const nameInput = document.querySelector('.modal__title');
const jobInput = document.querySelector('.modal__subtitle');

// -- Close button -- //
const editCloseIcon = editModal.querySelector('.modal__close-button');

// --- 'Modal' toggle function --- //
function toggleModal (card) {
  card.classList.toggle('modal_visible');
}

// --- 'Profile edit' function --- //
function fillProfileValues(edit) {
  edit.preventDefault();      

  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;  

  toggleModal(editModal);
}

// --- 'Profile edit' event listener --- //
editModal.addEventListener('submit', fillProfileValues);

// --- Open modal on edit button press --- //
editButton.addEventListener('click', () => {
  toggleModal(editModal);
});

// --- Close modal on close button press --- //
editCloseIcon.addEventListener('click', () => {
  toggleModal(editModal);
});
