import { AxiosRequestConfig } from 'axios';
import { requestBackEnd } from '../utils/requests';
import { RandomDto } from "../models/random";
import { OperationsDto } from "../models/operations";
import * as authService from '../services/auth-services';
// import * as csrfService from '../services/csrf-services';
// import { getCookie } from 'typescript-cookie';


export function requestOperationsNumbers(formData: OperationsDto) {

    // let resp: string = "";
    // csrfService.requestCsrf()
    //     .then(response => {
    //         resp = response.data.token;
    //         console.log("token ->", response.data.token);
    //         if (resp.length != 0) {
    //             console.log(resp);
    //             return resp;
    //         }

    //     }).catch((error) => {

    //         resp = error.status;

    //         console.log("Error ->", resp);

    //     })

    // const csrf: string = getCookie("XSRF-TOKEN");

    const headers = {

        // 'X-XSRF-TOKEN': csrf,
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

export function requestOperationsRandom(formData: RandomDto) {

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
