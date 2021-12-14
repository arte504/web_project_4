export default class FormValidator {
  constructor(formConfig, formElement) {
    this._formConfig = formConfig;
    this._formElement = formElement;
    this.inputs = Array.from(this._formElement.querySelectorAll(this._formConfig.inputSelector));
    this._buttonElement = this._formElement.querySelector(this._formConfig.submitButtonSelector);
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

  _checkInput = (inputElement) => {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _checkIValid = () => this.inputs.every((input) => input.validity.valid);

  _toggleSubmitButton() {
    if (this._checkIValid()) {
      this._buttonElement.disabled = false;
      this._buttonElement.classList.remove(this._formConfig.inactiveButtonClass);
    } 
    else {
      this._buttonElement.disabled = true;
      this._buttonElement.classList.add(this._formConfig.inactiveButtonClass);
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

  resetValidation() {
    this._toggleSubmitButton();

    this.inputs.forEach((input) => {
      this._hideInputError(input);
    })
  }
}