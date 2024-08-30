import './styles.css';

type Props = {
   text: string
}

export default function ButtonBlue({ text }: Props) {

    return (
        <div className="calc-btn-dialog calc-btn-blue-dialog">
            { text }
        </div>
    );
    
}