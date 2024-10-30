import { AxiosRequestConfig } from 'axios';
import { requestBackEnd } from '../utils/requests';
import * as authService from './auth-services';

export function deleteRecordsById(recordId: number) {

    const headers = {

        "Content-Type": "application/json",
        Authorization: "Bearer " + authService.getAccessToken()

    }

    const config: AxiosRequestConfig = {
        
        method: "PUT",
        url: `/user/operations/${recordId}`,
        withCredentials: true,
        headers: headers
    }

    return requestBackEnd(config);
}