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
    const [resultInfoData, setResultInfoData] = useState({
        visible: false,
        result: "0.00"
    });

    const spinners = ["loader", "loader", "loader", "loader"];
    const spinnersList: string[] = [];
    spinners.forEach((spinners) => {
        return spinnersList.push(String(<div className={spinners}></div>));
    })

    const navigate = useNavigate();
    const initialFormData = { operator: "", operandOne: "", operandTwo: "", username: "" };
    const [formData, setFormData] = useState(initialFormData);

    const [submitResponseFail, setSubmitResponseFail] = useState(false);

    const handleChange = (event: { target: { name: any; value: any; }; }) => {
        const { name, value } = event.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const {setContextWalletBalance} = useContext(ContextWalletBalance);

    const [loading, setLoading] = useState(false);

    const userNameReturned = { ...authService.getAccessTokenPayload() };
    formData.username = userNameReturned.username ?? "nouser@found.com";

    const handleSubmit = (event: { preventDefault: () => void; }) => {

        event.preventDefault();

        setSubmitResponseFail(false);

        const formDataValidated = forms.dirtyAndValidateAll(formData);

        if (forms.hasAnyInvalid(formDataValidated)) {

            setFormData(formDataValidated);
            return;

        }
   
        setFormData(formDataValidated);

        const operationNumeric: string = formData.operator;

        if (operationNumeric != "random_string") {

            setLoading(true);

            operationsService.requestOperationsNumbers({ ...formData })

                .then(response => {

                    const check = response.data.result;

                    if (check == "-1") {

                        setResultInfoData({ result: "No Balance Available!", visible: true });

                    } else {

                        setResultInfoData({ result: check, visible: true });

                    }

                    setLoading(false);

                    setContextWalletBalance(walletService.getWallet().balance);

                })

                .catch((error) => {

                    if (error.response.status == "401") {
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
                    setResultInfoData({ result: "Operation not allowed!!!", visible: true });
                    setSubmitResponseFail(true);
                    setLoading(false);

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

                    if (check == "-1") {

                        setResultInfoData({ result: "No Balance Available!", visible: true });

                    } else {

                        setResultInfoData({ result: check, visible: true });

                    }

                    setLoading(false);
                    setContextWalletBalance(walletService.getWallet().balance);

                })
                .catch((error) => {
                    if (error.response.status == "401") {
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

                    setResultInfoData({ result: "Operation not allowed", visible: true });
                    setSubmitResponseFail(true);
                    setLoading(false);

                })

            setFormData(initialFormData);

        }
    }

    function handleDialogClose() {
        setResultInfoData({ ...resultInfoData, visible: false })
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
                                <option>Pick an operator!</option>
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

                                <div className="spinner-loader">

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