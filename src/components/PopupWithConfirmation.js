import {Popup} from "./Popup.js";

export class PopupWithConfirmation extends Popup {
    constructor({popupSelector, handleFormSubmit}) {
        super(popupSelector);
        this._handleFormSubmit = handleFormSubmit;
        this._form = this._popup.querySelector('.popup__form');
    }

    getCardId = () => {
        return this._popup.dataset.id;
    }

    setEventListeners = () => {
        super.setEventListeners();
        this._form.addEventListener('submit', (evt) => {
            console.log(this);
            evt.preventDefault();
            this._handleFormSubmit();
        });
    }

    removeCard = (cardId) => {
        let card = document.getElementById(cardId);
        card.remove();
        card = null;
    }

}