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
export function closeModalOnEsc(evt) {
  if (evt.key === 'Escape') {  
    const opendModal = document.querySelector('.modal_visible');
    closeModal(opendModal);
  }
}
/* Close modal on overlay "click" */
export function closeModalOnOverlay(evt) {
  if(evt.target.classList.contains('modal_visible')) {
    closeModal(evt.target);
  }
}