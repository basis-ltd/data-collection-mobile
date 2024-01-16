import { BASE_URL } from "@env";

export const backendAPI = {
    login: `${BASE_URL}/auth/institution-users/login`,
    verifyOTP: `${BASE_URL}/auth/institution-users/verifyOTP`,
};
