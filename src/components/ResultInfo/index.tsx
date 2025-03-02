import './styles.css';
// import ButtonPrimary from "../ButtonPrimary";
import { Fade } from 'react-awesome-reveal';
// import {Dots} from 'react-activity';
import "react-activity/dist/library.css";
import React from 'react';
import Timer from '../Timer';



type Props = {
    result: string;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
    onDialogClose: Function;
}

export default function ResultInfo({ result }: Readonly<Props>) {
    return (
        <Fade>
            <div className="calc-dialog-background">
                <div className="calc-dialog-box">
                    <h2>Result:</h2>
                    <br></br>
                    <h3>{result}</h3>
                    {/* <div className="calc-dialog-btn-container" onClick={() => onDialogClose()} role="button">
                        <ButtonPrimary text="Done!" />
                    </div> */}
                    <br></br>
                    <div className="count-box">
                        {/* <Dots color="var(--result)" size={48} speed={1} animating={true} /> */}
                        <p><Timer /></p>
                    </div>
                </div>
            </div>
        </Fade>
    )
}