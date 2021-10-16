const showInputError = (formSelector, input, {errorClass, inputErrorClass, ...rest}) => {
  const error = formSelector.querySelector(`#${input.id}_error`);
  input.classList.add(inputErrorClass);
  error.classList.add(errorClass);
};

const hideInputError = (formSelector, input, {errorClass, inputErrorClass, ...rest}) => {
  const error = formSelector.querySelector(`#${input.id}_error`);
  input.classList.remove(inputErrorClass);
  error.classList.remove(errorClass);
};

const isValid = (form, input, rest) => {
  if (!input.validity.valid) {
    showInputError(form, input, rest);
  } else {
    hideInputError(form, input, rest);
  }
};

const toggleButtonState = (button, inputs, {inactiveButtonClass}) => {
  const hasInvalidInput = inputs.every((input) => input.validity.valid);
  if (hasInvalidInput) {
    button.classList.remove(inactiveButtonClass);
    button.disabled = false;
  } else {
    button.classList.add(inactiveButtonClass);
    button.disabled = true;
  }
};

function enableValidation ({formSelector, inputSelector, submitButtonSelector, ...rest}) {

  const forms = Array.from(document.querySelectorAll(formSelector));
  forms.forEach((form) => {
    form.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });

    const inputs = Array.from(form.querySelectorAll(inputSelector));
    const button = form.querySelector(submitButtonSelector);

    inputs.forEach((input) => {
      input.addEventListener("input", () => {
        isValid(form, input, rest);
        toggleButtonState(button, inputs, rest);
      });
      inputs.forEach((input) => {
        input.addEventListener("click", () => {
          isValid(form, input, rest);
          toggleButtonState(button, inputs, rest);
        });
    });
  });
});
} 

enableValidation({
  formSelector: ".modal__container",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__submit-button",
  inactiveButtonClass: "modal__submit-button_disabled",
  inputErrorClass: "modal__input_error",
  errorClass: "modal__error_visible"
}); 