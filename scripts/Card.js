/* Элементы попапа с фотографиями */
const picturePopup = document.querySelector('.popup_picture');
const pictureBig = picturePopup.querySelector('.popup__big-picture');
const pictureTitle = picturePopup.querySelector('.popup__picture-title');

export class Card {
    _data;
    _cardSelector;
    _card;



    constructor(data, cardSelector) {
        this._data = data;
        this._cardSelector = cardSelector;
    }

    _getTemplate() {
        return document.querySelector(this._cardSelector).content.querySelector('.place').cloneNode(true);
    }

    addCard = () => {
        this._card = this._getTemplate();
        this._card.querySelector('.place__image').src = this._data.link;
        this._card.querySelector('.place__image').alt = this._data.name;
        this._card.querySelector('.description__title').textContent = this._data.name;
        this._setEventListeners();
        return this._card;
    }

    _setEventListeners() {
        const placeImage = this._card.querySelector('.place__image');
        const placeLike = this._card.querySelector('.description__like');
        const placeDelete = this._card.querySelector('.description__delete');
        const picturePopup = document.querySelector('.popup_picture');

        placeLike.addEventListener('click', event => {
            event.target.classList.toggle('description__like_active');
        });
        placeDelete.addEventListener('click', event => {
            event.target.closest('.place').remove();
        });

        placeImage.addEventListener('click', () => {
            this._addPicture(this._data.name, this._data.link);
            this._openPopup(picturePopup);
        });
    }

    _addPicture(name, link) {
        pictureBig.src = link;
        pictureBig.alt = name;
        pictureTitle.textContent = name;
    }

    /* Открытие */
    _openPopup(popup) {
        popup.classList.add('popup_opened');
        document.addEventListener('keydown', this._closeByEscape);
    }

    /* Закрытие попапа */
    _closePopup(popup) {
        popup.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._closeByEscape);
    }

    /* Закрытие попапов нажатием на Esc */
    _closeByEscape(evt) {
        if (evt.key === 'Escape') {
            const openedPopup = document.querySelector('.popup_opened');
            closePopup(openedPopup);
        }
    }





}