import React, { useEffect } from 'react';

import { useCountDown } from '../../hooks/useCountDown';
import CustomTimer from '../CustomTimer';

export default function Timer() {

    const initialTime = 5;
    const { time } = useCountDown(initialTime);

    useEffect(() => {
        if (time === 0) return;
    }, [time]);

    return (
        <div>
            <CustomTimer time={time} />
        </div>

    );

}

