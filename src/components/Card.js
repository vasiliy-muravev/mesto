export class Card {
    constructor({data, currentUserId, handleCardClick, handleLikeClick, handleDeleteClick}, cardSelector) {
        this._data = data;
        this._handleCardClick = handleCardClick;
        this._handleLikeClick = handleLikeClick;
        this._handleDeleteClick = handleDeleteClick;
        this._cardSelector = cardSelector;
        this._popupDelete = document.querySelector('.popup_place-delete');
        this._user_id = currentUserId;

    }

    /* Добавить место используя шаблон карточки места */
    createCard = () => {
        this._card = this._getTemplate();
        this._cardImage = this._card.querySelector('.place__image');
        this._cardImage.src = this._data.link;
        this._cardImage.alt = this._data.name;
        this._card.querySelector('.description__title').textContent = this._data.name;
        const placeLike = this._card.querySelector('.description__like');
        const placeLikeCount = this._card.querySelector('.description__like-count');
        if (this._data.likes && this._data.likes.length > 0) {
            placeLikeCount.textContent = this._data.likes.length;
        } else {
            placeLikeCount.textContent = 0;
        }
        if (this._data.likes && this.checkIfLiked()) {
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
        if (likes.length > 0) {
            return likes.some((item) => {
                return item._id === this._user_id;
            });
        }
    }

    /* Закрашивание лайка и простановка количества из ответа от сервера */
    likeCard = (data) => {
        const like = this._card.querySelector('.description__like');
        const countLikes = this._card.querySelector('.description__like-count');
        like.classList.toggle('description__like_active');
        countLikes.textContent = data.likes.length;
    }

    removeCard = () => {
        this._card.remove();
        this._card = null;
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
        placeLike.addEventListener('click', () => {
            this._handleLikeClick(cardId);
        });
    }

    /* Клик Удаление */
    __handleDeleteClick = () => {
        const placeDelete = this._card.querySelector('.description__delete');
        placeDelete.addEventListener('click', () => {
            this._popupDelete.dataset.id = this._card.id;
            /* Открытие попапа формы с удалением места */
            this._handleDeleteClick();
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