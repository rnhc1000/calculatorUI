## Web Calculator UI - @Ricardo Ferreira
Web Calculator

Implements a ReactJS based app, using TypeScript, React Router, React Hooks, React Context,AG-GRID Datatable, JWT Decode and a couple of other libraries, to provide a couple of simple math functionalities (addition, subtraction, multiplication, division, square root, and a random string generation) where each functionality will have a separate cost per request.
Users will have a starting credit/balance. Each request will be deducted from the user’s
balance. If the user’s balance isn’t enough to cover the request cost, the request shall be denied.
The design is a try to move from the conventional login pages  and a couple of animations to enrich the UX.
Each operation is persisted into a database and can be retrieved through a AG-GRID| Datatable eith support for pagination, searching and sorting!
This app consumes services offered by a REStful API at https://api.ferreiras.dev.br/swagger-ui/index.html and does not make any math, of any sort. All maths are done in the back end and theirs results available at specific endpoints.
The user must be authenticated and authorized accordingly to have full access to the API services.

## _Table of contents_
- [Web Calculator UI - @Ricardo Ferreira](#web-calculator-ui---ricardo-ferreira)
- [_Table of contents_](#table-of-contents)
- [_Overview_](#overview)
- [_Screenshot_](#screenshot)
- [_Links_](#links)
- [_Built with_](#built-with)
- [_How I did it_](#how-i-did-it)
- [_Continued development_](#continued-development)
  - [_Useful resources_](#useful-resources)
- [_Author_](#author)
- [Acknowledgments](#acknowledgments)
## _Overview_
These web pages were coded using ReactJS exploring hooks such as useState, useLocation, useEffect:
- src|
    - App.tsx
    - assets|
    - components|
      - Footer
      - Header
      - -FormInput
      - Operations
      - Welcome
    - routes
      - Home
      - Login
      - Operations
    - utils
   - App.tsx
   - index.css
   - main.tsx
   - index.html
   - tsconfig.json
   - tsconfig.node.json
   - vite.config.js
   - yarn.lock
- public|

## _Screenshot_
[![](./calculatorUI.png)]()
## _Links_
- Live Site URL: [https://calculatorweb.ferreiras.dev.br] 
## _Built with_

[![My Skills](https://skillicons.dev/icons?i=react,vite,yarn,typescript,html,css,javascript,git,github,vscode,redhat,aws)](https://skillicons.dev)



 ## _How I did it_
```jsx
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
``` 

## _Continued development_
- Use SMACSS methodology
### _Useful resources_
- [https://reactjs.org] React lets you build user interfaces out of individual pieces called components!.
- [https://yarnpkg.org/] Open-source package manager used to manage dependencies in  JavaScript.
- [https://vitejs.dev/guide/] Build tool that aims to provide a faster and leaner development experience for modern web projects.
## _Author_
- Website - [https://calculatorweb.ferreiras.dev.br] 
## Acknowledgments
- 
