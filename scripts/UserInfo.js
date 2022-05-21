export class UserInfo {
    _nameElement;
    _aboutElement;

    constructor(nameSelector, aboutSelector) {
        this._nameElement = document.querySelector(nameSelector);
        this._aboutElement = document.querySelector(aboutSelector);
    }

    /* Возвращает объект с данными пользователя.
    Этот метод пригодится когда данные пользователя нужно будет подставить в форму при открытии */
    getUserInfo = () => {
        return {
            name: this._nameElement.value,
            about: this._aboutElement.value
        }
    }

    /* Принимает новые данные пользователя и добавляет их на страницу */
    setUserInfo = (data) => {
        this._nameElement.value = data.name;
        this._aboutElement.value = data.about;
    }
}