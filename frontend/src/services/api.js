import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/users",
});

const axiosService = {
  register: async (fullName, email, password) => {
    try {
      const response = await axiosInstance.post("/register", {
        fullName,
        email,
        password,
      });
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  login: async (email, password) => {
    try {
      const response = await axiosInstance.post("/login", {
        email,
        password,
      });
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  getProfile: async () => {
    try {
      const response = await axiosInstance.get("/profile");
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  verifyEmailToken: async (emailToken) => {
    try {
      const response = await axiosInstance.post("/verify-emailToken", {
        emailToken,
      });
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },
};

export default axiosService;
