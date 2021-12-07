import Modal from "./Modal.js";

export default class ModalWithForm extends Modal {
  constructor({modal, handleSubmit}) {
    super(modal);
    this._handleSubmit = handleSubmit;
    this._form = document.querySelector('.modal__container_type_form');
    this._formElement = this._form.querySelectorAll('.modal__input');
  }

  _getInputValues() {
    this._formInputValues = {};
    inputList.forEach((input) => {
      this._formInputValues[input.name] = input.value;
    });

    return inputValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', this.handleSubmit);
  }

  removeEventListeners() {
    super.removeEventListeners();
    this._form.removeEventListener('submit', this.handleSubmit);
  }

  handleSubmit = (event) =>{
    event.preventDefault();
    const inputValues = this._handleSubmit(this._getInputValues);

    return inputValues;
  }

  handleRemove(handle) {
    this._handleSubmit = handle;
  }

  close() {
    super.close();
    this._form.reset();
  }
}