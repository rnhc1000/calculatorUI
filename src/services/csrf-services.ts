import { AxiosRequestConfig } from 'axios';
import { requestBackEnd } from '../utils/requests';


export function requestCsrf() {

    const headers = {

        "Content-Type": "application/json",

    }

    const config: AxiosRequestConfig = {

        method: "GET",
        url: "/csrf",
        headers: headers

        }

        return requestBackEnd(config);

    }
