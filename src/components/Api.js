export class Api {
    constructor() {
        this.headers = {
            authorization: '0ed12c18-e80a-434a-9e00-41eb70564c88',
            'Content-Type': 'application/json'
        };
    }

    getAppInfo() {
        return Promise.all([this.getUserData(), this.getInitialCards()]);
    }

    getInitialCards() {
        this.url = 'https://mesto.nomoreparties.co/v1/cohort-42/cards';
        return fetch(this.url, {
            headers: this.headers
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }

                // если ошибка, отклоняем промис
                return Promise.reject(`Ошибка: ${res.status}`);
            })
    }

    getUserData() {
        this.url = 'https://mesto.nomoreparties.co/v1/cohort-42/users/me';
        return fetch(this.url, {
            headers: this.headers
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }

                // если ошибка, отклоняем промис
                return Promise.reject(`Ошибка: ${res.status}`);
            })
    }

    setUserData(data) {
        this.url = 'https://mesto.nomoreparties.co/v1/cohort-42/users/me';
        return fetch(this.url, {
            method: 'PATCH',
            headers: this.headers,
            body: JSON.stringify({
                name: data.name,
                about: data.about
            })
        });
    }

    addCard(data) {
        this.url = 'https://mesto.nomoreparties.co/v1/cohort-42/cards';
        return fetch(this.url, {
            method: 'POST',
            headers: this.headers,
            body: JSON.stringify({
                name: data.name,
                link: data.link
            })
        });
    }

    deleteCard(cardId) {
        this.url = 'https://mesto.nomoreparties.co/v1/cohort-42/cards/' + cardId;
        return fetch(this.url, {
            method: 'DELETE',
            headers: this.headers,
        });
    }
}

