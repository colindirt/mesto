const showInputError = (formElement, inputElement, errorMessage, item) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(item.inputErrorClass);

  errorElement.classList.add(item.errorClass);
  errorElement.textContent = errorMessage;
};

const hideInputError = (formElement, inputElement, item) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(item.inputErrorClass);
  errorElement.classList.remove(item.errorClass);
  errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement, item) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, item);
  } else {
    hideInputError(formElement, inputElement, item);
  }
};

const setEventListeners = (formElement, item) => {
  const inputList = Array.from(formElement.querySelectorAll(item.inputSelector));
  const buttonElement = formElement.querySelector(item.submitButtonSelector);
  toggleButtonState(inputList, buttonElement, item);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement, item);
      toggleButtonState(inputList, buttonElement, item);
    });
  });
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const toggleButtonState = (inputList, buttonElement, item) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(item.inactiveButtonClass);
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(item.inactiveButtonClass);
    buttonElement.disabled = false;
  }
};

const enableValidation = (item) => {
  const formList = Array.from(document.querySelectorAll(item.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
  });
    setEventListeners(formElement, item);
  });
};

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active',
 });
