import './styles.css';
import React, { useContext, useState } from 'react';
import * as authService from '../../services/auth-services';
import { useNavigate } from 'react-router-dom';
import { ContextToken } from '../../utils/context-token';
import FormInput from '../../components/FormInput';
import * as forms from '../../utils/forms';
import DatePipe from '../../components/DatePipe';

import Fade from 'react-awesome-reveal';
// import ReCAPTCHA from 'react-google-recaptcha'
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { WalletDTO } from '../../models/wallet';
import * as walletRepository from '../../localstorage/wallet-repository';


export default function Login() {
  

    const [formData, setFormData] = useState<any>({
        username: {
            value: "",
            id: "username",
            name: "username",
            type: "text",
            required: "email",
            placeholder: "Enter your email...",
            autoComplete: "username",
            validation: function (value: string) {
                return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(value.toLowerCase());
            },
            message: "Valid emails only, e.g. example@example.com!",
        },
        password: {
            value: "",
            id: "password",
            name: "password",
            type: "password",
            required: "password",
            placeholder: "Enter your password...",
            autoComplete: "current-password",
            validation: function (value: string) {
                return /^[a-zA-Z0-9.!@#$%&'*+/=?^_`{|}~-].{8,}/.test(value);
            },
            message: "Password must be larger than 8 characters!",
        }
    });

    const initialState = { username: "", balance: "0.0" };
    const [balanceData] = useState<WalletDTO>(initialState);
    const navigate = useNavigate();
    const [submitResponseFail, setSubmitResponseFail] = useState(false);
    const { setContextTokenPayload } = useContext(ContextToken);

    function handleSubmit(event: { preventDefault: () => void; }) {
        event.preventDefault();

        setSubmitResponseFail(false);

        const formDataValidated = forms.dirtyAndValidateAll(formData);

        if (forms.hasAnyInvalid(formDataValidated)) {
            setFormData(formDataValidated);
            return;
        }

        authService.loginRequest(forms.toValues(formData))

            .then(function (response) {

                const token = response.data.accessToken

                authService.saveAccessToken(token);

                const accessTokenDecoded = { ...authService.getAccessTokenPayload() };
   
                balanceData.username = accessTokenDecoded.username ?? "nouser@found.com";
                balanceData.balance = accessTokenDecoded.balance ?? "0.00"
                walletRepository.save({ ...balanceData });

                setContextTokenPayload(authService.getAccessTokenPayload());

                navigate("/operations");
            })

            .catch(function(error) {

                console.log(error.message);

                if (error.message == "Network Error") {
                    console.log(error);
                    withReactContent(Swal).fire({
                        title: 'System not available at this time!',
                        text: 'Try again later!',
                        icon: 'error',
                        showCancelButton: false,
                        confirmButtonText: `OK!`,
                    }).then(() => {
                        navigate("/home");
                    })
                } else if (error.response.data.message == "Access denied") {

                    withReactContent(Swal).fire({
                        title: 'Not Authorized!',
                        background: "#ecd9bb",
                        text: 'Try again!',
                        icon: 'error',
                        confirmButtonColor: "#fa9c05",
                        showCancelButton: false,
                        confirmButtonText: `OK!`,
                        footer: '<b>Username or password not valid!</b>'

                    }).then(() => {
                        navigate("/home");
                    })}

            })

    }

    function handleInputChange(event: any) {
        const result = forms.updateAndValidate(formData, event.target.name, event.target.value);
        setFormData(result);
    }

    function handleTurnDirty(name: string) {
        const newFormData = forms.dirtyAndValidate(formData, name);
        setFormData(newFormData);
    }

    return (
        <>
            
            <br />
            <DatePipe />
            <Fade>
                <section id="login-section" className="calc-container">
                    <div className="calc-login-form-container">

                        <form className="calc-form" onSubmit={handleSubmit}>
                            <div className="calc-form-control-container">
                                <div>
                                    <FormInput
                                        {...formData.username}
                                        className="calc-form-control"
                                        onTurnDirty={handleTurnDirty}
                                        onChange={handleInputChange} />
                                    <div className="calc-form-error">{formData.username.message}</div>
                                </div>

                                <div>
                                    <FormInput
                                        {...formData.password}
                                        className="calc-form-control"
                                        onTurnDirty={handleTurnDirty}
                                        onChange={handleInputChange} />
                                    <div className="calc-form-error">{formData.password.message}</div>
                                </div>
                            </div>

                            {submitResponseFail &&
                                <div className="calc-form-global-error">
                                    Username or password invalid! Try again!!!
                                </div>}
                            <div>
                                <button type="submit" className="underlineHover calc-btn calc-login-text calc-btn-primary ">
                                    Authenticate...
                                </button>
                                <br />
                            </div>
                            {/* <ReCAPTCHA ref={recaptcha} sitekey={import.meta.env.VITE_SITE_KEY} size='normal' theme='dark' /> */}

                        </form>
                    </div>
                </section>
            </Fade>
            </>
    );
}