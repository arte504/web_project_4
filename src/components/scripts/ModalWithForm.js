import Modal from "./Modal.js";

export default class ModalWithForm extends Modal {
  constructor({modalSelector, handleSubmit}) {
    super(modalSelector);
    this._handleSubmitBtn = handleSubmit;
    this._formElement = this._modalSelector.querySelector(".modal__container");
  }

  getInputValues() {
    const inputList = Array.from(
      this._formElement.querySelectorAll(".modal__input")
    );
    const inputValues = {};
    inputList.forEach((input) => {inputValues[input.name] = input.value;});
    return inputValues;
  }

  setInputValues(values) {
    const inputList = Array.from(
      this._formElement.querySelectorAll(".modal__input")
    );
    inputList.forEach((input) => {input.value = values[input.name];})
  }

  setEventListeners() {
    super.setEventListeners();
    this._formElement.addEventListener("submit", () => {
      this._handleSubmitBtn(this.getInputValues());
      this.close();
    });
  }

  close() {
    super.close();
    this._formElement.reset();
  }
}