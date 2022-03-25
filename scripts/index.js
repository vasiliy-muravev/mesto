const popupElement = document.querySelector('.popup');
const redactButton = document.querySelector('.info__redact-button');
const closeButton = popupElement.querySelector('.popup__close-button');
const ESC_KEY = "Escape";

/* Открытие попапа */
function openPopup() {
    popupElement.classList.add('popup_opened');
    document.addEventListener('keyup', onDocumentKeyUp);
}

/* Закрытие попапа */
function closePopup() {
    popupElement.classList.remove('popup_opened');
    document.removeEventListener('keyup', onDocumentKeyUp);
}

/* Обработчик клавиши Esc */
function onDocumentKeyUp(event) {
    if (event.key === ESC_KEY) {
        closePopup();
    }
}

/* Открыть попап по кнопке редактировать */
redactButton.addEventListener('click', openPopup);

/* Закрыть попап на крестик */
closeButton.addEventListener('click', closePopup);

/* Кнопка сохранить */
let formSubmit = popupElement.querySelector('.popup__form-submit-btn');
/* Поля формы */
let nameInput = popupElement.querySelector('.popup__form-name');
let jobInput = popupElement.querySelector('.popup__form-profession');
let infoTitle = document.querySelector('.info__title');
let infoSubtitle = document.querySelector('.info__subtitle');


/* Обработчик «отправки» формы */
function formSubmitHandler(event) {
    event.preventDefault();
    console.log(nameInput.value);
    infoTitle.textContent = nameInput.value;
    infoSubtitle.textContent = jobInput.value;
    closePopup();
}

/* Отправка формы */
formSubmit.addEventListener('click', formSubmitHandler);