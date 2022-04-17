/* Элементы попапа формы профиля пользователя */
const profileButtonRedact = document.querySelector('.info__redact-button');
const profileFormPopup = document.querySelector('.popup_profile');
const profileNameInput = profileFormPopup.querySelector('.popup__form-name');
const profileJobInput = profileFormPopup.querySelector('.popup__form-additional');
const profileButtonClose = profileFormPopup.querySelector('.popup__close-button');
const profileInfoTitle = document.querySelector('.info__title');
const profileInfoSubtitle = document.querySelector('.info__subtitle');
const profileButtonAdd = document.querySelector('.profile__add-place-button');
const profileForm = document.forms.profileForm;

/* Элементы попапа формы добавления места */
const placeFormPopup = document.querySelector('.popup_place');
const placeButtonClose = placeFormPopup.querySelector('.popup__close-button');
const placeForm = document.forms.placeForm;
const placeNameInput = placeFormPopup.querySelector('.popup__form-name');
const placeLinkInput = placeFormPopup.querySelector('.popup__form-additional');

/* Элементы попапа с фотографиями */
const picturePopup = document.querySelector('.popup_picture');
const pictureButtonClose = picturePopup.querySelector('.popup__close-button');
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

/* Добавить место используя шаблон карточки места */
const addPlace = (name, link) => {
    const placeElement = placeTemplate.cloneNode(true);
    const placeImage = placeElement.querySelector('.place__image');
    const placeLike = placeElement.querySelector('.description__like');
    const placeDelete = placeElement.querySelector('.description__delete');
    placeImage.src = link !== '' ? link : './images/no-photo.jpg';
    placeImage.alt = name !== '' ? name : '';
    placeElement.querySelector('.description__title').textContent = name !== '' ? name : 'Нет названия';
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
function formSubmitProfile(event) {
    event.preventDefault();
    profileInfoTitle.textContent = profileNameInput.value;
    profileInfoSubtitle.textContent = profileJobInput.value;
    closePopup(profileFormPopup);
}

/* Обработчик «отправки» формы добавления места */
function formSubmitPlace(event) {
    event.preventDefault();
    placeContainer.prepend(addPlace(placeNameInput.value, placeLinkInput.value));
    placeNameInput.value = '';
    placeLinkInput.value = '';
    closePopup(placeFormPopup);
}

/* Закрытие попапов нажатием на Esc */
function closeOnEsc(evt) {
    if (evt.key === 'Escape') {
        this.popup.classList.remove('popup_opened');
    }
}

/* Открытие */
function openPopup(popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', {handleEvent: closeOnEsc, popup: popup});
}

/* Закрытие попапа */
function closePopup(popup) {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', {handleEvent: closeOnEsc, popup: popup});
}

/* Лайк */
function likeToggle(button) {
    button.classList.toggle('description__like_active');
}

/* Закрытие попапа кликом на оверлей */
function closeOnMissClick(evt) {
    if (evt.target.classList.contains('popup_opened')) {
        evt.target.classList.remove('popup_opened');
    }
}

/* Форма профиля пользователя */
/* Открыть попап формы профиля пользователя по кнопке редактировать */
profileButtonRedact.addEventListener('click', () => {
    profileNameInput.value = profileInfoTitle.textContent;
    profileJobInput.value = profileInfoSubtitle.textContent;
    openPopup(profileFormPopup);

    /* При открытии формы валидируем поля, там как они заполняются у нас через js и изначально не валидны */
    const inputList = Array.from(profileForm.querySelectorAll(validationConfig.inputSelector));
    const buttonElement = profileForm.querySelector(validationConfig.submitButtonSelector);
    inputList.forEach((inputElement) => {
        checkInputValidity(profileForm, inputElement, validationConfig);
        toggleButtonState(inputList, buttonElement, validationConfig);
    });
});
/* Закрыть попап формы профиля пользователя на крестик */
profileButtonClose.addEventListener('click', () => closePopup(profileFormPopup));
/* Отправка формы */
profileForm.addEventListener('submit', formSubmitProfile);


/* Попап формы добавления места */
/* Открыть попап формы добавления места */
profileButtonAdd.addEventListener('click', () => openPopup(placeFormPopup));
/* Закрыть попап формы добавления места на крестик */
placeButtonClose.addEventListener('click', () => closePopup(placeFormPopup));
/* Отправка формы */
placeForm.addEventListener('submit', formSubmitPlace);


/* Попап фотографии */
/* Закрыть попап с картинкой на крестик */
pictureButtonClose.addEventListener('click', () => closePopup(picturePopup));

/* Закрытие попапов кликом на оверлей */
document.addEventListener('mousedown', closeOnMissClick);