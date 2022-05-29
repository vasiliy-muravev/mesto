export class UserInfo {
    constructor(nameSelector, aboutSelector) {
        this._nameElement = document.querySelector(nameSelector);
        this._aboutElement = document.querySelector(aboutSelector);
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
        this._nameElement.textContent = data.profileFormName;
        this._aboutElement.textContent = data.profileFormProfession;
    }
}