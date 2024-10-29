import { useEffect, useState } from 'react';
import './styles.css';
import React from 'react';


export default function Visitors() {

    const [count, setCount] = useState(0);

    useEffect(() => {
        const storedCount = localStorage.getItem("pageVisits");
        const initialCount = Number(storedCount) || 0;
        setCount(initialCount + 1);
        localStorage.setItem("pageVisits", String(initialCount + 1));
    }, []);

    return (

        <div>
            I've been visited { count } times!
        </div>

    )
}