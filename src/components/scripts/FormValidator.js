export default class FormValidator {
  constructor(formConfig, formElement) {
    this._formConfig = formConfig;
    this._formElement = formElement;
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
    this._inputs.forEach((input) => {
      this._hideInputError(input);
    });
    this._toggleSubmitButton();
  }

  _checkInput(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } 
    else {
      this._hideInputError(inputElement);
    }
  }

  _hasInvalidInput() {
    return this._inputs.some((input) =>{
      return !input.validity.valid;
    });
  }

  _toggleSubmitButton() {
    const { inactiveButtonClass, submitButtonSelector } = this._formConfig;
    const buttonElement = this._formElement.querySelector(submitButtonSelector);

    if (this._hasInvalidInput()) {
      buttonElement.disabled = false;
      buttonElement.classList.remove(inactiveButtonClass);
    } 
    else {
      buttonElement.disabled = true;
      buttonElement.classList.add(inactiveButtonClass);
    }
  }

  _setEventListeners = () => {
    this._inputs.forEach((input) => {
      input.addEventListener("input", () => {
        this._checkInput(input);
        this._toggleSubmitButton();
      });
    });
    return this._formElement;
  };

  enableValidation() {
    this._inputs = Array.from(
      this._formElement.querySelectorAll(this._inputSelector)
    );
    console.log(this._inputs);
    this._setEventListeners();
  }
}