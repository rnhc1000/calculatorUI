export type CredentialsDTO = {

    username: string,
    password: string

}

export type RoleEnum = "ROLE_ADMIN | ROLE_USER";

export type AccessTokenPayloadDTO = {

    iss: string,
    sub: string,
    exp: number,
    iat: number,
    username: string,
    scope: string,
    authorities: RoleEnum[] 
    
}