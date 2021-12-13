export default class Modal {
  constructor( modalSelector, checkKeyPress ) {
    this._modalElement = document.querySelector(modalSelector);
    this._escapeKeyHandler = this._escapeKeyHandler.bind(this);
    this._checkKeyPress = checkKeyPress;
  }
  // --- Open modal method --- // 
  open() {
    this._modalElement.classList.add("modal_visible");
    document.addEventListener("keyup", this._escapeKeyHandler);
  }
  // --- Close modal method --- //
  close() {
    this._modalElement.classList.remove("modal_visible");
    document.removeEventListener("keyup", this._escapeKeyHandler);
  }
  // --- Close modal on ESC method --- //
  _escapeKeyHandler(event) {
    if (this._checkKeyPress(event.key)) {
      this.close();
    }
  }

  setEventListeners() {
    this._modalElement
      .addEventListener("click", (event) => {
        // --- Close modal on close('X') button --- //
        if (event.target.classList.contains('modal__close-button')) {
          this.close();
        }
        // --- Close modal on overlay(out of the modal) click --- ///
        if (event.target.classList.contains('modal_visible')) {
          this.close();
      }
    });
  }
}