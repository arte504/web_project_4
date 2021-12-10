import Modal from "./Modal.js";

export default class ModalWithImage extends Modal {
  constructor( modal, checkKeyPress ){
    super( modal, checkKeyPress );
    this._modalImage = document.querySelector('.modal__big-image');
    this._modalTitle = document.querySelector('.modal__image-caption');
  }
  // --- Open big image modal method --- //
  open(name, link) {
    this._modalTitle.textContent = name;
    this._modalImage.setAttribute("src", link); 

    super.open();
  }
}