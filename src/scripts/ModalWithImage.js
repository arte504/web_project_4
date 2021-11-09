import Modal from "./Modal.js";

export default class ModalWithImage extends Modal {
  constructor(modalSelector) {
    super(modalSelector);
  }
  // --- Open big image modal method --- //
  open = (event) => {
    const bigImage = event.target;
    this._modalElement.querySelector(".modal__big-image").src = bigImage.src;
    this._modalElement.querySelector(".modal__image-caption").textContent = bigImage.alt;

    super.open();
  }
}