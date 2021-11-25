import axios from "axios";

const userInstance = axios.create({
    withCredentials:true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        'API-KEY': '216aa47e-607d-438c-ba14-210045044b13'
    }
})

const profileInstance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/'
})

const authInstance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    withCredentials: true
})

export const usersAPI = {
    getUsers(currentPage, pageSize)  {
        return userInstance
            .get(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => response.data);
    },
    
    follow(userId) {
        return userInstance.post(`follow/${userId}`).then(response => response.data)
    },
    
    unfollow(userId) {
        return userInstance.delete(`follow/${userId}`).then(response => response.data)
    }
}

export const profileAPI = {
    getUserProfile(userId)  {
        return profileInstance
            .get(`profile/${userId}`).then(response => response.data);
    }
}

export const authAPI = {
    login() {
        return authInstance
            .get(`auth/me`).then(response => response.data);
    }
}