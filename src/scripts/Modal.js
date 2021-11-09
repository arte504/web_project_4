export default class Modal {
  constructor(modalSelector) {
    this._modalElement = document.querySelector(modalSelector);
    this._checkForEscClose = this._checkForEscClose.bind(this);
    this.open = this.open.bind(this);
  }
  // --- Close modal on ESC method --- //
  _checkForEscClose = (event) => {
    if (event.key === "Escape") {
      this.close();
    }
  }
  // --- Open modal method --- // 
  open() {
    this._modalElement.classList.add("modal_visible");
    document.addEventListener("keyup", this._checkForEscClose);
  }
  // --- Close modal method --- //
  close = () => {
    this._modalElement.classList.remove("modal_visible");
    document.removeEventListener("keyup", this._checkForEscClose);
  }

  setEventListeners() {
    // --- Close modal on close('X') button --- //
    this._modalElement
    .querySelector(".modal__close-button")
    .addEventListener("click", (event) => {
      this.close(event);
    });
    // Close modal on overlay(out of the modal) click --- ///
    this._modalElement.addEventListener("click", (event) => {
      if (event.target.classList.contains("modal_visible")) {
        this.close(event);
      }
    });
  }
}