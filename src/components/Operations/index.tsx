import './styles.css';
import React, { useContext, useEffect, useState } from 'react';
import * as forms from '../../utils/forms';
import { Fade } from 'react-awesome-reveal';
import * as operationsService from '../../services/operation-services';
import * as authService from '../../services/auth-services';
import * as walletService from '../../services/wallet-services';
import * as costOperatorService from '../../services/operators-services';
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

    const initialFormData = { operator: "addition", operandOne: "", operandTwo: "", username: "" };
    const initialCost = [
        ["ADDITION", 0], ["SUBTRACTION", 0], ["DIVISION", 0],
        ["MULTIPLICATION", 0], ["SQUARE_ROOT", 0], ["RANDOM_STRING", 0]
    ];
    const [formData, setFormData] = useState(initialFormData);
    const [operatorCost, setOperatorCost] = useState(initialCost);

    const [submitResponseFail, setSubmitResponseFail] = useState(false);

    const initialState = { username: "", balance: "0.0" };
    const [balanceData] = useState<WalletDTO>(initialState);
    const { setContextWalletBalance } = useContext(ContextWalletBalance);
    const [loading, setLoading] = useState(false);
    const [input, setInput] = useState(false);

    const add = "Addition {+} -> $" + operatorCost[0][1];
    const sub = "Subtraction {-} -> $" + operatorCost[1][1];
    const mul = "Multiplication {x} -> $" + operatorCost[3][1];
    const div = "Division {/} -> $" + operatorCost[2][1];
    const sqr = "Square Root {v} -> $" + operatorCost[4][1];
    const rnd = "Random String {s} -> $" + operatorCost[5][1];

    const operationsOptions = [
        { label: add, value: "addition" },
        { label: sub, value: "subtraction" },
        { label: mul, value: "multiplication" },
        { label: div, value: "division" },
        { label: sqr, value: "square_root" },
        { label: rnd, value: "random_string" }
    ];


    /*
    * load operations costs from db
    */


    useEffect(() => {
        costOperatorService.findOperatorsCost()
            .then(response => {
                setOperatorCost(response.data);
            })

    }, []);

    const accessTokenPayload = { ...authService.getAccessTokenPayload() };
    formData.username = accessTokenPayload.username ?? "nouser@found.com";

    useEffect(() => {

        if (formData.operator == "square_root") {
            setInput(false);
        } else {
            setInput(true);
        }

    }, [formData.operator, input]);

    /**
     * process the inputs
     * 
     */
    function handleDialogClose() {
        setResultInfoData({ ...resultInfoData, visible: false })
    }

    /**
 * handle form input
 */
    // const handleChange = (event: { target: { name: string; value: string; }; }) => {
    //     const { name, value } = event.target;
    //     setFormData((prev) => ({ ...prev, [name]: value }));
        
    // };

    // const [inputs, setInputs] = useState({});

    const handleChange = (event: { target: { name: string; value: string; }; }) => {
      const name = event.target.name;
      const value = event.target.value;
      setFormData(values => ({...values, [name]: value}))
    }

    const handleSubmit = (event: { preventDefault: () => void; }) => {

        event.preventDefault();
        setSubmitResponseFail(false);
        setInput(false);
        

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
                        balanceData.username = accessTokenPayload.username ?? "nouser@found.com";
                        balanceData.balance = response.data.balance;
                        walletRepository.save({ ...balanceData });
                        setResultInfoData({ result: check, visible: true });
                        setTimeout(() => {
                            setContextWalletBalance(walletService.getWallet().balance);
                        }, 6000);

                        setLoading(false);

                    })

                    .catch((error) => {

                        if (error.response.data.message == "Not Authorized") {

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
                                setLoading(false);
                                navigate("/home");
                            })

                        } else if (error.response.data.message == "Illegal math operation!") {

                            withReactContent(Swal).fire({
                                title: 'Not Allowed!',
                                background: "#ecd9bb",
                                text: 'Arithmetic Operation Not Allowed!',
                                icon: 'error',
                                confirmButtonColor: "#fa9c05",
                                showCancelButton: false,
                                confirmButtonText: `OK!`,
                                footer: '<b>Do maths with valid operands!</b>'
                            }).then(() => {
                                setSubmitResponseFail(true);
                                setLoading(false);
                                navigate("/operations");
                            })
                        } else if (error.response.data.message == "Not enough funds to keep doing maths!!") {

                            withReactContent(Swal).fire({
                                title: 'Out of Balance!',
                                background: "#ecd9bb",
                                text: 'Not enough funds to do maths!!',
                                icon: 'error',
                                confirmButtonColor: "#fa9c05",
                                showCancelButton: false,
                                confirmButtonText: `OK!`,
                                footer: '<b>Ask admin to credit your wallet!</b>'
                            }).then(() => {
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

                        setResultInfoData({ result: check, visible: true });
                        balanceData.username = accessTokenPayload.username ?? "nouser@found.com";
                        balanceData.balance = response.data.balance;
                        walletRepository.save({ ...balanceData });
                        setResultInfoData({ result: check, visible: true });
                        setTimeout(() => {
                            setContextWalletBalance(walletService.getWallet().balance);
                        }, 6000);

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
                        } else if (error.response.data.message == "Not enough funds to keep doing maths!!") {

                            withReactContent(Swal).fire({
                                title: 'Out of Balance!',
                                background: "#ecd9bb",
                                text: 'Not enough funds to do maths!!',
                                icon: 'error',
                                confirmButtonColor: "#fa9c05",
                                showCancelButton: false,
                                confirmButtonText: `OK!`,
                                footer: '<b>Ask admin to credit your wallet!</b>'
                            }).then(() => {
                                setSubmitResponseFail(true);
                                setLoading(false);
                                navigate("/operations");
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
                    <form className="calc-form" noValidate>
                        <div className="calc-form-control-container">
                            <label className="label-input" htmlFor="operator">Pick an Operator</label>
                            
                            <select
                                className="calc-form-operation"
                                onChange={handleChange}
                                value={formData.operator}
                                name="operator"
                                id="operator"
                                required
                            >
                                
                                {operationsOptions.map((operator) => (
                                    <option key={operator.label} value={operator.value}>{operator.label}</option>
                                ))}

                            </select>
                            
                            {
                                <input
                                    onChange={handleChange}
                                    value={formData.operandOne}
                                    className="calc-form-operation"
                                    type="number"
                                    name="operandOne"
                                    id="operandOne"
                                    placeholder="Operand One..."
                                    min="-999999999999999"
                                    max="+999999999999999"
                                    step="0.000001"                                  
                                />
                            }
                            
                            {
                               
                                <input 
                                    onChange={handleChange}
                                    value={formData.operandTwo}
                                    className="calc-form-operation"
                                    type="number"
                                    name="operandTwo"
                                    id="operandTwo"
                                    placeholder="Operand Two..."
                                    min="-999999999999999"
                                    max="+999999999999999"
                                    step="0.000001"
                                    disabled={!input}
                                />
                            }
                        </div>

                        {
                            submitResponseFail &&
                            <div className="calc-form-global-error">
                                Try again!!!
                            </div>
                        }

                        <button type="submit"
                            className="underlineHover calc-btn calc-login-text calc-btn-primary "
                            onClick={handleSubmit}
                            >
                            Process it!
                            {
                                loading &&

                                <div className="spinner">

                                    <div className="ferreiras bl"></div>
                                    <div className="ferreiras tr" ></div>
                                    <div className="ferreiras br"></div>
                                    <div className="ferreiras tl"></div>

                                </div>


                            }
                            {/* {loading && (

                                <div className="spinner">

                                    <div className="loader"></div>
                                    <div className="loader"></div>
                                    <div className="loader"></div>
                                    <div className="loader"></div>

                                </div>
                            )} */}
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