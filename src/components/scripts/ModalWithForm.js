import Modal from "./Modal.js";

export default class ModalWithForm extends Modal {
  constructor(selector, checkKeyPress, handleSubmit ) {
    super(selector, checkKeyPress);
    this._handleSubmit = handleSubmit;
    this._submitButton = this._modalElement.querySelector('.modal__submit-button');
    this._form = this._modalElement.querySelector('.modal__container');
    this._textInButton = this._submitButton.textContent;
  }

  getInputValues() {
    this._inputList = this._modalElement.querySelectorAll('.modal__input');
    const formInputValues = {};
    this._inputList
      .forEach((input) => { formInputValues[input.name] = input.value }
    );

    return this._entredValue || formInputValues;
  }

  setInputValues(entredValue) {
    this._entredValue = entredValue;
  }

  setEventListeners() {
    this._modalElement.addEventListener("submit", (event) => {
      event.preventDefault();
      // --- UX for modals --- //
      this._submitButton.textContent = "Saving...";
      this._handleSubmit(this.getInputValues());
    })
    super.setEventListeners();
  }

  close() {
    this._submitButton.textContent = this._textInButton;
    this._form.reset();
    super.close();
  }
}