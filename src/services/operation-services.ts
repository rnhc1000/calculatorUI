import { AxiosRequestConfig } from 'axios';
import { requestBackEnd } from '../utils/requests';
import { RandomDto } from "../models/random";
import { OperationsDto } from "../models/operations";
import * as authService from '../services/auth-services';


export function requestOperationsNumbers (formData: OperationsDto)  {
    const headers = {

        "Content-Type": "application/json",
        Authorization: "Bearer " + authService.getAccessToken()

    }
    
    const requestBody = { ...formData };

    const config: AxiosRequestConfig = {
        method: "POST",
        url: "/operations",
        withCredentials: true,
        data: requestBody,
        headers: headers
    }
    
    return requestBackEnd(config);

}

export function requestOperationsRandom (formData: RandomDto)  {

    const requestBody = { ...formData };

    const headers = {

        "Content-Type": "application/json",
        Authorization: "Bearer " + authService.getAccessToken()

    }

    const config: AxiosRequestConfig = {
        method: "POST",
        url: "/randomize",
        withCredentials: true,
        data: requestBody,
        headers: headers
    }
    
    return requestBackEnd(config);

}


export function findRecords(page: number, totalPages: number, totalRecords: number, size = 12) {

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