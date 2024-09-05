import { AxiosRequestConfig } from 'axios';
import { requestBackEnd } from '../utils/requests';
import * as authService from '../services/auth-services';

export function findRecords(page: number, totalPages: number, totalRecords: number, size: number) {

    const headers = {

        "Content-Type": "application/json",
        Authorization: "Bearer " + authService.getAccessToken()

    }

    const config: AxiosRequestConfig = {
        method: "GET",
        url: "/records",
        params: {
            page,
            totalPages,
            totalRecords,
            size   
        },
        withCredentials: true,
        headers: headers

    }

    return requestBackEnd(config);
}