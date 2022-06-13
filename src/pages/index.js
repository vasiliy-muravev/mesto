import "./index.css";
import {Card} from "../components/Card.js";
import {FormValidator} from "../components/FormValidator.js";
import {initialCards} from "../constants/cardsData.js";
import {PopupWithImage} from "../components/PopupWithImage.js";
import {Section} from "../components/Section.js";
import {UserInfo} from "../components/UserInfo.js";
import {PopupWithForm} from "../components/PopupWithForm.js";
import {Api} from "../components/Api.js";

/* Тестирование git с другой машины */

/* Элементы попапа формы профиля пользователя */
const profileButtonRedact = document.querySelector('.info__redact-button');
const profileButtonAdd = document.querySelector('.profile__add-place-button');
const profileForm = document.forms.profileForm;
const profileNameInput = profileForm.querySelector('.popup__form-name');
const profileJobInput = profileForm.querySelector('.popup__form-additional');

/* Элементы попапа формы добавления места */
const placeForm = document.forms.placeForm;

/* Попап с картинкой */
const popupWithImage = new PopupWithImage('.popup_picture');
popupWithImage.setEventListeners();

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
            popupWithImage.open(data);
        }
    }, '#place-template');
    return card.addCard();
}

/* Добавляем карточки «из коробки» */
const api = new Api();
console.log(api.getInitialCards());
console.log(api.getUserData());
// console.log();

api.getInitialCards().then((data) => {
    const cardList = new Section({
        // items: initialCards,
        items: data,
        renderer: (item) => {
            return getCard(item);
        }
    }, '.places');
    cardList.renderItems();

    /* Обработчик отправки формы добавления места */
    const placePopupWithForm = new PopupWithForm({
            popupSelector: '.popup_place',
            handleFormSubmit: (data) => {
                console.log(data);
                cardList.addItem(getCard(data));
                placePopupWithForm.close();
                placeFormValidator.toggleButtonState();
            }
        }
    );
    placePopupWithForm.setEventListeners();

    /* Открытие попап формы добавления места */
    profileButtonAdd.addEventListener('click', () => {
        placePopupWithForm.open();
    });
})

api.getUserData().then((data) => {
    console.log(data);
    /* Обработчик «отправки» формы профиля пользователя */
    const userInfo = new UserInfo(
        '.info__title',
        '.info__subtitle',
        '.profile__avatar',
        data
    );
    userInfo.setUserInfo(data);
    userInfo.setUserAvatar(data);
    const profilePopupWithForm = new PopupWithForm({
            popupSelector: '.popup_profile',
            handleFormSubmit: (formData) => {
                console.log(formData);
                userInfo.setUserInfo(formData);
                api.setUserData(formData).catch((err) => {
                    console.log(err);
                });
                profilePopupWithForm.close();
            }
        }
    );
    profilePopupWithForm.setEventListeners();

    /* Открыть попап формы профиля пользователя по кнопке редактировать */
    profileButtonRedact.addEventListener('click', () => {
        const data = userInfo.getUserInfo();
        profileNameInput.value = data.profileFormName;
        profileJobInput.value = data.profileFormProfession;
        profilePopupWithForm.open();
    });
});

/* Включение валидации профиля */
const profileFormValidator = new FormValidator(validationConfig, profileForm);
profileFormValidator.enableValidation();

/* Включение валидации места */
const placeFormValidator = new FormValidator(validationConfig, placeForm);
placeFormValidator.enableValidation();
