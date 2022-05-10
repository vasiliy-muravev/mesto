export class FormValidator {
    _config;
    _formElement;

    constructor(config, formElement) {
        this._config = config;
        this._formElement = formElement;
    }

    _showInputError = (formElement, inputElement, errorMessage, config) => {
        const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.add(config.inputErrorClass);
        errorElement.classList.add(config.errorClass);
        errorElement.textContent = errorMessage;
    };

    _hideInputError = (formElement, inputElement, config) => {
        const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.remove(config.inputErrorClass);
        errorElement.classList.remove(config.errorClass);
        errorElement.textContent = '';
    };

    _checkInputValidity = (formElement, inputElement, config) => {
        if (!inputElement.validity.valid) {
            this._showInputError(formElement, inputElement, inputElement.validationMessage, config);
        } else {
            this._hideInputError(formElement, inputElement, config);
        }
    };

    _hasInvalidInput = (inputList) => {
        return inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        });
    };

    _toggleButtonState = (inputList, buttonElement, config) => {
        if (this._hasInvalidInput(inputList)) {
            buttonElement.classList.add(config.inactiveButtonClass);
            buttonElement.disabled = true;
        } else {
            buttonElement.classList.remove(config.inactiveButtonClass);
            buttonElement.disabled = false;
        }
    };

    _setEventListeners = (formElement, config) => {
        const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
        const buttonElement = formElement.querySelector(config.submitButtonSelector);
        this._toggleButtonState(inputList, buttonElement, config);
        inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._checkInputValidity(formElement, inputElement, config);
                this._toggleButtonState(inputList, buttonElement, config);
            });
        });
    };

    enableValidation = (config) => {
        const formList = Array.from(document.querySelectorAll(config.formSelector));
        formList.forEach((formElement) => {
            formElement.addEventListener('submit', function (evt) {
                evt.preventDefault();
            });

            this._setEventListeners(formElement, config);
        });
    };
}