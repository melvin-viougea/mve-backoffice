import Axios from "./AxiosService";

const baseUrl = '/auth';

const signUp = (data: SignUpParams) => {
    return Axios.post(`${baseUrl}/signup`, data);
};

const login = (data: signInProps) => {
    return Axios.post(`${baseUrl}/login`, data);
};

const AuthService = {
    signUp,
    login,
};

export default AuthService;