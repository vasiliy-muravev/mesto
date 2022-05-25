import {Popup} from "./Popup.js";

export class PopupWithForm extends Popup {
    _form;
    _handleFormSubmit;
    _profileButtonRedact;

    constructor({popupSelector, handleFormSubmit}) {
        super(popupSelector);
        this._handleFormSubmit = handleFormSubmit;
        this._form = this._popup.querySelector('.popup__form');
        this._profileButtonRedact = document.querySelector('.info__redact-button');
    }

    /* Собирает данные всех полей формы */
    _getInputValues = () => {
        return Object.fromEntries(new FormData(this._form));
    }

    insertProfileInputValue = (data) => {
        const profileNameInput = this._form.querySelector('.popup__form-name');
        const profileJobInput = this._form.querySelector('.popup__form-additional');
        profileNameInput.value = data.profileFormName;
        profileJobInput.value = data.profileFormProfession;
    }

    close = () => {
        super.close();
        this._form.reset();
    }

    setEventListeners = () => {
        super.setEventListeners();
        this._form.addEventListener('submit', this._handleFormSubmit);
    }
}