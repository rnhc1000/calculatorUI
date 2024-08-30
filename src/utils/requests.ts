import axios, { AxiosRequestConfig } from "axios";
import { BASE_URL } from "./system";
import * as authService from '../services/auth-services';
import { history } from './history';

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
    function (config) {
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);

axios.interceptors.response.use(
    function (response) {
        console.log(response);
        return response;
    },
    function (error) {
        if (error.response.status === 401) {
            history.push("/login");
        }

        if (error.response.status === 403) {
            history.push("/login")
        }

        return Promise.reject(error);
    }
);