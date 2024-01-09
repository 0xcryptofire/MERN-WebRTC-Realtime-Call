import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: true, // to set cookie in browser
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// list of all end-point

export const sendOtp = (data) => api.post("/api/send-otp", data);
export const verifyOtp = (data) => api.post("/api/verify-otp", data);
export const activate = (data) => api.post("/api/activate", data);
export const logout = () => api.post("/api/logout");
export const createRooms = (data) => api.post("/api/rooms" , data);

// interceptors

api.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
    const orginalrequest = error.config;
    if (
      error.response.status === 401 &&
      orginalrequest &&
      !orginalrequest._isRetry
    ) {
      orginalrequest.isRetry = true;
      try {
        await axios.get(`${process.env.REACT_APP_API_URL}/api/refresh`, 
        {
          withCredentials: true,
        });

        return api.request(orginalrequest);
      } catch (error) {
        console.log(error.message);
      }
    }
    throw error;
  }
);

export default api;
