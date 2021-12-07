export default class Modal {
  constructor(modalSelector) {
    this._modalSelector = modalSelector;
    this._checkForEscClose = this._checkForEscClose.bind(this);
  }
  // --- Close modal on ESC method --- //
  _checkForEscClose = (event) => {
    if (event.key === "Escape") {
      this.close();
    }
  }
  // --- Open modal method --- // 
  open = () => {
    this._modalSelector.classList.add("modal_visible");
    document.addEventListener("keyup", this._checkForEscClose);
  }
  // --- Close modal method --- //
  close = () => {
    this._modalSelector.classList.remove("modal_visible");
    document.removeEventListener("keyup", this._checkForEscClose);
  }

  setEventListeners() {
    // --- Close modal on close('X') button --- //
    this._modalSelector
    .querySelector(".modal__close-button")
    .addEventListener("click", (event) => {
      this.close(event);
    });
    // Close modal on overlay(out of the modal) click --- ///
    this._modalSelector.addEventListener("click", (event) => {
      if (event.target.classList.contains("modal_visible")) {
        this.close(event);
      }
    });
  }
}