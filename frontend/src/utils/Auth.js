export const BASE_URL = 'https://api.oxsid.nomoredomains.rocks';

export const register = (email, password) => {
    return fetch(`${BASE_URL}/signup`, {
        method: 'POST',
        headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({email, password})
    })
    .then((res) =>{
        if (res.ok) {
            return res.json();
          }
          return Promise.reject(`Что-то пошло не так: ${res.status}`);
        })
    .then((res) => {
        return res;
    })
};
export const authorize = (email, password) => {
    return fetch(`${BASE_URL}/signin`, {
        method: 'POST',
        credentials: 'include',
        headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            password: password,
            email: email,
          }),
  })
    .then((res) =>{
        if (res.ok) {
            return res.json();
          }
          return Promise.reject(`Что-то пошло не так: ${res.status}`);
        })
    .then((data) => {
        if (data){
            localStorage.setItem('jwt', data);            
            return data;
        }
    })
    .catch(err => console.log(err))
};
export const checkToken = (token) => {
    return fetch(`${BASE_URL}/users/me`, {
        method: "GET",
        credentials: 'include',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        }
    })
    .then((res) => res.json())
    .then((data) => data)
    .catch(err => console.log(err))
}