/* Попап */
const popupElement = document.querySelector('.popup');
const redactButton = document.querySelector('.info__redact-button');
const closeButton = popupElement.querySelector('.popup__close-button');

/* Форма */
const form = popupElement.querySelector('.popup__form');
/* Поля формы */
let nameInput = popupElement.querySelector('.popup__form-name');
let jobInput = popupElement.querySelector('.popup__form-profession');
let infoTitle = document.querySelector('.info__title');
let infoSubtitle = document.querySelector('.info__subtitle');

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