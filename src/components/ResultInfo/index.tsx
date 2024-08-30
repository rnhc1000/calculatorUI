import ButtonPrimary from "../ButtonPrimary";
type Props = {
    result: string;
    onDialogClose: Function;
}

export default function ResultInfo({result, onDialogClose}: Props) {
    return (

        <div className="calc-dialog-background">
            <div className="calc-dialog-box"> 
                <h2>Result</h2>
                <br></br>
                <h3>{result}</h3>
                <div className="calc-dialog-btn-container" onClick={() => onDialogClose()} role="button">
                <ButtonPrimary text="Done!"/>
                </div>
            </div>
        </div>
    )
}