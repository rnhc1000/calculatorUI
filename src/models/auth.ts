export type CredentialsDTO = {

    username: string,
    password: string

}

export type RoleEnum = "ROLE_USER";

export type AccessTokenPayloadDTO = {

    "exp": 1697809732,
    user_name: string,
    authorities: RoleEnum[]
    
}