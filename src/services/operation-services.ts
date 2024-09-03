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
