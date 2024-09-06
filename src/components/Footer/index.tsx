import { Link } from 'react-router-dom';
import './styles.css';
import CountUp from 'react-countup';

export default function Footer() {

    return (

        <footer>

            <div className="footer-container">
                <Link to="https://www.ferreiras.dev.br" target="_blank">
                    <p className="sizeSmiley">Visit my portfolio &#128073;&#127998;&nbsp; https://www.ferreiras.dev.br&copy; </p>
                    <p>All rights reserved - &nbsp;
                        <CountUp separator="" delay={0} start={1957} end={2024} /></p>
                </Link>
            </div>

        </footer>
    )
}