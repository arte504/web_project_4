export function toggleModal(modal) {
  if(!modal.classList.contains('modal_visible')) {
    modal.addEventListener('click', closeModalOutside);
    window.addEventListener('keydown', escCloseModal);
  } else {
    modal.removeEventListener('click', closeModalOutside);
    window.removeEventListener('keydown', escCloseModal);
  }
  modal.classList.toggle('modal_visible');
}

export function closeModalOutside(event) {  
  if(event.target.classList.contains('modal')) { 
    const openModal = document.querySelector('.modal_visible');
    toggleModal(openModal);
  }
}

export function escCloseModal(event) {  
  if (event.key === 'Escape') {  
    const openModal = document.querySelector('.modal_visible');
    toggleModal(openModal);
  }
}

export function fillDefaultCardModalValues(){
  if(!addCardModal.classList.contains("modal_visible")){
    document.getElementById("modalFormTypeAddCard").reset();
  }
}