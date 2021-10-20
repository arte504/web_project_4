export class FormValidator {
  constructor(formConfig, formElement) {
    this._formConfig = formConfig;
    this._formElement = formElement;
    this._submitButton = this._formElement.querySelector(this._formConfig.submitButtonSelector);
    this._inputList = Array.from(this._formElement.
      querySelectorAll(this._formConfig.inputSelector)
  );}

  _showInputError(inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(` #${inputElement.id}_error `);
    inputElement.classList.add(this._formConfig.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._formConfig.errorMessageClass);
  };
  
  _hideInputError(inputElement, ) {
    const errorElement = this._formElement.querySelector(` #${inputElement.id}_error `);
    inputElement.classList.remove(this._formConfig.inputErrorClass);
    errorElement.textContent = "";
    errorElement.classList.remove(this._formConfig.errorMessageClass);
  };

  _resetValidation() {
    this._inputList.forEach((inputElement) => {
      this._formElement.reset();
      this._hideInputError(inputElement);
    });
    this._toggleSubmitButtonState();
  }

  _checkInput(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _invalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _toggleSubmitButton() {
    if (this._invalidInput()) {
      this._submitButton.disabled = true;
      this._submitButton.classList.add(this._formConfig.inactiveButtonClass);
    } else {
      this._submitButton.disabled = false;
      this._submitButton.classList.remove(this._formConfig.inactiveButtonClass);
    }
  }

  _setFormEventListeners() {
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInput(inputElement);
        this._toggleSubmitButton();
      });
    });
  }

  enableValidation() {
    this._formElement.addEventListener("submit", (event) => {
      event.preventDefault();
    });
    this._setFormEventListeners();
  }
}