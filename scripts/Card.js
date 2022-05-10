import { openPopup } from "./index.js";

/* Элементы попапа с фотографиями */
const picturePopup = document.querySelector('.popup_picture');
const pictureBig = picturePopup.querySelector('.popup__big-picture');
const pictureTitle = picturePopup.querySelector('.popup__picture-title');
/* Шаблон карточки места */
const placeTemplate = document.querySelector('#place-template').content.querySelector('.place');

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

    /* Получить шаблон */
    _getTemplate = () => {
        return placeTemplate.cloneNode(true);
    }

    _setEventListeners = () => {
        const placeImage = this._card.querySelector('.place__image');
        const placeLike = this._card.querySelector('.description__like');
        const placeDelete = this._card.querySelector('.description__delete');
        const picturePopup = document.querySelector('.popup_picture');
        /* Лайк */
        placeLike.addEventListener('click', evt => {
            evt.target.classList.toggle('description__like_active');
        });
        /* Удаление */
        placeDelete.addEventListener('click', evt => {
            evt.target.closest('.place').remove();
        });
        placeImage.addEventListener('click', () => {
            this._addPicture(this._data.placeFormName, this._data.placeFormLink);
            openPopup(picturePopup);
        });
    }

    _addPicture = (name, link) => {
        pictureBig.src = link;
        pictureBig.alt = name;
        pictureTitle.textContent = name;
    }
}