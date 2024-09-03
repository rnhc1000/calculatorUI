import { Link } from 'react-router-dom';
import './styles.css';


export default function Footer() {

    return (

        <footer> 

                <div className="footer-container">
                    <Link to = "https://www.ferreiras.dev.br">
                    <p className="sizeSmiley">Visit my portfolio &#128073;&#127998;&nbsp; https://www.ferreiras.dev.br&copy; </p>
                    <p>All rights reserved - 2024</p>
                    </Link>
                </div>

        </footer>
    )
}