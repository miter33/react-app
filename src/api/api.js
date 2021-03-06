import axios from "axios";

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        'API-KEY': '216aa47e-607d-438c-ba14-210045044b13'
    }
})

export const usersAPI = {
    getUsers(currentPage, pageSize)  {
        return instance
            .get(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => response.data);
    },
    
    follow(userId) {
        return instance.post(`follow/${userId}`).then(response => response.data)
    },
    
    unfollow(userId) {
        return instance.delete(`follow/${userId}`).then(response => response.data)
    }
}

export const profileAPI = {
    getUserProfile(userId)  {
        return instance
            .get(`profile/${userId}`).then(response => response.data);
    },
    
    getUserStatus(userId)  {
        return instance
            .get(`profile/status/${userId}`);
    },

    updateUserStatus(status)  {
        return instance
            .put(`profile/status`, { status });
    }
}

export const authAPI = {
    me() {
        return instance
            .get(`auth/me`).then(response => response.data);
    },
    
    login(email, password, rememberMe = false) {
        return instance
            .post(`auth/login`, {email, password, rememberMe})
            .then(response => response.data);
    },

    logout(email, password, rememberMe = false) {
        return instance
            .delete(`auth/login`)
            .then(response => response.data);
    }
}