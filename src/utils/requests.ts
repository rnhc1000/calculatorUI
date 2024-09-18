import axios, { AxiosRequestConfig } from "axios";
import { BASE_URL } from "./system";
import * as authService from '../services/auth-services';
import { history } from '../utils/history';

export function requestBackEnd(config: AxiosRequestConfig) {


    const headers = config.withCredentials
        ? 
        {
            ...config.headers,
            Authorization: "Bearer " + authService.getAccessToken()
        }
        : 
        config.headers;

    return axios({ ...config, baseURL: BASE_URL, headers })
}

axios.interceptors.request.use(

    config => config,

    error => {
        return error.request;
    }
);

axios.interceptors.response.use(

    response => response,
    error => {

        if(error.response) {
            if (error.response.status === 401 || error.response.status === 403) {
                history.push("/login");
            }
        }

        if(error.response && error.response.data) {
            return Promise.reject(error.response.data);
        }
        return Promise.reject(error);

    }
);

