import { AccessTokenPayloadDTO, CredentialsDTO, RoleEnum } from "../models/auth";
import { AxiosRequestConfig } from "axios";
import { requestBackEnd } from "../utils/requests";
import * as accessTokenRepository from '../localstorage/access-token-repository';
import { jwtDecode } from "jwt-decode";




export function loginRequest(loginData: CredentialsDTO) {


    const headers = {

      
        'Accept': 'application/json',
        "Content-Type": "application/json",

    }

    
    const requestBody = { ...loginData };

    const config: AxiosRequestConfig = {

        method: "POST",
        url: "/login",
        data: requestBody,
        headers: headers
        
    }

    return requestBackEnd(config);
}

export function logout() {

    accessTokenRepository.remove();

}

export function saveAccessToken(accessToken: string) {

    accessTokenRepository.save(accessToken);

}

export function getAccessToken() {
    const accessToken = accessTokenRepository.get();
    console.log("AccessToken", accessToken);

    return accessToken ?? "undefined";
}

export function getAccessTokenPayload(): AccessTokenPayloadDTO | undefined {

    try {

        const accessToken = accessTokenRepository.get();
        
        return accessToken == null
            ? undefined
            : (jwtDecode(accessToken));

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
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

export function isAcessTokenValid(): boolean {

    const tokenPayload = getAccessTokenPayload();
    
    if (tokenPayload !== undefined && tokenPayload.exp * 1000 > Date.now()) {

        return true;
    }

    return false;
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

