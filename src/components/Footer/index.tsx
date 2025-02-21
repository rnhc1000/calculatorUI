import { Link } from 'react-router-dom';
import './styles.css';
import CountUp from 'react-countup';
import React from 'react';

export default function Footer() {

    return (

        <footer>

            <div className="footer-container">
                <Link to="https://www.ferreiras.dev.br" target="_blank">
                    <p className="sizeSmiley"><CountUp separator="" delay={0} start={1957} end={2025}  /> - All rights reserved - &nbsp;Visit my portfolio &#128073;&#127998;&nbsp; https://www.ferreiras.dev.br&copy; </p>
                    <p>
                        </p>
                </Link>
                {/* <Visitors /> */}
            </div>

        </footer>
    )
}