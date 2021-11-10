import Modal from "./Modal.js";

export default class ModalWithImage extends Modal {
  // --- Open big image modal method --- //
  openup = (event) => {
    const bigImage = event.target;
    this._modalElement.querySelector(".modal__big-image").src = bigImage.src;
    this._modalElement.querySelector(".modal__big-image").alt = bigImage.alt;
    this._modalElement.querySelector(".modal__image-caption").textContent = bigImage.alt;

    this.open();
  }
}