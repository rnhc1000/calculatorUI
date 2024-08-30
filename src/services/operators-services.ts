import { AxiosRequestConfig } from "axios";
import { requestBackEnd } from "../utils/requests";
import * as authService from "../services/auth-services";

export function findAllRequest() {

    const headers = {

        "Content-Type": "application/json",
        Authorization: "Bearer " + authService.getAccessToken()

    }

    const config: AxiosRequestConfig = {
        method: "GET",
        url: "/operators",
        withCredentials: true,
        headers: headers
        }

    return requestBackEnd(config);
    
}

