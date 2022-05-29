export class Card {
    _data;
    _cardSelector;
    _card;
    _cardImage;

    constructor({data, handleCardClick}, cardSelector) {
        this._data = data;
        this._handleCardClick = handleCardClick;
        this._cardSelector = cardSelector;
    }

    /* Добавить место используя шаблон карточки места */
    addCard = () => {
        this._card = this._getTemplate();
        this._cardImage = this._card.querySelector('.place__image');
        this._cardImage.src = this._data.placeFormLink;
        this._cardImage.alt = this._data.placeFormName;
        this._card.querySelector('.description__title').textContent = this._data.placeFormName;
        this._setEventListeners();
        return this._card;
    }

    /* Получить шаблон */
    _getTemplate = () => {
        const placeTemplate = document.querySelector(this._cardSelector).content.querySelector('.place');
        return placeTemplate.cloneNode(true);
    }

    _setEventListeners = () => {
        const placeLike = this._card.querySelector('.description__like');
        const placeDelete = this._card.querySelector('.description__delete');
        const picturePopup = document.querySelector('.popup_picture');
        /* Лайк */
        placeLike.addEventListener('click', evt => {
            evt.target.classList.toggle('description__like_active');
        });
        /* Удаление */
        placeDelete.addEventListener('click', evt => {
            this._card.remove();
            this._card = null;
        });
        this._cardImage.addEventListener('click', () => {
            this._handleCardClick(this._data.placeFormName, this._data.placeFormLink);
        });
    }
}