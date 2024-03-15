// const BaseUri='http://197.243.57.170:5050'

const BaseUri = "http://10.10.0.38:8000";
// const BaseUri = "https://rsa-data-hub.onrender.com"
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
    //form sectons
    allFormSections: (formId) => `${BaseUri}/api/v1/form-sections/${formId}`,
    //Fields Data
    addFieldsData: `${BaseUri}/api/v1/field-data`,
};