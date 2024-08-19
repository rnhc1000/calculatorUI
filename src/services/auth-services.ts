import QueryString from "query-string";
import { AccessTokenPayloadDTO, CredentialsDTO, RoleEnum } from "../models/auth";
import { CLIENT_ID, CLIENT_SECRET } from "../utils/system";
import { AxiosRequestConfig } from "axios";
import { requestBackEnd } from "../utils/requests";
import * as accessTokenRepository from '../localstorage/access-token-repository';
import { jwtDecode } from "jwt-decode";

export function loginRequest(loginData: CredentialsDTO) {

    const headers = {

        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: "Basic " + window.btoa(CLIENT_ID + ":" + CLIENT_SECRET)

    }

    const requestBody = QueryString.stringify({ ...loginData, grant_type: "password" });

    const config: AxiosRequestConfig = {

        method: "POST",
        url: "/oauth/token",
        data: requestBody,
        headers: headers
        
    }

    return requestBackEnd(config);

}

export function logout() {

    accessTokenRepository.remove();

}

export function saveAccessToken(token: string) {

    accessTokenRepository.save(token);

}

export function getAccessToken() {

    return accessTokenRepository.get();

}

export function getAccessTokenPayload(): AccessTokenPayloadDTO | undefined {

    try {

        const token = accessTokenRepository.get();
        return token == null
            ? undefined
            : (jwtDecode(token) as AccessTokenPayloadDTO);

    } catch (error) {

        return undefined;

    }
}

/**
 * 
 * Date.now() - JS returns 13 digits
 * exp data on token returns 10 digits
 * Solution: multiply exp times 1000
 * in order to make the correct comparison
 * between now() and exp;
 * 
 */

export function isAuthenticated(): boolean {
    const tokenPayload = getAccessTokenPayload();

    return !!(tokenPayload && 
        tokenPayload.exp * 1000 > Date.now());
}

export function hasAnyRoles(roles: RoleEnum[]): boolean {
    
    if (roles.length === 0) {

        return true;

    }

    const tokenPayload = getAccessTokenPayload();

    if (tokenPayload !== undefined) {

        for (const element of roles) {
            if (tokenPayload.authorities.includes(element)) {
                return true;
            }
        }
    }

    return false;

}