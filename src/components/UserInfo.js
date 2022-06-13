export class UserInfo {
    constructor(nameSelector, aboutSelector, avatarSelector, data) {
        this._nameElement = document.querySelector(nameSelector);
        this._aboutElement = document.querySelector(aboutSelector);
        this._avatarElement = document.querySelector(avatarSelector);
        this._data = data;
    }

    /* Возвращает объект с данными пользователя.
    Этот метод пригодится когда данные пользователя нужно будет подставить в форму при открытии */
    getUserInfo = () => {
        return {
            profileFormName: this._nameElement.textContent,
            // profileFormName: this._data.name,
            profileFormProfession: this._aboutElement.textContent
            // profileFormProfession: this._data.about
        }
    }

    /* Принимает новые данные пользователя и добавляет их на страницу */
    setUserInfo = (data) => {
        this._nameElement.textContent = data.name;
        // this._nameElement.textContent = data.profileFormName;
        this._aboutElement.textContent = data.about;
        // this._aboutElement.textContent = data.profileFormProfession;
        this._avatarElement.alt = data.name;
    }

    setUserAvatar = (data) => {
        this._avatarElement.src = data.avatar;
        this._avatarElement.id = data._id;
    }
}