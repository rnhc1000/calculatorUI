import './styles.css';
import { Link } from 'react-router-dom';
import homeLogo from '../../assets/svg/undraw_online_organizer_re_156n.svg'

export default function Welcome() {

    return (
        <section>
        <div className="container-home fadeIn fourth">
            <h1>Do the maths...</h1>
                <img className="home-img" src={homeLogo} alt="Sign-in page" />
            <div className="container-home-sign">
                <Link to="/login">
                    <h2 className="underlineHover">Sign-in</h2>
                </Link>
            </div>
        </div>
    </section>
        
    );
}