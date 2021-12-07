export default class Modal {
  constructor(modal) {
    this._modal = modal;
  }
  // --- Open modal method --- // 
  open() {
    this._modal.classList.add(".modal_visible");
    this.setEventListeners();
  }
  // --- Close modal method --- //
  close() {
    this._modal.classList.remove(".modal_visible");
    this.removeEventListeners()
  }
  // --- Close modal on ESC method --- //
  _clickEscHandler = (event) => {
    if (event.key === "Escape") {
      this.close();
    }
  }
  // --- Close modal on close('X') button press method --- //
  _clickOnCloseButtonHandler = () => {
    this.close();
  };
  // --- Close modal on overlay mouse click method --- //
  _clickOnOverlayHandler = (event) => {
    if (event.target === event.currentTarget) {
      this.close();
    }
  };

  setEventListeners() {
    this._modal = document.querySelector('.modal__container_type_form');
    this._modal
      .querySelector('.modal__close-button')
      .addEventListener('click', this._clickOnCloseButtonHandler);
    this._modal.addEventListener('click', this._clickOnOverlayHandler)
    document.addEventListener('keydown', this._clickEscHandler);
  }

  removeEventListeners() {
    this._modal = document.querySelector('.modal__container_type_form');
    this._modal
      .querySelector('.modal__close-button')
      .removeEventListener('click', this._clickOnCloseButtonHandler);
    this._modal.removeEventListener('click', this._clickOnOverlayHandler)
    document.removeEventListener('keydown', this._clickEscHandler);
  }
}