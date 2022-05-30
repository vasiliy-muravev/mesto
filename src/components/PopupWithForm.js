import {Popup} from "./Popup.js";

export class PopupWithForm extends Popup {
    constructor({popupSelector, handleFormSubmit}) {
        super(popupSelector);
        this._handleFormSubmit = handleFormSubmit;
        this._form = this._popup.querySelector('.popup__form');
        this._inputs = this._form.querySelectorAll('.popup__form-input');
    }

    /* Собирает данные всех полей формы */
    _getInputValues = () => {
        this._formValues = {};
        this._inputs.forEach((input) => this._formValues[input.name] = input.value)
        return this._formValues;
    }

    close = () => {
        super.close();
        this._form.reset();
    }

    setEventListeners = () => {
        super.setEventListeners();
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._handleFormSubmit(this._getInputValues());
            this._form.reset();
        });
    }
}