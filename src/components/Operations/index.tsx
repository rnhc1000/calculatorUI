import { useState } from 'react';
import './styles.css';
import * as forms from '../../utils/forms';
import { JackInTheBox } from 'react-awesome-reveal';
import * as operationsService from '../../services/operation-services';
import ResultInfo from '../ResultInfo';

export default function Operator() {
    const [resultInfoData, setResultInfoData] = useState({
        visible: false,
        result: "34.53"
    });

    const [handleInput, setHandleInput] = useState(true);

    const initialFormData = { operator: "", operandOne: "", operandTwo: "", username: "" };
    const [formData, setFormData] = useState(initialFormData);

    const [submitResponseFail, setSubmitResponseFail] = useState(false);

    const handleChange = (event: any) => {
        const { name, value } = event.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (event: any) => {
        event.preventDefault();
        setSubmitResponseFail(false);
        formData.username = "ricardo@ferreiras.dev.br";
        const formDataValidated: any = forms.dirtyAndValidateAll(formData);
        console.log(formDataValidated);
        if (forms.hasAnyInvalid(formDataValidated)) {
            setFormData(formDataValidated);
            return;
        }
        setHandleInput(true);
        setFormData(formDataValidated);
        const operationNumeric: string = formData.operator;

        if (operationNumeric != "random_string") {

            operationsService.requestOperationsNumbers({ ...formData })

                .then(response => {

                    const check: any = response.data.result;

                    if (check == "-1") {
                        setResultInfoData({ result: "No Balance Available!", visible: true });
                    } else {
                        setResultInfoData({result: check, visible:true});
                    }
                    
                    console.log(resultInfoData);

                })

                .catch(() => {

                    setSubmitResponseFail(true);

                })

            setFormData(initialFormData);

        } else {
            formData.username = "ricardo@ferreiras.dev.br";
            formData.operator = "random_string";
            
            operationsService.requestOperationsRandom({
                ...formData,
                id: 0,
                operation: ''
            })

                .then(response => {

                    const check: any = response.data.random;

                    if (check == "-1") {
                        setResultInfoData({ result: "No Balance Available!", visible: true });
                    } else {
                        setResultInfoData({result: check, visible:true});
                    }

                })
                .catch(() => {

                    setSubmitResponseFail(true);

                })

            setFormData(initialFormData);

        }
    }

    function handleDialogClose() {
        setResultInfoData({ ...resultInfoData, visible: false })
    }


    return (

        <JackInTheBox>
            <section id="login-section" className="calc-container">
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
                                <option value="addition">Addition(+)</option>
                                <option value="division">Division(/)</option>
                                <option value="subtraction">Subtraction(-)</option>
                                <option value="multiplication">Multiplication(x)</option>
                                <option value="square_root">Square Root(V)</option>
                                <option value="random_string">Random String(R)</option>
                            </select>
                            <label className="label-input" htmlFor="operandoOne">Operand One</label>
                            { 
                            <input
                                onChange={handleChange}
                                value={formData.operandOne}
                                className="calc-form-operation"
                                type="text"
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
                                    type="text"
                                    name="operandTwo"
                                    id="operandTwo"
                                    placeholder="Enter an operand..."
                                />
                            }
                        </div>

                        {
                            submitResponseFail &&
                            <div className="calc-form-global-error">
                                System not available now! Try again later!!!
                            </div>
                        }

                        <button className="underlineHover calc-btn calc-login-text calc-btn-primary ">
                            Process it!
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
        </JackInTheBox>

    )
}