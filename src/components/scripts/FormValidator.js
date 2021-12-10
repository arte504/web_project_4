export default class FormValidator {
  constructor(formConfig, formElement) {
    this._formConfig = formConfig;
    this._formElement = formElement;
    this.inputs = Array.from(this._formElement.querySelectorAll(this._formConfig.inputSelector));
  }

  _showInputError = (inputElement, errorMessage) => {
    const { inputErrorClass, errorMessageClass } = this._formConfig;
    const errorElement = this._formElement.querySelector(` #${inputElement.id}_error `);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(errorMessageClass);
    inputElement.classList.add(inputErrorClass);
  };
  
  _hideInputError = (inputElement) => {
    const { inputErrorClass, errorMessageClass } = this._formConfig;
    const errorElement = this._formElement.querySelector(` #${inputElement.id}_error `);
    errorElement.textContent = "";
    errorElement.classList.remove(errorMessageClass);
    inputElement.classList.remove(inputErrorClass);
  };

  resetValidation() {
    this.inputs.forEach((input) => {
      this._hideInputError(input);
    });
    this._toggleSubmitButton();
  }

  _checkInput = (inputElement) => {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _checkIfFormValid = () => this.inputs.every((input) => input.validity.valid);

  _toggleSubmitButton() {
    const { inactiveButtonClass, submitButtonSelector } = this._formConfig;
    const buttonElement = this._formElement.querySelector(submitButtonSelector);

    if (this._checkIfFormValid()) {
      buttonElement.disabled = false;
      buttonElement.classList.remove(inactiveButtonClass);
    } else {
      buttonElement.disabled = true;
      buttonElement.classList.add(inactiveButtonClass);
    }
  }

  _setEventListeners = () => {
    this.inputs.forEach((input) => {
      input.addEventListener("input", () => {
        this._checkInput(input);
        this._toggleSubmitButton();
      });
    });
    return this._formElement;
  };

  enableValidation() {
    this._formElement.addEventListener("submit", (event) => {
      event.preventDefault();
    });
    this._setEventListeners();
  }
}