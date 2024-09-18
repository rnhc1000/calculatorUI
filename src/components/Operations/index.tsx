import './styles.css';
import { useContext, useState } from 'react';
import * as forms from '../../utils/forms';
import { Fade } from 'react-awesome-reveal';
import * as operationsService from '../../services/operation-services';
import * as authService from '../../services/auth-services';
import * as walletService from '../../services/wallet-services';
import ResultInfo from '../ResultInfo';
import { ContextWalletBalance } from '../../utils/context-wallet';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { useNavigate } from 'react-router-dom';

export default function Operator() {
    /**
     * shows the result
     */
    const [resultInfoData, setResultInfoData] = useState({
        visible: false,
        result: "0.00"
    });
    /**
     * too many buggy libs to have an indication of an ongoing process,
     * so decided to write one simpler.. Please check the css.
     */

    const spinners = ["loader", "loader", "loader", "loader"];
    const spinnersList: string[] = [];
    spinners.forEach((spinners) => {
        return spinnersList.push(String(<div className={spinners}></div>));
    })


    const navigate = useNavigate();
    /**
     * pre load form data
     */

    const initialFormData = { operator: "", operandOne: "", operandTwo: "", username: "" };
    const [formData, setFormData] = useState(initialFormData);

    const [submitResponseFail, setSubmitResponseFail] = useState(false);

    /**
     * handle form input
     */
    const handleChange = (event: { target: { name: string; value: string; }; }) => {
        const { name, value } = event.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };


    const { setContextWalletBalance } = useContext(ContextWalletBalance);

    const [loading, setLoading] = useState(false);

    /**
     * username recoverd from accessToken
     */
    const accessTokenPayload = { ...authService.getAccessTokenPayload() };
    formData.username = accessTokenPayload.username ?? "nouser@found.com";

    /**
     * process the inputs
     * 
     */
    function handleDialogClose() {
        setResultInfoData({ ...resultInfoData, visible: false })
    }

    const handleSubmit = (event: { preventDefault: () => void; }) => {

        event.preventDefault();

        setSubmitResponseFail(false);

        const formDataValidated = forms.dirtyAndValidateAll(formData);

        if (forms.hasAnyInvalid(formDataValidated)) {

            setFormData(formDataValidated);
            return;
        }

        setFormData(formDataValidated);

        /**
         * deal with the operator chosen, numeric or string
         */
        if (authService.isAcessTokenValid()) {
            const operationNumeric: string = formData.operator;

            if (operationNumeric != "random_string") {

                setLoading(true);

                operationsService.requestOperationsNumbers({ ...formData })

                    .then(response => {

                        const check = response.data.result;

                        if (check == "8000863390488707.59991366095112916") {

                            setResultInfoData({ result: "No Balance Available!", visible: true });

                        } else {

                            setResultInfoData({ result: check, visible: true });

                        }

                        setLoading(false);

                        setContextWalletBalance(walletService.getWallet().balance);

                    })

                    .catch((error) => {
                        console.log(error);

                        if (error.status == "Unauthorized") {

                            authService.logout();
                            walletService.clearWallet();
                            withReactContent(Swal).fire({
                                title: 'Timeout!',
                                background: "#ecd9bb",
                                text: 'Time limit exceeded!',
                                icon: 'warning',
                                confirmButtonColor: "#fa9c05",
                                showCancelButton: false,
                                confirmButtonText: `OK!`,
                                footer: '<b>Credentials expired! Please, authenticate again!</b>'
                            }).then(() => {
                                setSubmitResponseFail(true);
                                setSubmitResponseFail(true);
                                setLoading(false);
                                navigate("/home");
                            })

                        } else if (error.status == "Illegal Math Operation!") {

                            withReactContent(Swal).fire({
                                title: 'Not Allowed!',
                                background: "#ecd9bb",
                                text: 'Arithmetic Operation Not Allowed!',
                                icon: 'warning',
                                confirmButtonColor: "#fa9c05",
                                showCancelButton: false,
                                confirmButtonText: `OK!`,
                                footer: '<b>Do maths with valid operands!</b>'
                            }).then(() => {
                                setSubmitResponseFail(true);
                                setSubmitResponseFail(true);
                                setLoading(false);
                                navigate("/operations");
                            })
                        }

                    })

                setFormData(initialFormData);
            } else {

                setLoading(true);

                formData.operator = "random_string";

                operationsService.requestOperationsRandom({
                    ...formData,
                    id: 0,
                    operation: ''
                })

                    .then(response => {

                        const check = response.data.random;

                        if (check == "8000863390488707.59991366095112916") {

                            setResultInfoData({ result: "No Balance Available!", visible: true });

                        } else {

                            setResultInfoData({ result: check, visible: true });

                        }

                        setLoading(false);
                        setContextWalletBalance(walletService.getWallet().balance);

                    })
                    .catch((error) => {
                        if (error.response.status == "Unauthorized") {
                            authService.logout();
                            walletService.clearWallet();
                            withReactContent(Swal).fire({
                                title: 'Timeout!',
                                background: "#ecd9bb",
                                text: 'Time limit exceeded!',
                                icon: 'warning',
                                confirmButtonColor: "#fa9c05",
                                showCancelButton: false,
                                confirmButtonText: `OK!`,
                                footer: '<b>Credentials expired! Please, authenticate again!</b>'
                            }).then(() => {
                                navigate("/home");
                            })
                        }

                        setSubmitResponseFail(true);
                        setLoading(false);

                    })

                setFormData(initialFormData);

            }
            
        } else {
            authService.logout();
            walletService.clearWallet();
            withReactContent(Swal).fire({
                title: 'Invalid Token!',
                background: "#ecd9bb",
                text: 'Credentials lifetime exceeded!',
                icon: 'error',
                confirmButtonColor: "#fa9c05",
                showCancelButton: false,
                confirmButtonText: `OK!`,
                footer: '<b>Credentials expired! Please, authenticate again!</b>'
            }).then(() => {
                navigate("/home");
            })
        }
    }


    return (

        <Fade>
            <section id="login-section" className="calc-container">
                <div className="calc-welcome-user">
                    <p>Welcome! {formData.username}</p>
                </div>
                <div className="calc-login-form-container">
                    <form className="calc-form" onSubmit={handleSubmit}>
                        <div className="calc-form-control-container">
                            <label className="label-input" htmlFor="operator">Operator</label>
                            <select
                                className="calc-form-operation"
                                onChange={handleChange}
                                value={formData.operator}
                                required
                                name="operator"
                                id="operator"
                            >
                                <option label='Pick an operator...'></option>
                                <option value="addition">Addition(&#x2b;)</option>
                                <option value="division">Division(&divide;)</option>
                                <option value="subtraction">Subtraction(-)</option>
                                <option value="multiplication">Multiplication(&times;)</option>
                                <option value="square_root">Square Root(&radic;)</option>
                                <option value="random_string">Random String(&xi;)</option>
                            </select>
                            <label className="label-input" htmlFor="operandOne">Operand One</label>
                            {
                                <input
                                    onChange={handleChange}
                                    value={formData.operandOne}
                                    className="calc-form-operation"
                                    type="number"
                                    name="operandOne"
                                    id="operandOne"
                                    placeholder="Enter an operand..."
                                />
                            }
                            <label className="label-input" htmlFor="operandTwo">Operand Two</label>
                            {
                                <input
                                    onChange={handleChange}
                                    value={formData.operandTwo}
                                    className="calc-form-operation"
                                    type="number"
                                    name="operandTwo"
                                    id="operandTwo"
                                    placeholder="Enter an operand..."
                                />
                            }
                        </div>

                        {
                            submitResponseFail &&
                            <div className="calc-form-global-error">
                                Try again!!!
                            </div>
                        }

                        <button type="submit" className="underlineHover calc-btn calc-login-text calc-btn-primary ">
                            Process it!
                            {loading && (

                                <div className="spinner">

                                    <div className="loader"></div>
                                    <div className="loader"></div>
                                    <div className="loader"></div>
                                    <div className="loader"></div>

                                </div>
                            )}
                        </button>
                    </form>
                </div>
                {
                    resultInfoData.visible &&
                    <ResultInfo
                        result={resultInfoData.result}
                        onDialogClose={handleDialogClose}
                    />
                }

            </section>
        </Fade>

    )
}