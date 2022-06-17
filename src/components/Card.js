export class Card {
    constructor({data, currentUserId, handleCardClick, handleLikeClick}, cardSelector) {
        this._data = data;
        this._handleCardClick = handleCardClick;
        this._handleLikeClick = handleLikeClick;
        this._cardSelector = cardSelector;
        this._popupDelete = document.querySelector('.popup_place-delete');
        this._user_id = currentUserId;

    }

    /* Добавить место используя шаблон карточки места */
    addCard = () => {
        this._card = this._getTemplate();
        this._cardImage = this._card.querySelector('.place__image');
        this._cardImage.src = this._data.link;
        this._cardImage.alt = this._data.name;
        this._card.querySelector('.description__title').textContent = this._data.name;
        const placeLike = this._card.querySelector('.description__like');
        const placeLikeCount = this._card.querySelector('.description__like-count');
        if (this._data.likes.length > 0) {
            placeLikeCount.textContent = this._data.likes.length;
        } else {
            placeLikeCount.textContent = 0;
        }
        if (this.checkIfLiked()) {
            placeLike.classList.add('description__like_active');
        } else {
            placeLike.classList.remove('description__like_active');
        }

        this._card.id = this._data._id;
        this._setEventListeners();
        if (this._data.owner && this._data.owner._id !== this._user_id) {
            this._card.querySelector('.description__delete').classList.add('description__delete_hidden');
        }
        return this._card;
    }

    /* Проверяем ставил ли данный пользователь лайк */
    checkIfLiked = () => {
        const likes = this._data.likes;
        console.log(likes.length);
        if (likes.length > 0) {
            return likes.some((item) => {
                console.log(item._id, this._user_id);
                return item._id === this._user_id;
            });
        }
    }

    /* Получить шаблон */
    _getTemplate = () => {
        const placeTemplate = document.querySelector(this._cardSelector).content.querySelector('.place');
        return placeTemplate.cloneNode(true);
    }

    /* Лайк */
    __handleLikeClick = () => {
        const placeLike = this._card.querySelector('.description__like');
        const cardId = this._card.id;
        placeLike.addEventListener('click', evt => {
            this._handleLikeClick(cardId);
            evt.target.classList.toggle('description__like_active');
        });
    }

    /* Клик Удаление */
    __handleDeleteClick = () => {
        const placeDelete = this._card.querySelector('.description__delete');
        placeDelete.addEventListener('click', evt => {
            this._popupDelete.dataset.id = this._card.id;
            this._popupDelete.classList.add('popup_opened');
        });
    }

    __handleSetImage = () => {
        this._cardImage.addEventListener('click', () => {
            this._handleCardClick(this._data.name, this._data.link);
        });
    }

    _setEventListeners = () => {
        this.__handleLikeClick();
        this.__handleDeleteClick();
        this.__handleSetImage();
    }
}