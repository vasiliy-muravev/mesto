import { Card } from "./Card.js";

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

/* Элементы попапа с фотографиями */
const picturePopup = document.querySelector('.popup_picture');
const pictureBig = picturePopup.querySelector('.popup__big-picture');
const pictureTitle = picturePopup.querySelector('.popup__picture-title');

/* Шаблон карточки места */
const placeContainer = document.querySelector('.places');
const placeTemplate = document.querySelector('#place-template').content.querySelector('.place');

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





/* ОПП начало */
const placeCard = new Card(placeTemplate);
console.log(placeCard);

initialCards.forEach(function (item) {
    const card = new Card(item, '#place-template');
    const cardElement = card.addCard();
    placeContainer.prepend(cardElement);


    // placeContainer.prepend(addPlace(item.name, item.link));
});






/* ОПП конец */





/* Добавить место используя шаблон карточки места */
const addPlace = (name, link) => {
    const placeElement = placeTemplate.cloneNode(true);
    const placeImage = placeElement.querySelector('.place__image');
    const placeLike = placeElement.querySelector('.description__like');
    const placeDelete = placeElement.querySelector('.description__delete');
    placeImage.src = link;
    placeImage.alt = name;
    placeElement.querySelector('.description__title').textContent = name;
    placeLike.addEventListener('click', event => {
        event.target.classList.toggle('description__like_active');
    });
    placeDelete.addEventListener('click', event => {
        event.target.closest('.place').remove();
    });
    placeImage.addEventListener('click', () => {
        addPicture(name, link);
        openPopup(picturePopup);
    });
    return placeElement;
};

/* Добавляем шесть карточек «из коробки» */
initialCards.forEach(function (item) {
    placeContainer.prepend(addPlace(item.name, item.link));
});

const addPicture = (name, link) => {
    pictureBig.src = link;
    pictureBig.alt = name;
    pictureTitle.textContent = name;
}

/* Обработчик «отправки» формы профиля пользователя */
function handleProfileFormSubmit(event) {
    event.preventDefault();
    profileInfoTitle.textContent = profileNameInput.value;
    profileInfoSubtitle.textContent = profileJobInput.value;
    closePopup(profileFormPopup);
}

/* Обработчик «отправки» формы добавления места */
function handlePlaceFormSubmit(event) {
    event.preventDefault();
    placeContainer.prepend(addPlace(placeNameInput.value, placeLinkInput.value));
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
function openPopup(popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', closeByEscape);
}

/* Закрытие попапа */
function closePopup(popup) {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', closeByEscape);
}

/* Лайк */
function likeToggle(button) {
    button.classList.toggle('description__like_active');
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
/* Открыть попап формы профиля пользователя по кнопке редактировать */
profileButtonRedact.addEventListener('click', () => {
    profileNameInput.value = profileInfoTitle.textContent;
    profileJobInput.value = profileInfoSubtitle.textContent;
    openPopup(profileFormPopup);
});
/* Отправка формы */
profileForm.addEventListener('submit', handleProfileFormSubmit);


/* Попап формы добавления места */
/* Открыть попап формы добавления места */
profileButtonAdd.addEventListener('click', () => {
    openPopup(placeFormPopup);
    /* При открытии формы валидируем поля, там как они изначально пустые и не валидны */
    const inputList = Array.from(placeForm.querySelectorAll(validationConfig.inputSelector));
    const buttonElement = placeForm.querySelector(validationConfig.submitButtonSelector);
    inputList.forEach((inputElement) => {
        toggleButtonState(inputList, buttonElement, validationConfig);
    });
});
/* Отправка формы */
placeForm.addEventListener('submit', handlePlaceFormSubmit);