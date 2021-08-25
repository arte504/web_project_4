const initCards = [
    {
        name: "Lago di Braies",
        link: "https://code.s3.yandex.net/web-code/lago.jpg"
    },
    {
      name: "Vanoise National Park",
      link: "https://code.s3.yandex.net/web-code/vanois.jpg"
    },
    {
      name: "Latemar",
      link: "https://code.s3.yandex.net/web-code/latemar.jpg"
    },
    {
      name: "Bald Mountains",
      link: "https://code.s3.yandex.net/web-code/bald-mountains.jpg"
    },
    {
      name: "Lake Louise",
      link: "https://code.s3.yandex.net/web-code/lake-louise.jpg"
    },
    {
      name: "Yosemite Valley",
      link: "https://code.s3.yandex.net/web-code/yosemite.jpg"
    },
];

// -- Profile consts -- //
const editModal = document.querySelector('.modal__edit');
const editButton = document.querySelector('.profile__edit-button');
const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__subtitle');
const nameInput = document.querySelector('.modal__title');
const jobInput = document.querySelector('.modal__subtitle');

// -- Cards lists consts -- //
const listWrapper = document.querySelector('.cards__grid');
const templateCard = document.querySelector('.card-template').content.querySelector('.card');

// -- Close button -- //
const editCloseIcon = editModal.querySelector('.modal__close-button');

// --- 'Modal' toggle function --- //
function toggleModal (card) {
  card.classList.toggle('modal_visible');
}

// --- 'Card' create function --- //
function createCard(card) {
  const cardModal = templateCard.cloneNode(true);
  const imageModal = cardModal.querySelector('.card__image');
  const titleModal = cardModal.querySelector('.card__title');
  const likeModal = cardModal.querySelector('.card__like-button');

  imageModal.style.backgroundImage = `url('${card.link}')`;
  titleModal.textContent = card.name;

  likeModal.addEventListener('click', (e) => {
    e.target.classList.toggle('card__like-button_active');
  });

  return cardModal;
}

// --- 'Card' render function --- //
function renderCard(card) {
  listWrapper.prepend(createCard(card));
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

// --- Close modal on ESC press --- //
function closeModalEscapeKey(esc) {
  const modalEscape = document.querySelector(".modal_visible");
  if (esc.key === "Escape") {
    toggleModal(modalEscape);
  }
  esc.target.removeEventListener("keydown", closeModalEscapeKey);
}

// --- Close modal on click press --- //
function closeModalClick(click) {
  const modalClick = click.target;
  if(!modalClick.classList.contains("modal_visible")) {
    return;
  }
  toggleModal(modalClick);
}

// --- Open modal on edit button press --- //
editButton.addEventListener('click', () => {
  toggleModal(editModal);
});

// --- Close modal on close button press --- //
editCloseIcon.addEventListener('click', () => {
  toggleModal(editModal);
});

// --- Close modal event listeners --- //
document.addEventListener("keydown", closeModalEscapeKey);
document.addEventListener("click", closeModalClick);

// --- Init default cards --- //
initCards.forEach((card) => {
  renderCard(card);
});
