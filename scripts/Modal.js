/* Open modal */
export function openModal(modalWindow) {
  modalWindow.classList.add("modal_visible");
  document.addEventListener("keydown", closeModalOnEsc);
  document.addEventListener("click", closeModalOnOverlay);
}
/* Close modal */
export function closeModal(modalWindow) {
  modalWindow.classList.remove("modal_visible");
  document.removeEventListener("keydown", closeModalOnEsc);
  document.removeEventListener("click", closeModalOnOverlay);
}
/* Close modal on "escape" keydown */
export function closeModalOnEsc(event) {
  if (event.key === 'Escape') {  
    const opendModal = document.querySelector('.modal_visible');
    closeModal(opendModal);
  }
}
/* Close modal on overlay "click" */
export function closeModalOnOverlay(event) {
  if(event.target.classList.contains('modal_visible')) {
    closeModal(event.target);
  }
}
