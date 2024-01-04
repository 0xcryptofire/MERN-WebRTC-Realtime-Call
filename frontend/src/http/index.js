import axios from 'axios';

const api = axios.create({
    baseURL : 'http://localhost:8000', 
    withCredentials : true,             // to set cookie in browser
    headers : {
        'Content-Type' : 'application/json',
        Accept : 'application/json',
    }
})

// list of all end-point

export const sendOtp = (data) => api.post('/api/send-otp',data)
export const verifyOtp = (data) => api.post('/api/verify-otp',data)

export default api;