import { BASE_URL, BASE_URL_IP } from "@env";

const BaseUri = "http://10.10.0.85:8080";
export const backendAPI = {
    // authentication
    login: `${BaseUri}/api/v1/auth/institution-users/login`,
    verifyOTP: `${BaseUri}/api/v1/auth/institution-users/otp/verify`,
    // user profiles
    updateUserProfile: (userId) => `${BaseUri}/api/v1/auth/institution-users/${userId}`,
    // home card
    allProjectsCount: `${BaseUri}/api/v1/dashboard/user/projects`,
    entries: (userId, length = "week") => `${BaseUri}/api/v1/dashboard/user/entries?period=${length}&user_id=${userId}`,
    // projects
    allProjectsList: (take = 10, skip = 0) => `${BaseUri}/api/v1/projects/?take=${take}&skip=${skip}`,
    singleProject: (projectId) => `${BaseUri}/api/v1/projects/${projectId}`,
    // form
    viewForm: (projectId, take = 2, skip = 0) => `${BaseUri}/api/v1/forms?project_id=${projectId}&take=${take}&skip=${skip}`,
    singleFrom: (formId) => `${BaseUri}/api/v1/forms/${formId}`,
};