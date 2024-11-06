import './styles.css';
import React from 'react';

type Props = {
    time: number;
}

export default function CustomDisplay({ time }: Readonly<Props>) {

    return (
        <p> . . .&nbsp;{ time }</p>
    )
}