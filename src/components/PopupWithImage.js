import {Popup} from "./Popup.js";

export class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._pictureBig = document.querySelector('.popup__big-picture');
        this._pictureTitle = document.querySelector('.popup__picture-title');
    }

    open = ({name, link}) => {
        this._pictureBig.src = link;
        this._pictureBig.alt = name;
        this._pictureTitle.textContent = name;
        super.open();
    }
}