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
            profileFormName: this._nameElement.value,
            profileFormProfession: this._aboutElement.value
        }
    }

    /* Принимает новые данные пользователя и добавляет их на страницу */
    setUserInfo = (data) => {
        console.log(data.target.profileFormName.value, data.target.profileFormProfession.value);
        this._nameElement.textContent = data.target.profileFormName.value;
        this._aboutElement.textContent = data.target.profileFormProfession.value;
    }
}