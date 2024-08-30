import './styles.css';
import { SetStateAction, useContext, useState } from 'react';
import * as authService from '../src/services/auth-services';
import * as operationsService from '../src/services/operation-services';
import { useNavigate } from 'react-router-dom';
import { ContextToken } from '../src/utils/context-token';
import FormInput from '../src/components/FormInput';
import * as forms from '../src/utils/forms';
import Form from 'react-bootstrap/Form';

import JackInTheBox from 'react-awesome-reveal';

export default function Operations() {
    const [selectedOperation, setSelectedOperation] = useState("");
    const handleSelectedChange = (e: { target: { value: SetStateAction<string>; }; }) => {
        setSelectedOperation(e.target.value);
    }
    console.log(selectedOperation);


    const [formData, setFormData] = useState<any>({
        operand1: {
            value: "",
            id: "operand1",
            name: "operand1",
            type: "text",
            placeholder: "Enter an operand",
            validation: function (value: string) {
                return /^[0-9.]*$/.test(value);
            },
            message: "Please! Inform only numbers",
        },
        operand2: {
            value: "",
            id: "operand2",
            name: "operand2",
            type: "operand2",
            placeholder: "Enter an operand",
            validation: function (value: string) {
                return /^[0-9.]*$/.test(value);
            },
            message: "Please! Inform only numbers",
        },
        operation: {
            value: selectedOperation,
            id: "operator",
            placeholder: "Pick an operator!"
            
        }
    });

    const navigate = useNavigate();

    const [submitResponseFail, setSubmitResponseFail] = useState(false);

    const { setContextTokenPayload } = useContext(ContextToken);

    function handleSubmit(event: any) {
        event.preventDefault();
        // console.log(selectedOperation);

        setSubmitResponseFail(false);
        const formDataValidated = forms.dirtyAndValidateAll(formData);
        // console.log(formData);
        // console.log(formDataValidated);
        if (forms.hasAnyInvalid(formDataValidated)) {
            setFormData(formDataValidated);
            return;
        }

        operationsService.requestOperationsNumbers(
            forms.toValues(formData)
        )
            .then(response => {
                // console.log(...formData.operand1);
                setContextTokenPayload(authService.getAccessTokenPayload());
                operationsService.requestOperationsNumbers(OperationsDto);
                // navigate("/operations");
            })
            .catch(() => {
                setSubmitResponseFail(true);
            })
    }

    // const handleChange = (e) => {
    //     const { name, value } = e.target;
    //     setFormData((prev: any) => ({ ...prev, [name]: value }));
    // }

    function handleInputChange(event: any) {
        const result = forms.updateAndValidate(formData, event.target.name, event.target.value);
        console.log("Result -> ",result);
        setFormData(result);
    }

    function handleTurnDirty(name: string) {
        const newFormData = forms.dirtyAndValidate(formData, name);
        setFormData(newFormData);
    }

    return (

        <JackInTheBox>
            <section id="login-section" className="calc-container">
                <div className="calc-login-form-container">

                    <form className="calc-form" onSubmit={handleSubmit}>
                        <div className="calc-form-control-container">

                            <div></div>

                            <Form.Select   className="calc-form-operation" 
                            required
                            value={selectedOperation}                                                     
                            onChange={handleSelectedChange} >
                                <option>Select an operator</option>
                                <option value="addition">Addition(+)</option>
                                <option value="divison">Divison(/)</option>
                                <option value="subtraction">Subtraction(-)</option>
                                <option value="product">Product(x)</option>
                                <option value="squareroot">Square Root(V)</option>
                                <option value="randomstring">Random String(R)</option>
                            </Form.Select>

                            <div>
                                <FormInput
                                    {...formData.operand1}
                                    className="calc-form-control"
                                    onTurnDirty={handleTurnDirty}
                                    onChange={handleInputChange} />
                                <div className="calc-form-error">{formData.operand1.message}</div>
                            </div>
                            <div>
                                <FormInput
                                    {...formData.operand2}
                                    className="calc-form-control"
                                    onTurnDirty={handleTurnDirty}
                                    onChange={handleInputChange} />
                                <div className="calc-form-error">{formData.operand1.message}</div>
                            </div>
                            <div>
                            </div>

                            {/* <div className="calc-form-error">{formData.operation.message}</div> */}
                        </div>

                        {submitResponseFail &&
                            <div className="calc-form-global-error">
                                System not available now! Try again later!!!
                            </div>}

                        <button type="submit" className="underlineHover calc-btn calc-login-text calc-btn-primary ">
                            Process it!
                        </button>

                    </form>
                </div>
            </section>
        </JackInTheBox>
    );
}