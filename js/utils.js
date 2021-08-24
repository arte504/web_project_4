// ---- Modal popup toggle function ---- //
export function togglePopup(modal) {  
  if(!modal.classList.contains('popup_opened')) { 
    modal.addEventListener('click', closeModalOutside); 
    window.addEventListener('keydown', escCloseModal); 
  } else { 
    modal.removeEventListener('click', closeModalOutside); 
    window.removeEventListener('keydown', escCloseModal); 
  }  
  modal.classList.toggle('popup_opened');    
}

// ---- Close on 'click' outside of modal ---- //
export function closeModalOutside(event) { 
  if(event.target.classList.contains('popup')) {
    const openModal = document.querySelector('.popup_opened'); 
    togglePopup(openModal); 
  }
} 
 
// ---- Close on 'ESC' press function ---- //
export function escCloseModal(event) { 
  if (event.key === 'Escape') { 
    const openModal = document.querySelector('.popup_opened'); 
    togglePopup(openModal); 
  } 
}

// ---- Save button disabled function ---- //
export function saveButtonDisabled(modal) {
  const inactiveButton = modal.querySelector('.popup__save-button');
  inactiveButton.classList.add('popup__save-button_disabled');
}