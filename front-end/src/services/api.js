exports.registerUser = (userInfo) => {
    return fetch(`http://localhost:8080/register`, {
        method: 'POST',
        crossDomain: true,
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
        },
        body: JSON.stringify(userInfo)
    })
    .then(res => res.json())
    .then((data) => {
        console.log(data, "userRegister");
    })
}

exports.loginUser = (userInfo) => {
    return fetch(`http://localhost:8080/login`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
        },
        body: JSON.stringify(userInfo)
    })
    .then(res => res.json())
}
