/* Элементы попапа формы профиля пользователя */
const profileButtonRedact = document.querySelector('.info__redact-button');
const profileFormPopup = document.querySelector('.popup__profile-form');
const profileNameInput = profileFormPopup.querySelector('.popup__form-name');
const profileJobInput = profileFormPopup.querySelector('.popup__form-additional');
const profileButtonClose = profileFormPopup.querySelector('.popup__close-button');
const profileInfoTitle = document.querySelector('.info__title');
const profileInfoSubtitle = document.querySelector('.info__subtitle');
const profileButtonAdd = document.querySelector('.profile__add-place-button');
const profileForm = document.forms.profileForm;

/* Элементы попапа формы добавления места */
const placeFormPopup = document.querySelector('.popup__place-form');
const placeButtonClose = placeFormPopup.querySelector('.popup__close-button');
const placeForm = document.forms.placeForm;
const placeNameInput = placeFormPopup.querySelector('.popup__form-name');
const placeLinkInput = placeFormPopup.querySelector('.popup__form-additional');

/* Элементы попапа с фотографиями */
const picturePopup = document.querySelector('.popup__picture-popup');
const pictureButtonClose = picturePopup.querySelector('.popup__close-button');
const pictureBig = picturePopup.querySelector('.popup__big-picture');
const pictureTitle = picturePopup.querySelector('.popup__picture-title');

/* Шаблон карточки места */
const placeContainer = document.querySelector('.places');
const placeTemplate = document.querySelector('#place-template').content.querySelector('.place');

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
    placeImage.addEventListener('click', event => {
        addPicture(event.target.alt, event.target.src);
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

/* Открытие */
function openPopup(popup) {
    profileNameInput.value = profileInfoTitle.innerHTML;
    profileJobInput.value = profileInfoSubtitle.innerHTML;
    popup.classList.add('popup_opened');
}

/* Закрытие попапа */
function closePopup(popup) {
    popup.classList.remove('popup_opened');
}

/* Лайк */
function likeToggle(button) {
    button.classList.toggle('description__like_active');
}


/* Форма профиля пользователя */
/* Открыть попап формы профиля пользователя по кнопке редактировать */
profileButtonRedact.addEventListener('click', () => openPopup(profileFormPopup));
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