import Modal from "./Modal.js";

export default class ModalWithImage extends Modal {
  constructor( modal, checkKeyPress ){
    super( modal, checkKeyPress );
    this._modalImage = this._modalElement.querySelector('.modal__big-image');
    this._modalTitle = this._modalElement.querySelector('.modal__image-caption');
  }
  // --- Open big image modal method --- //
  open(name, link) {
    this._modalTitle.textContent = name;
    this._modalImage.setAttribute("src", link);
    this._modalImage.setAttribute("alt", name);

    super.open();
  }
}