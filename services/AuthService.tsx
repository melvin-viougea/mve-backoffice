import Axios from "./AxiosService";

const baseUrl = '/auth';

const signUp = (data: signInProps) => {
    return Axios.post(`${baseUrl}/signup`, data);
};

const login = (data: LoginUser) => {
    return Axios.post(`${baseUrl}/login`, data);
};

const AuthService = {
    signUp,
    login,
};

export default AuthService;