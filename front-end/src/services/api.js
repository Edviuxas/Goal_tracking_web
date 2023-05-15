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
};

export const createGoal = (goalInfo) => {
    const headers = {
        "Content-Type": "application/json",
        "Accept": "application/json",
    };
    return axios.post('http://localhost:8080/goal', goalInfo, { headers }).then(res => res.data);
};

export const getGoals = async (userInfo) => {
    const headers = {
        "Content-Type": "application/json",
        "Accept": "application/json",
    };
    const allGoals = await axios.get('http://localhost:8080/goals', { headers }).then(res => res.data);
    return allGoals.filter(goal => goal.createdBy === userInfo.id);
};

export const deleteGoal = async (goalId) => {
    const headers = {
        "Content-Type": "application/json",
        "Accept": "application/json",
    };
    return axios.delete(`http://localhost:8080/goal/${goalId}`).then(res => res.data);
}