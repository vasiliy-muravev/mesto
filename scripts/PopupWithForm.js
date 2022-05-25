import {Popup} from "./Popup.js";

export class PopupWithForm extends Popup {
    _form;
    _handleFormSubmit;

    constructor({popupSelector, handleFormSubmit}) {
        super(popupSelector);
        this._handleFormSubmit = handleFormSubmit;
        this._form = this._popup.querySelector('.popup__form');
    }

    /* Собирает данные всех полей формы */
    _getInputValues = () => {
        return Object.fromEntries(new FormData(this._form));
    }


    setEventListeners = () => {
        console.log(this._getInputValues());
        super.setEventListeners();
        this._form.addEventListener('submit', this._handleFormSubmit);
    }

    close = () => {
        super.close();
        this._form.reset();
    }
}