import axiosClient from "../api/axios";

// Function to perform login
export const login = async (data:any) => {
    try {
        const response = await axiosClient.post("/auth/login", data);
        return response;
    } catch (error) {
        console.error('Error response:', error.response.data.message);
    }
};

export const register = async (data: any) => {
    try {
        const response = await axiosClient.post("/auth/register ", data);
        return response;
    } catch (e) {
        console.error(e);
    }
};