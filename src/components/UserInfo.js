export class UserInfo {
    constructor(nameSelector, aboutSelector, avatarSelector) {
        this._nameElement = document.querySelector(nameSelector);
        this._aboutElement = document.querySelector(aboutSelector);
        this._avatarElement = document.querySelector(avatarSelector);
    }

    /* Возвращает объект с данными пользователя.
    Этот метод пригодится когда данные пользователя нужно будет подставить в форму при открытии */
    getUserInfo = () => {
        return {
            profileFormName: this._nameElement.textContent,
            profileFormProfession: this._aboutElement.textContent
        }
    }

    /* Принимает новые данные пользователя и добавляет их на страницу */
    setUserInfo = (data) => {
        this._nameElement.textContent = data.name;
        this._aboutElement.textContent = data.about;
        this._avatarElement.alt = data.name;
    }

    setUserAvatar = (data) => {
        this._avatarElement.src = data.avatar;
        this._avatarElement.id = data._id;
    }
}