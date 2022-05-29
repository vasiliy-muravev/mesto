export class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector);
    }

    open() {
        this._popup.classList.add('popup_opened');
        document.addEventListener('keydown', this._handleEscClose);
    }

    close() {
        this._popup.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._handleEscClose);
    }

    /* Если кликнули по оверлею или крестику любого из попапов - закрываем форму */
    _handleClickClose = () => {
        this._popup.addEventListener('mousedown', (evt) => {
            if (evt.target.classList.contains('popup_opened') ||
                evt.target.classList.contains('popup__close-button')) {
                this.close();
            }
        })
    }

    /* Закрытие всех попапов при нажатии Escape */
    _handleEscClose = (evt) => {
        if (evt.key === 'Escape') {
            const openedPopup = document.querySelector('.popup_opened');
            if (openedPopup) {
                openedPopup.classList.remove('popup_opened');
            }
        }
    }

    setEventListeners() {
        this._popup.addEventListener('click', this._handleClickClose);
    }
}