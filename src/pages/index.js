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

const api = new Api('https://mesto.nomoreparties.co/v1/cohort-42/');

/* Попап с удалением места */
const popupWithConfirmation = new PopupWithConfirmation({
    popupSelector: '.popup_place-delete',
    handleFormSubmit: () => {
        /* Удаление реализовано через получение id карточки из попапа удаления места */
        const cardId = popupWithConfirmation.getCardId();
        api.deleteCard(cardId).then(() => {
            popupWithConfirmation.removeCard(cardId);
            popupWithConfirmation.close();
        })
            .catch((err) => {
                console.log(err);
            });
    }
});
popupWithConfirmation.setEventListeners();


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

            if (!card.checkIfLiked()) {
                api.setlike(cardId)
                    .then(res => api._getResponseData(res))
                    .then((data) => {
                        console.log('Ставим лайк', data.likes.length);
                        card.likeCard(currentCard, data);
                    }).catch((err) => {
                    console.log(err);
                });
            } else {
                api.unsetlike(cardId)
                    .then(res => api._getResponseData(res))
                    .then((data) => {
                        console.log('Снимаем лайк', data.likes.length);
                        card.likeCard(currentCard, data);
                    }).catch((err) => {
                    console.log(err);
                });
            }
        },
        /* Открытие попапа формы с удалением места */
        handleDeleteClick: () => {
            popupWithConfirmation.open();
        },
    }, '#place-template');
    return card.createCard();
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
                    })
                        .catch((err) => {
                            console.log(err);
                        })
                        .finally(() => {
                            renameButton('.popup_place', 'Сохранить');
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
                    })
                        .catch((err) => {
                            console.log(err);
                        })
                        .finally(() => {
                            renameButton('.popup_profile', 'Сохранить');
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


        /* Попап с изменением аватарки */
        const popupWithAvatar = new PopupWithForm({
            popupSelector: '.popup_avatar-change',
            handleFormSubmit: (formData) => {
                renameButton('.popup_avatar-change', 'Сохранение...');
                api.setAvatar(formData)
                    .then(res => api._getResponseData(res))
                    .then((userData) => {
                        userInfo.setUserAvatar(userData);
                        popupWithAvatar.close();
                    }).catch((err) => {
                    console.log(err);
                })
                    .finally(() => {
                        renameButton('.popup_avatar-change', 'Сохранить');
                    });
            }
        });
        popupWithAvatar.setEventListeners();
        /* Открытие попапа формы добавления места */
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
