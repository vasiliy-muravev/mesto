/* Попап */
const popupElement = document.querySelector('.popup');
const redactButton = document.querySelector('.info__redact-button');
const closeButton = popupElement.querySelector('.popup__close-button');

/* Форма */
const form = popupElement.querySelector('.popup__form');
/* Поля формы */
const nameInput = popupElement.querySelector('.popup__form-name');
const jobInput = popupElement.querySelector('.popup__form-profession');
const infoTitle = document.querySelector('.info__title');
const infoSubtitle = document.querySelector('.info__subtitle');

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

/* Шаблон карточки места */
const addPlace = (name, link) => {
    const placeContainer = document.querySelector('.places');
    const placeTemplate = document.querySelector('#place-template').content;
    const placeElement = placeTemplate.querySelector('.place').cloneNode(true);
    placeElement.querySelector('.place__image').src = link;
    placeElement.querySelector('.place__image').alt = name;
    placeElement.querySelector('.description__title').textContent = name;
    placeContainer.prepend(placeElement);
};

/* Шесть карточек «из коробки» */
initialCards.forEach(function (item) {
    addPlace(item.name, item.link);
});


/* Обработчик «отправки» формы */
function formSubmitHandler(event) {
    event.preventDefault();
    infoTitle.textContent = nameInput.value;
    infoSubtitle.textContent = jobInput.value;
    popupToggle();
}

/* Открытие|закрытие попапа */
function popupToggle() {
    if (!popupElement.classList.contains('popup_opened')) {
        nameInput.value = infoTitle.innerHTML;
        jobInput.value = infoSubtitle.innerHTML;
    }
    popupElement.classList.toggle('popup_opened');
}

/* Открыть попап по кнопке редактировать */
redactButton.addEventListener('click', popupToggle);

/* Закрыть попап на крестик */
closeButton.addEventListener('click', popupToggle);

/* Отправка формы */
form.addEventListener('submit', formSubmitHandler);

/* */