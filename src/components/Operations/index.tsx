import { useState } from 'react';
import './styles.css';
import * as forms from '../../utils/forms';
import { JackInTheBox } from 'react-awesome-reveal';
import * as operationsService from '../../services/operation-services';
import * as authService from '../../services/auth-services';
import ResultInfo from '../ResultInfo';

export default function Operator() {
    const [resultInfoData, setResultInfoData] = useState({
        visible: false,
        result: "0.00"
    });



    const initialFormData = { operator: "", operandOne: "", operandTwo: "", username: "" };
    const [formData, setFormData] = useState(initialFormData);

    const [submitResponseFail, setSubmitResponseFail] = useState(false);

    const handleChange = (event: { target: { name: any; value: any; }; }) => {
        const { name, value } = event.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const [loading, setLoading] = useState(false);

    const handleSubmit = (event: { preventDefault: () => void; }) => {

        event.preventDefault();

        setSubmitResponseFail(false);

        const userNameReturned = { ...authService.getAccessTokenPayload() };
        formData.username = userNameReturned.username ?? "nouser@found.com";

        const formDataValidated = forms.dirtyAndValidateAll(formData);

        console.log(formDataValidated);
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

                })

                .catch(() => {

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


                })
                .catch(() => {

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
                            <label className="label-input" htmlFor="operandOne">Operand One</label>
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

                        <button type="submit" className="underlineHover calc-btn calc-login-text calc-btn-primary ">
                            Process it!
                            {loading && (
          <div className="spinner-loader">
            <div className="loader"></div>
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
        </JackInTheBox>

    )
}