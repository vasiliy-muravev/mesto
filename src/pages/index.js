import "./index.css";
import {Card} from "../components/Card.js";
import {FormValidator} from "../components/FormValidator.js";
import {PopupWithImage} from "../components/PopupWithImage.js";
import {Section} from "../components/Section.js";
import {UserInfo} from "../components/UserInfo.js";
import {PopupWithForm} from "../components/PopupWithForm.js";
import {Api} from "../components/Api.js";
import {PopupWithConfirmation} from "../components/PopupWithConfirmation.js";

/* Элементы попапа формы профиля пользователя */
const profileButtonRedact = document.querySelector('.info__redact-button');
const profileButtonAdd = document.querySelector('.profile__add-place-button');
const profileForm = document.forms.profileForm;
const profileNameInput = profileForm.querySelector('.popup__form-name');
const profileJobInput = profileForm.querySelector('.popup__form-additional');

/* Элементы попапа формы добавления места */
const placeForm = document.forms.placeForm;

/* Элементы попапа формы изменения аватарки */
const avatarForm = document.forms.avatarChangeForm;
const avatarButton = document.querySelector('.profile__avatar-button');

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

const submitButton = document.querySelector(validationConfig.submitButtonSelector);

const api = new Api();

/* Создание и наполнение данными разметки карточки */
function getCard(data, userId) {
    const card = new Card({
        data: data,
        currentUserId: userId,
        handleCardClick: () => {
            popupWithImage.open(data);
        },
        handleLikeClick: (cardId) => {
            let currentCard = document.getElementById(cardId);
            let countLikes = currentCard.querySelector('.description__like-count');
            if (!card.checkIfLiked()) {
                api.setlike(cardId).then(res => {
                    if (res.ok) {
                        return res.json();
                    }
                }).then((data) => {
                    console.log('Ставим лайк', data.likes.length);
                    countLikes.textContent = data.likes.length;
                }).catch((err) => {
                    console.log(err);
                });
            } else {
                api.unsetlike(cardId).then(res => {
                    if (res.ok) {
                        return res.json();
                    }
                }).then((data) => {
                    console.log('Снимаем лайк', data.likes.length);
                    countLikes.textContent = data.likes.length;
                }).catch((err) => {
                    console.log(err);
                });
            }
        },
    }, '#place-template');
    return card.addCard();
}

function renameButton(popupSelector, text) {
    const popup = document.querySelector(popupSelector);
    const submit = popup.querySelector('.popup__form-submit-btn');
    submit.textContent = text;
}

api.getAppInfo()
    .then(([userData, cardsData]) => {
        /* Добавляем карточки «из коробки» */
        const cardList = new Section({
            items: cardsData,
            renderer: (item) => {
                return getCard(item, userData._id);
            }
        }, '.places');
        cardList.renderItems();

        /* Обработчик отправки формы добавления места */
        const placePopupWithForm = new PopupWithForm({
                popupSelector: '.popup_place',
                handleFormSubmit: (data) => {
                    renameButton('.popup_place', 'Сохранение...');
                    api.addCard(data).then(() => {
                        cardList.addItem(getCard(data, userData._id));
                        placePopupWithForm.close();
                        placeFormValidator.toggleButtonState();
                        renameButton('.popup_place', 'Сохранить');
                    })
                        .catch((err) => {
                            console.log(err);
                        });
                }
            }
        );
        placePopupWithForm.setEventListeners();

        /* Открытие попап формы добавления места */
        profileButtonAdd.addEventListener('click', () => {
            placePopupWithForm.open();
        });


        /* Обработчик «отправки» формы профиля пользователя */
        const userInfo = new UserInfo(
            '.info__title',
            '.info__subtitle',
            '.profile__avatar-img'
        );
        userInfo.setUserInfo(userData);
        userInfo.setUserAvatar(userData);
        const profilePopupWithForm = new PopupWithForm({
                popupSelector: '.popup_profile',
                handleFormSubmit: (formData) => {
                    renameButton('.popup_profile', 'Сохранение...');
                    api.setUserData(formData).then(() => {
                        userInfo.setUserInfo(formData);
                        profilePopupWithForm.close();
                        renameButton('.popup_profile', 'Сохранить');
                    })
                        .catch((err) => {
                            console.log(err);
                        });
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


        /* Попап с удалением места */
        const popupWithConfirmation = new PopupWithConfirmation({
            popupSelector: '.popup_place-delete',
            handleFormSubmit: () => {
                const cardId = popupWithConfirmation.getCardId();
                let card = document.getElementById(cardId);
                api.deleteCard(cardId).then(() => {
                    card.remove();
                    card = null;
                    popupWithConfirmation.close();
                })
                    .catch((err) => {
                        console.log(err);
                    });
            }
        });
        popupWithConfirmation.setEventListeners();


        /* Попап с изменением аватарки */
        const popupWithAvatar = new PopupWithForm({
            popupSelector: '.popup_avatar-change',
            handleFormSubmit: (formData) => {
                renameButton('.popup_avatar-change', 'Сохранение...');
                api.setAvatar(formData).then(res => {
                    if (res.ok) {
                        return res.json();
                    }
                }).then((userData) => {
                    userInfo.setUserAvatar(userData);
                    popupWithAvatar.close();
                    renameButton('.popup_avatar-change', 'Сохранить');
                })
            }
        });
        popupWithAvatar.setEventListeners();

        /* Открытие попап формы добавления места */
        avatarButton.addEventListener('click', () => {
            popupWithAvatar.open();
        });
    });


/* Включение валидации формы изменения профиля */
const profileFormValidator = new FormValidator(validationConfig, profileForm);
profileFormValidator.enableValidation();

/* Включение валидации формы добавления места */
const placeFormValidator = new FormValidator(validationConfig, placeForm);
placeFormValidator.enableValidation();

/* Включение валидации формы аватарки */
const avatarFormValidator = new FormValidator(validationConfig, avatarForm);
avatarFormValidator.enableValidation();
