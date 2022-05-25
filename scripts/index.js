import {Card} from "./Card.js";
import {FormValidator} from "./FormValidator.js";
import {initialCards} from "./cardsData.js";
import {PopupWithImage} from "./PopupWithImage.js";
import {Section} from "./Section.js";
import {UserInfo} from "./UserInfo.js";
import {PopupWithForm} from "./PopupWithForm.js";

/* Элементы попапа формы профиля пользователя */
const profileButtonRedact = document.querySelector('.info__redact-button');
const profileFormPopup = document.querySelector('.popup_profile');
const profileNameInput = profileFormPopup.querySelector('.popup__form-name');
const profileJobInput = profileFormPopup.querySelector('.popup__form-additional');
const profileInfoTitle = document.querySelector('.info__title');
const profileInfoSubtitle = document.querySelector('.info__subtitle');
const profileButtonAdd = document.querySelector('.profile__add-place-button');
const profileForm = document.forms.profileForm;

/* Элементы попапа формы добавления места */
const placeFormPopup = document.querySelector('.popup_place');
const placeForm = document.forms.placeForm;

/* Контейнер карточки места */
const placeContainer = document.querySelector('.places');

/* Настройки классов формы */
const validationConfig = {
    inputSelector: ".popup__form-input",
    submitButtonSelector: ".popup__form-submit-btn",
    inactiveButtonClass: "popup__form-submit-btn_disabled",
    inputErrorClass: "popup__form-input_error",
    errorClass: "popup__form-input-error_visible",
};

/* Выбрать все попапы */
const popups = document.querySelectorAll('.popup');

/* Обработчик «отправки» формы профиля пользователя */
// function handleProfileFormSubmit(evt) {
//     evt.preventDefault();
//     profileInfoTitle.textContent = profileNameInput.value;
//     profileInfoSubtitle.textContent = profileJobInput.value;
//     closePopup(profileFormPopup);
// }
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

// const newCard = new Section({
//     items: initialCards,
//     renderer: (item) => {
//         const card = new Card({
//             data: item,
//         }, '#place-template');
//         return card.addCard();
//     }
// }, '.places');
// newCard.renderItems();
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
/* Обработчик «отправки» формы добавления места */
// function handlePlaceFormSubmit(evt) {
//     evt.preventDefault();
//     const data = Object.fromEntries(new FormData(evt.target));
//     placeContainer.prepend(getCard(data));
//     closePopup(placeFormPopup);
//     placeForm.reset();
//     placeFormValidator.toggleButtonState();
// }

/* Закрытие попапов нажатием на Esc ++++++++++*/
// function closeByEscape(evt) {
//     if (evt.key === 'Escape') {
//         const openedPopup = document.querySelector('.popup_opened');
//         closePopup(openedPopup);
//     }
// }

/* Открытие +++++++++++++*/
// export function openPopup(popup) {
//     popup.classList.add('popup_opened');
//     document.addEventListener('keydown', closeByEscape);
// }

/* Закрытие попапа +++++++++++++*/
// export function closePopup(popup) {
//     popup.classList.remove('popup_opened');
//     document.removeEventListener('keydown', closeByEscape);
// }

/* Если кликнули по оверлею или крестику любого из попапов - закрываем форму +++++++++++*/
// popups.forEach((popup) => {
//     popup.addEventListener('mousedown', (evt) => {
//         if (evt.target.classList.contains('popup_opened') ||
//             evt.target.classList.contains('popup__close-button')) {
//             closePopup(popup);
//         }
//     })
// })


/* Добавляем шесть карточек «из коробки» */
// initialCards.forEach(function (item) {
//     placeContainer.prepend(getCard(item));
// });
/* Добавляем шесть карточек «из коробки» */
const defaultCardList = new Section({
    items: initialCards,
    renderer: (item) => {
        return getCard(item);
    }
}, '.places');

defaultCardList.renderItems();


/* Открыть попап формы профиля пользователя по кнопке редактировать */
profileButtonRedact.addEventListener('click', () => {
    profilePopupWithForm.insertProfileInputValue(userInfo.getUserInfo());
    profilePopupWithForm.open();
});
/* Отправка формы */
// profileForm.addEventListener('submit', handleProfileFormSubmit);
/* Открыть попап формы добавления места */
profileButtonAdd.addEventListener('click', () => {
    placePopupWithForm.open();
});

/* Попап формы добавления места */
/* Отправка формы */
// placeForm.addEventListener('submit', handlePlaceFormSubmit);

/* Включение валидации профиля */
const profileFormValidator = new FormValidator(validationConfig, profileForm);
profileFormValidator.enableValidation();

/* Включение валидации места */
const placeFormValidator = new FormValidator(validationConfig, placeForm);
placeFormValidator.enableValidation();

