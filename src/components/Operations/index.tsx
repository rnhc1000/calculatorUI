import './styles.css';
import { useContext, useEffect, useState } from 'react';
import * as forms from '../../utils/forms';
import { Fade } from 'react-awesome-reveal';
import * as operationsService from '../../services/operation-services';
import * as authService from '../../services/auth-services';
import * as walletService from '../../services/wallet-services';
import * as costOperatorService from '../../services/operators-services';
import  { OUT_OF_BALANCE } from '../../utils/balance';
import ResultInfo from '../ResultInfo';
import { ContextWalletBalance } from '../../utils/context-wallet';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { useNavigate } from 'react-router-dom';
import * as walletRepository from '../../localstorage/wallet-repository';
import { WalletDTO } from '../../models/wallet';


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
    const initialCost = [ 
        ["ADDITION", 0], ["SUBTRACTION", 0], ["DIVISION", 0], 
        ["MULTIPLICATION", 0], ["SQUARE_ROOT", 0], ["RANDOM_STRING", 0]
    ];
    const [formData, setFormData] = useState(initialFormData);
    const [operatorCost, setOperatorCost] = useState(initialCost);

    const [submitResponseFail, setSubmitResponseFail] = useState(false);

    /**
     * handle form input
     */
    const handleChange = (event: { target: { name: string; value: string; }; }) => {
        const { name, value } = event.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };
    const initialState = { username: "", balance: "0.0" };
    const [balanceData] = useState<WalletDTO>(initialState);
    const { setContextWalletBalance } = useContext(ContextWalletBalance);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        costOperatorService.findOperatorsCost()
        .then(response => {
            setOperatorCost(response.data);
   
        })

    }, []);

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
            let check: string;

            if (operationNumeric != "random_string") {

                setLoading(true);

                operationsService.requestOperationsNumbers({ ...formData })

                    .then(response => {

                        check = response.data.result;
                        
                        if (check == OUT_OF_BALANCE) {

                            setResultInfoData({ result: "No Balance Available!", visible: true });

                        } else {
     
                            balanceData.username = accessTokenPayload.username ?? "nouser@found.com";
                            balanceData.balance = response.data.balance;
                            walletRepository.save({...balanceData}); 
                            setResultInfoData({ result: check, visible: true });
                            setTimeout(()=> {
                                setContextWalletBalance(walletService.getWallet().balance);                                
                            }, 5000); 
                                                                              
                        }

                        setLoading(false);

                    })

                    .catch((error) => {

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

                        if (check == OUT_OF_BALANCE) {

                            setResultInfoData({ result: "No Balance Available!", visible: true });

                        } else {

                            setResultInfoData({ result: check, visible: true });
                            balanceData.username = accessTokenPayload.username ?? "nouser@found.com";
                            balanceData.balance = response.data.balance;
                            walletRepository.save({...balanceData}); 
                            setResultInfoData({ result: check, visible: true });
                            setTimeout(()=> {
                                setContextWalletBalance(walletService.getWallet().balance);                                
                            }, 5000);

                        }

                        setLoading(false);                      

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
                                <option value="addition">Addition(&#x2b;)&nbsp;...&nbsp;${operatorCost[0][1]}</option>
                                <option value="division">Division(&divide;)&nbsp;...&nbsp;${operatorCost[1][1]}</option>
                                <option value="subtraction">Subtraction(-)&nbsp;...&nbsp;${operatorCost[2][1]}</option>
                                <option value="multiplication">Multiplication(&times;)&nbsp;...&nbsp;${operatorCost[3][1]}</option>
                                <option value="square_root">Square Root(&radic;)&nbsp;...&nbsp;${operatorCost[4][1]}</option>
                                <option value="random_string">Random String(&xi;)...&nbsp;${operatorCost[5][1]}</option>
                            </select>
                            <label className="label-input" htmlFor="operandOne">Operand One</label>
                            {
                                <input
                                    onChange={handleChange}
                                    value={formData.operandOne}
                                    className="calc-form-operation"
                                    type="number"
                                    min="0"
                                    max="999999999999"
                                    step="0.0001"
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
                                    min="0"
                                    max="999999999999"
                                    step="0.0001"
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