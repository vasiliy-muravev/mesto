import { openPopup, closePopup } from "./index.js";

/* Элементы попапа с фотографиями */
const picturePopup = document.querySelector('.popup_picture');
const pictureBig = picturePopup.querySelector('.popup__big-picture');
const pictureTitle = picturePopup.querySelector('.popup__picture-title');

// /* Элементы попапа формы добавления места */
// const placeFormPopup = document.querySelector('.popup_place');
// const placeForm = document.forms.placeForm;
// const placeNameInput = placeFormPopup.querySelector('.popup__form-name');
// const placeLinkInput = placeFormPopup.querySelector('.popup__form-additional');
//
// /* Шаблон карточки места */
// const placeContainer = document.querySelector('.places');
// const placeTemplate = document.querySelector('#place-template').content.querySelector('.place');

export class Card {
    _data;
    _cardSelector;
    _card;

    constructor(data, cardSelector) {
        this._data = data;
        this._cardSelector = cardSelector;
    }

    /* Добавить место используя шаблон карточки места */
    addCard = () => {
        this._card = this._getTemplate();
        this._card.querySelector('.place__image').src = this._data.placeFormLink;
        this._card.querySelector('.place__image').alt = this._data.placeFormName;
        this._card.querySelector('.description__title').textContent = this._data.placeFormName;
        this._setEventListeners();
        return this._card;
    }

    _getTemplate() {
        return document.querySelector(this._cardSelector).content.querySelector('.place').cloneNode(true);
    }

    _setEventListeners() {
        const placeImage = this._card.querySelector('.place__image');
        const placeLike = this._card.querySelector('.description__like');
        const placeDelete = this._card.querySelector('.description__delete');
        const picturePopup = document.querySelector('.popup_picture');

        placeLike.addEventListener('click', evt => {
            evt.target.classList.toggle('description__like_active');
        });
        placeDelete.addEventListener('click', evt => {
            evt.target.closest('.place').remove();
        });
        placeImage.addEventListener('click', () => {
            this._addPicture(this._data.placeFormName, this._data.placeFormLink);
            openPopup(picturePopup);
        });
    }

    _addPicture(name, link) {
        pictureBig.src = link;
        pictureBig.alt = name;
        pictureTitle.textContent = name;
    }
}