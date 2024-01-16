import { BASE_URL, BASE_URL_IP } from "@env";

export const backendAPI = {
    login: `${BASE_URL_IP}/auth/institution-users/login`,
    verifyOTP: `${BASE_URL_IP}/auth/institution-users/verifyOTP`,
};
