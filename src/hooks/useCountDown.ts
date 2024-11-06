import { useState, useEffect } from 'react';

export function useCountDown(initialTime: number = 6) {

    const [time, setTime] = useState(initialTime);

    useEffect( () => {
        if (time <= 0) return;
        const interval = setInterval(() => setTime((prev: number) => prev - 1), 1000);
        return () => clearInterval(interval);

    }, [time]);

    return { time }
}