import axios from 'axios';

export const registerUser = (userInfo) => {
    const headers = {
        "Content-Type": "application/json",
        "Accept": "application/json",
    };
    return axios.post('http://localhost:8080/register', userInfo, { headers }).then(res => res.data);
}

// exports.loginUser = (userInfo) => {
//     return fetch(`http://localhost:8080/login`, {
//         method: 'POST',
//         headers: {
//             "Content-Type": "application/json",
//             "Accept": "application/json",
//         },
//         body: JSON.stringify(userInfo)
//     })
//     .then(res => res.json())
// }

export const loginUser = (userInfo) => {
    const headers = {
        "Content-Type": "application/json",
        "Accept": "application/json",
    };
    return axios.post('http://localhost:8080/login', userInfo, { headers }).then(res => res.data);
    // axios({
    //     method: 'post',
    //     url: 'http://localhost:8080/login',
    //     headers: {
    //         "Content-Type": "application/json",
    //         "Accept": "application/json",
    //     },
    //     data: userInfo,
    // }).then(data => console.log(data));
};