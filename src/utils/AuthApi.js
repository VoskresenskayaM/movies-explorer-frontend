/*import { SERVER_MAIN_URL }  from '../utils/Constants';*/
const SERVER_MAIN_URL= 'http://localhost:3001';
export const register = ( name, email, password ) => {
    return fetch(`${SERVER_MAIN_URL }/signup`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, email, password })
    })
        .then((response) => {
            /*try {
               const res = {
                status: response.statusCode,
                data: response.json()
               }
                    return response
            } catch (e) {
                return (e)
            }*/
            return response
        })
       /* .then((data) => {
            return data;
        })*/
        .catch((err) => console.log(err));
    }
        
export const authorize = (email, password) => {
    return fetch(`${SERVER_MAIN_URL }/signin`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    })
        .then((response) => {return response}
            /*(response => response/*json())*/)
        /*.then((data) => {
            if (data.token) {
                localStorage.setItem("token", data.token);
                return data.token;
            }
        })*/
        .catch(err => console.log(err))
};

export const getCurrentUser = (token) => {
    return fetch(`${SERVER_MAIN_URL }/users/me`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    })
        .then(res => res.json())
        .then(data => data)
        .catch(err => console.log(err));
}