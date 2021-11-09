import Modal from "./Modal.js";

export default class ModalWithForm extends Modal {
  constructor(modalSelector, submitHandler) {
    super(modalSelector);
    this._submitBtnHandler = submitHandler;
    this._formElement = this._modalElement.querySelector(".modal__container");
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
      this._submitBtnHandler(this.getInputValues());
      this.close();
      this._formElement.reset();
    });
  }

  close() {
    super.close();
    this._formElement.reset();
  }
}