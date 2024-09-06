import './styles.css';
import { useContext, useState } from 'react';
import * as authService from '../../services/auth-services';
import { useNavigate } from 'react-router-dom';
import { ContextToken } from '../../utils/context-token';
import FormInput from '../../components/FormInput';
import * as forms from '../../utils/forms';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import DatePipe from '../../components/DatePipe';

import Fade from 'react-awesome-reveal';

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
            message: "Only valid emails!",
        },
        password: {
            value: "",
            id: "password",
            name: "password",
            type: "password",
            required: "password",
            placeholder: "Enter your password...",
            autoComplete: "current-password"
        }
    });

    const navigate = useNavigate();

    const [submitResponseFail, setSubmitResponseFail] = useState(false);

    const { setContextTokenPayload } = useContext(ContextToken);

    function handleSubmit(event: any) {
        event.preventDefault();

        setSubmitResponseFail(false);

        const formDataValidated = forms.dirtyAndValidateAll(formData);

        if (forms.hasAnyInvalid(formDataValidated)) {
            setFormData(formDataValidated);
            return;
        }

        authService.loginRequest(forms.toValues(formData))

            .then(response => {

                const token = response.data.accessToken
                
                authService.saveAccessToken(token);

                setContextTokenPayload(authService.getAccessTokenPayload());
                
                navigate("/operations");
            })

            .catch(() => {

                setSubmitResponseFail(true);
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
        <Header />
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
                            </div>
                        </form>

                    </div>
                </section>
            </Fade>
            <Footer /></>
    );
}