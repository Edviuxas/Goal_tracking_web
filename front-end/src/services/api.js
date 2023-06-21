import axios from 'axios';
import jwt_decode from "jwt-decode";

const axiosJWT = axios.create();
axiosJWT.interceptors.request.use(
    async (config) => {
        const currentUser = JSON.parse(sessionStorage.getItem('user'));
        // console.log('config:')
        // console.log(config);
        let currentDate = new Date();
        const decodedToken = jwt_decode(localStorage.getItem('JWT'));
        if (decodedToken.exp * 1000 < currentDate.getTime()) {
            console.log('refreshing token from api.js');
            console.log(currentUser);
            const data = await refreshToken(currentUser).then(data => data.data);
            // console.log('data after refreshing');
            // console.log(data);
            config.headers["Authorization"] = "Bearer " + data.accessToken;
            sessionStorage.setItem('user', JSON.stringify({
                ...currentUser,
                accessToken: data.accessToken,
                refreshToken: data.refreshToken
            }));
            localStorage.setItem('JWT', data.accessToken);
        } else {
            config.headers["Authorization"] = "Bearer " + currentUser.accessToken;
        }
        // console.log('config:')
        // console.log(config);
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

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
    return axios.post('http://localhost:8080/auth/login', userInfo, { headers }).then(res => res.data).then(serverRes => serverRes.data);
};

export const createGoal = (goalInfo) => {
    const headers = {
        "Content-Type": "application/json",
        "Accept": "application/json",
    };
    console.log('sending goal to backend');
    console.log(goalInfo);
    return axiosJWT.post('http://localhost:8080/goal', goalInfo, { headers }).then(res => res.data);
};

export const getGoals = async () => {
    const currentUser = JSON.parse(sessionStorage.getItem('user'));
    console.log('current user from get goals');
    console.log(currentUser);
    const headers = {
        "Content-Type": "application/json",
        "Accept": "application/json",
    };
    const allGoals = await axiosJWT.get('http://localhost:8080/goals', { headers }).then(res => res.data);
    return allGoals.filter(goal => goal.createdBy === currentUser.id);
};

export const deleteGoal = async (goalId) => {
    return axiosJWT.delete(`http://localhost:8080/goal/${goalId}`).then(res => res.data);
}

export const updateGoal = async (goalInfo) => {
    console.log('updating goal');
    console.log(goalInfo);
    return axiosJWT.put('http://localhost:8080/goal', goalInfo).then(res => res.data);
}

export const getAllUsers = async (userInfo) => {
    const headers = {
        "Content-Type": "application/json",
        "Accept": "application/json",
    };
    const allUsers = await axiosJWT.get('http://localhost:8080/users', { headers }).then(res => res.data);
    return allUsers.filter(user => user._id !== userInfo.id);
}

export const getUserById = async (userId) => {
    return axios.get(`http://localhost:8080/user/${userId}`).then(res => res.data);
}

export const getUserByEmail = async (emailAddress) => {
    return axios.get(`http://localhost:8080/user?email=${emailAddress}`).then(res => res.data).then(serverRes => serverRes.data);
} 

export const refreshToken = async (userInfo) => {
    return axios.post('http://localhost:8080/auth/refresh-token', {refreshToken: userInfo.refreshToken, id: userInfo.id});
}