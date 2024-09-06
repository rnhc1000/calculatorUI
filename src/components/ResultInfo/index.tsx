import './styles.css';
import ButtonPrimary from "../ButtonPrimary";
import { Fade } from 'react-awesome-reveal';

type Props = {
    result: string;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
    onDialogClose: Function;
}

export default function ResultInfo({ result, onDialogClose }: Readonly<Props>) {
    return (
        <Fade>
            <div className="calc-dialog-background">
                <div className="calc-dialog-box">
                    <h2>Result:</h2>
                    <br></br>
                    <h3>{result}</h3>
                    <div className="calc-dialog-btn-container" onClick={() => onDialogClose()} role="button">
                        <ButtonPrimary text="Done!" />
                    </div>
                </div>
            </div>
        </Fade>
    )
}