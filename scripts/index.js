/* Попап */
const popupElement = document.querySelector('.popup');
const redactButton = document.querySelector('.info__redact-button');
const closeProfileButton = popupElement.querySelector('.popup__close-button');

/* Элементы попапа формы профиля пользователя */
const profileFormPopup = document.querySelector('#profileFormPopup');
const nameInput = popupElement.querySelector('.popup__form-name');
const jobInput = popupElement.querySelector('.popup__form-additional');
const infoTitle = document.querySelector('.info__title');
const infoSubtitle = document.querySelector('.info__subtitle');
const profileForm = document.forms.profileForm;

/* Элементы попапа формы добавления места */
const placeFormPopup = document.querySelector('#placeFormPopup');
const addPlaceButton = document.querySelector('.place__add-place');
const closePlaceButton = placeFormPopup.querySelector('.popup__close-button');
const placeForm = document.forms.placeForm;
const placeNameInput = placeFormPopup.querySelector('.popup__form-name');
const placeLinkInput = placeFormPopup.querySelector('.popup__form-additional');

/* Элементы попапа с фотографиями */
const picturePopup = document.querySelector('#picturePopup');
const closePictureButton = picturePopup.querySelector('.popup__close-button');

/* Стартовый набор мест */
const initialCards = [
    {
        name: 'Архыз',
        link: './images/arkhyz.jpg'
    },
    {
        name: 'Фестиваль',
        link: './images/festival.jpg'
    },
    {
        name: 'ГУМ Красная площадь',
        link: './images/gum.jpg'
    },
    {
        name: 'Исаакиевский собор',
        link: './images/isakievskiy.jpg'
    },
    {
        name: 'Казань мечеть',
        link: './images/kazayn.jpg'
    },
    {
        name: 'Ольхон',
        link: './images/olkhon.jpg'
    }
];

/* Добавить место используя шаблон карточки места */
const addPlace = (name, link) => {
    const placeContainer = document.querySelector('.places');
    const placeTemplate = document.querySelector('#place-template').content;
    const placeElement = placeTemplate.querySelector('.place').cloneNode(true);
    placeElement.querySelector('.place__image').src = link !== '' ? link : './images/no-photo.jpg';
    placeElement.querySelector('.place__image').alt = name !== '' ? name : '';
    placeElement.querySelector('.description__title').textContent = name !== '' ? name : 'Нет названия';
    placeContainer.prepend(placeElement);
};

/* Добавляем шесть карточек «из коробки» */
initialCards.forEach(function (item) {
    addPlace(item.name, item.link);
});

const addPicture = (name, link) => {
    picturePopup.querySelector('.popup__big-picture').src = link;
    picturePopup.querySelector('.popup__big-picture').alt = name;
    picturePopup.querySelector('.popup__picture-title').textContent = name;
}

/* Обработчик «отправки» формы профиля пользователя */
function formSubmitProfile(event) {
    event.preventDefault();
    infoTitle.textContent = nameInput.value;
    infoSubtitle.textContent = jobInput.value;
    popupToggle(profileFormPopup);
}

/* Обработчик «отправки» формы добавления места */
function formSubmitPlace(event) {
    event.preventDefault();
    addPlace(placeNameInput.value, placeLinkInput.value);
    placeNameInput.value = '';
    placeLinkInput.value = '';
    popupToggle(placeFormPopup);
}

/* Открытие|закрытие попапа */
function popupToggle(thisPopup) {
    if (!thisPopup.classList.contains('popup_opened')) {
        nameInput.value = infoTitle.innerHTML;
        jobInput.value = infoSubtitle.innerHTML;
    }
    thisPopup.classList.toggle('popup_opened');
}

/* Лайк */
function likeToggle(button) {
    button.classList.toggle('description__like_active');
}


/* Форма профиля пользователя */
/* Открыть попап формы профиля пользователя по кнопке редактировать */
redactButton.addEventListener('click', () => popupToggle(profileFormPopup));
/* Закрыть попап формы профиля пользователя на крестик */
closeProfileButton.addEventListener('click', () => popupToggle(profileFormPopup));
/* Отправка формы */
profileForm.addEventListener('submit', formSubmitProfile);


/* Попап формы добавления места */
/* Открыть попап формы добавления места */
addPlaceButton.addEventListener('click', () => popupToggle(placeFormPopup));
/* Закрыть попап формы добавления места на крестик */
closePlaceButton.addEventListener('click', () => popupToggle(placeFormPopup));
/* Отправка формы */
placeForm.addEventListener('submit', formSubmitPlace);
/* Лайк */
document.addEventListener('click', event => {
    if (event.target.classList.contains('description__like')) {
        event.target.classList.toggle('description__like_active');
    }
});
/* Удаление места */
document.addEventListener('click', event => {
    if (event.target.classList.contains('description__delete')) {
        event.target.closest('.place').remove();
    }
});


/* Попап фотографии */
/* Открыть попап c картинкой */
document.addEventListener('click', event => {
    if (event.target.classList.contains('place__image')) {
        addPicture(event.target.alt, event.target.src);
        popupToggle(picturePopup);
    }
});
/* Закрыть попап с картинкой на крестик */
closePictureButton.addEventListener('click', () => popupToggle(picturePopup));































