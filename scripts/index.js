import {Card} from "./Card.js";
import {FormValidator} from "./FormValidator.js";
import {initialCards} from "./cardsData.js";
import {PopupWithImage} from "./PopupWithImage.js";
import {Section} from "./Section.js";
import {UserInfo} from "./UserInfo.js";
import {PopupWithForm} from "./PopupWithForm.js";

/* Элементы попапа формы профиля пользователя */
const profileButtonRedact = document.querySelector('.info__redact-button');
const profileButtonAdd = document.querySelector('.profile__add-place-button');
const profileForm = document.forms.profileForm;
/* Элементы попапа формы добавления места */
const placeForm = document.forms.placeForm;

/* Настройки классов формы */
const validationConfig = {
    inputSelector: ".popup__form-input",
    submitButtonSelector: ".popup__form-submit-btn",
    inactiveButtonClass: "popup__form-submit-btn_disabled",
    inputErrorClass: "popup__form-input_error",
    errorClass: "popup__form-input-error_visible",
};

/* Создание и наполнение данными разметки карточки */
function getCard(data) {
    const card = new Card({
        data: data,
        handleCardClick: () => {
            const popupWithImage = new PopupWithImage('.popup_picture');
            popupWithImage.setEventListeners();
            popupWithImage.open(card._data);
        }
    }, '#place-template');
    return card.addCard();
}

/* Добавляем шесть карточек «из коробки» */
const defaultCardList = new Section({
    items: initialCards,
    renderer: (item) => {
        return getCard(item);
    }
}, '.places');
defaultCardList.renderItems();

/* Обработчик отправки формы добавления места */
const placePopupWithForm = new PopupWithForm({
        popupSelector: '.popup_place',
        handleFormSubmit: (data) => {
            const newCard = new Section({}, '.places');
            const formData = {
                placeFormName: data.target.placeFormName.value,
                placeFormLink: data.target.placeFormLink.value
            }
            newCard.addItem(getCard(formData));
            placePopupWithForm.close();
            placeForm.reset();
            placeFormValidator.toggleButtonState();
        }
    }
);
placePopupWithForm.setEventListeners();

/* Обработчик «отправки» формы профиля пользователя */
const userInfo = new UserInfo('.info__title', '.info__subtitle');
const profilePopupWithForm = new PopupWithForm({
        popupSelector: '.popup_profile',
        handleFormSubmit: (data) => {
            userInfo.setUserInfo(data);
            profilePopupWithForm.close();
        }
    }
);
profilePopupWithForm.setEventListeners();

/* Открыть попап формы профиля пользователя по кнопке редактировать */
profileButtonRedact.addEventListener('click', () => {
    profilePopupWithForm.insertProfileInputValue(userInfo.getUserInfo());
    profilePopupWithForm.open();
});

/* Открыть попап формы добавления места */
profileButtonAdd.addEventListener('click', () => {
    placePopupWithForm.open();
});

/* Включение валидации профиля */
const profileFormValidator = new FormValidator(validationConfig, profileForm);
profileFormValidator.enableValidation();

/* Включение валидации места */
const placeFormValidator = new FormValidator(validationConfig, placeForm);
placeFormValidator.enableValidation();