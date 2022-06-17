export class Api {
    constructor(baseUrl) {
        this.headers = {
            authorization: '0ed12c18-e80a-434a-9e00-41eb70564c88',
            'Content-Type': 'application/json'
        };
        this._baseUrl = baseUrl;
    }

    getAppInfo() {
        return Promise.all([this.getUserData(), this.getInitialCards()]);
    }

    getInitialCards() {
        this.url = this._baseUrl + 'cards';
        return fetch(this.url, {
            headers: this.headers
        })
            .then(res => this._getResponseData(res))
    }

    getUserData() {
        this.url = this._baseUrl + 'users/me';
        return fetch(this.url, {
            headers: this.headers
        })
            .then(res => this._getResponseData(res))
    }

    setUserData(data) {
        this.url = this._baseUrl + 'users/me';
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
        this.url = this._baseUrl + 'cards';
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
        this.url = this._baseUrl + 'cards/' + cardId;
        return fetch(this.url, {
            method: 'DELETE',
            headers: this.headers,
        });
    }

    setlike(cardId) {
        this.url = this._baseUrl + 'cards/' + cardId + '/likes';
        return fetch(this.url, {
            method: 'PUT',
            headers: this.headers,
        });
    }

    unsetlike(cardId) {
        this.url = this._baseUrl + 'cards/' + cardId + '/likes';
        return fetch(this.url, {
            method: 'DELETE',
            headers: this.headers,
        });
    }

    setAvatar(data) {
        console.log(data);
        this.url = this._baseUrl + 'users/me/avatar';
        return fetch(this.url, {
            method: 'PATCH',
            headers: this.headers,
            body: JSON.stringify({
                avatar: data.link,
            })
        });
    }

    _getResponseData(res) {
        if (!res.ok) {
            return Promise.reject(`Ошибка: ${res.status}`);
        }
        return res.json();
    }
}

