import Modal from "./Modal.js";

export default class ModalWithImage extends Modal {
  constructor(modal){
    super(modal);
    this._modalImage = document.querySelector('.modal__image');
    this._modalTitle = document.querySelector('.modal__image-caption');
  }
  // --- Open big image modal method --- //
  open(link, title) {
    super.open(link, title);
    this._modalTitle.textContent = title;
    this._modalImage.src = link; 
    this._modalImage.alt = title;
  }
}