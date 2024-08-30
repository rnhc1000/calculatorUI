export type CredentialsDTO = {

    username: string,
    password: string

}

export type RoleEnum = "ROLE_ADMIN | ROLE_USER";

export type AccessTokenPayloadDTO = {

    exp: number,
    username: string,
    scope: string,
    authorities: RoleEnum[]
    
}