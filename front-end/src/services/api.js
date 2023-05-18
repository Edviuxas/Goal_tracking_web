import axios from 'axios';

export const registerUser = (userInfo) => {
    const headers = {
        "Content-Type": "application/json",
        "Accept": "application/json",
    };
    return axios.post('http://localhost:8080/register', userInfo, { headers }).then(res => res.data);
}

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
    return axios.delete(`http://localhost:8080/goal/${goalId}`).then(res => res.data);
}

export const getAllUsers = async (userInfo) => {
    const headers = {
        "Content-Type": "application/json",
        "Accept": "application/json",
    };
    const allUsers = await axios.get('http://localhost:8080/users', { headers }).then(res => res.data);
    return allUsers.filter(user => user._id !== userInfo.id);
}

export const getUser = async (userId) => {
    return axios.get(`http://localhost:8080/user/${userId}`).then(res => res.data);
}

export const refreshToken = async (userInfo) => {
    return axios.post('http://localhost:8080/api/refreshToken', {refreshToken: userInfo.refreshToken, id: userInfo._id}).then(res => res.data);
}