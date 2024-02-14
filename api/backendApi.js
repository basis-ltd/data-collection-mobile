import { BASE_URL, BASE_URL_IP } from "@env";

const BaseUri = "http://10.10.0.70:8080"
export const backendAPI = {
    login: `${BaseUri}/api/v1/auth/institution-users/login`,
    verifyOTP: `${BaseUri}/api/v1/auth/institution-users/verifyOTP`,
    allProjects: `${BaseUri}/api/v1/auth/institution-users/al-projects`,
};