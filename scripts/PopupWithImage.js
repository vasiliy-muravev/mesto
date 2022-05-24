import {Popup} from "./Popup.js";

export class PopupWithImage extends Popup {
    _pictureBig;
    _pictureTitle;

    constructor(popupSelector) {
        super(popupSelector);
        this._pictureBig = document.querySelector('.popup__big-picture');
        this._pictureTitle = document.querySelector('.popup__picture-title');
    }

    open = ({placeFormName, placeFormLink}) => {
        this._pictureBig.src = placeFormLink;
        this._pictureBig.alt = placeFormName;
        this._pictureTitle.textContent = placeFormName;
        this._popup.classList.add('popup_opened');
        document.addEventListener('keydown', this._handleEscClose);
    }
}