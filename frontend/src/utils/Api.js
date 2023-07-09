class Api {

    constructor(options) {
        this._credentials = options.credentials;
        this._url = options.url;
      }

    getProfile = () => {
        return fetch(this._baseUrl + '/users/me', {
            credentials: this._credentials,
            headers: {
                "Content-Type": "application/json",
            },
        })
        .then(res => this._chekStatus(res))
    };
    
    getCards = () => {
       return  fetch(this._baseUrl + '/cards', {
            credentials: this._credentials,
            headers: {
                "Content-Type": "application/json",
            },
        })  
        .then(res => this._chekStatus(res))
    };
    
    changeProfile = (name, about) => {
        return  fetch(this._baseUrl + '/users/me', {
            method: 'PATCH',
            credentials: this._credentials,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                about: about
            }) 
         })
            .then(res => this._chekStatus(res))
        };
    
    addNewPost = (data) => {
        return  fetch(this._baseUrl + '/cards', {
            method: 'POST',
            credentials: this._credentials,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                link: data.link,
                name: data.place,
            }) 
         })
            .then(res => this._chekStatus(res))
        };
    
    deletCard = (id) => {
        return  fetch(this._baseUrl + '/cards/' + id, {
            method: 'DELETE',
            credentials: this._credentials,
            headers: {
                "Content-Type": "application/json",
            },
        })
        .then(res => this._chekStatus(res))
    };

    changeAvatar = (data) => {
        return fetch(`${this._baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        credentials: this._credentials,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            avatar: data,
        }) 
    })
        .then(res => this._chekStatus(res))
}

    putLike = (id) => {
        return  fetch(this._baseUrl + '/cards/' + id + '/likes', {
            method: 'PUT',
            credentials: this._credentials,
            headers: {
                "Content-Type": "application/json",
            },
        })
        .then(res => this._chekStatus(res))
    }

    deletLike = (id) => {
        return  fetch(this._baseUrl + '/cards/' + id + '/likes', {
            method: 'DELETE',
            credentials: this._credentials,
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then(res => this._chekStatus(res))
    }

    changeLikeCardStatus = (id, isLiked) => {
        if (!isLiked){
            return  fetch(this._baseUrl + '/cards/' + id + '/likes', {
                method: 'PUT',
                credentials: this._credentials,
                headers: {
                    "Content-Type": "application/json",
                },
            })
            .then(res => this._chekStatus(res))
        }
        else{
            return  fetch(this._baseUrl + '/cards/' + id + '/likes', {
                method: 'DELETE',
                credentials: this._credentials,
                headers: {
                    "Content-Type": "application/json",
                },
            })
                .then(res => this._chekStatus(res))
        }
    }
    
    _chekStatus(res){
        return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)
    }
}
const api = new Api({
    credentials: 'include',
    url: 'https://api.oxsid.nomoredomains.rocks',
});

export default api;