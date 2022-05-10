import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";

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
const placeNameInput = placeFormPopup.querySelector('.popup__form-name');
const placeLinkInput = placeFormPopup.querySelector('.popup__form-additional');

/* Контейнер карточки места */
const placeContainer = document.querySelector('.places');

/* Настройки классов формы */
const validationConfig = {
    formSelector: ".popup__form",
    inputSelector: ".popup__form-input",
    submitButtonSelector: ".popup__form-submit-btn",
    inactiveButtonClass: "popup__form-submit-btn_disabled",
    inputErrorClass: "popup__form-input_error",
    errorClass: "popup__form-input-error_visible",
};

/* Выбрать все попапы */
const popups = document.querySelectorAll('.popup');

/* Обработчик «отправки» формы профиля пользователя */
function handleProfileFormSubmit(evt) {
    evt.preventDefault();
    profileInfoTitle.textContent = profileNameInput.value;
    profileInfoSubtitle.textContent = profileJobInput.value;
    closePopup(profileFormPopup);
}

/* Обработчик «отправки» формы добавления места */
function handlePlaceFormSubmit(evt) {
    evt.preventDefault();
    const data = Object.fromEntries(new FormData(evt.target));
    const card = new Card(data, '#place-template');
    const cardElement = card.addCard();
    placeContainer.prepend(cardElement);
    placeNameInput.value = '';
    placeLinkInput.value = '';
    closePopup(placeFormPopup);
}

/* Закрытие попапов нажатием на Esc */
function closeByEscape(evt) {
    if (evt.key === 'Escape') {
        const openedPopup = document.querySelector('.popup_opened');
        closePopup(openedPopup);
    }
}

/* Открытие */
export function openPopup(popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', closeByEscape);
}

/* Закрытие попапа */
export function closePopup(popup) {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', closeByEscape);
}

/* Если кликнули по оверлею или крестику любого из попапов - закрываем форму */
popups.forEach((popup) => {
    popup.addEventListener('mousedown', (evt) => {
        if (evt.target.classList.contains('popup_opened') ||
            evt.target.classList.contains('popup__close-button')) {
            closePopup(popup);
        }
    })
})


/* Форма профиля пользователя */
/* Добавляем шесть карточек «из коробки» */
initialCards.forEach(function (item) {
    const card = new Card(item, '#place-template');
    const cardElement = card.addCard();
    placeContainer.prepend(cardElement);
});

/* Открыть попап формы профиля пользователя по кнопке редактировать */
profileButtonRedact.addEventListener('click', () => {
    profileNameInput.value = profileInfoTitle.textContent;
    profileJobInput.value = profileInfoSubtitle.textContent;
    openPopup(profileFormPopup);
});
/* Отправка формы */
profileForm.addEventListener('submit', handleProfileFormSubmit);


/* Попап формы добавления места */
/* Отправка формы */
placeForm.addEventListener('submit', handlePlaceFormSubmit);

/* Включение валидации вызовом enableValidation все настройки передаются при вызове */
const profileFormValidator = new FormValidator(validationConfig, '.popup__form');
profileFormValidator.enableValidation(validationConfig);

/* Открыть попап формы добавления места */
profileButtonAdd.addEventListener('click', () => {
    openPopup(placeFormPopup);
});