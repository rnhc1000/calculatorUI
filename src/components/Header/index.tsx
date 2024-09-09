import './styles.css';

import logo  from '../../assets/svg/undraw_cloud_docs_re_xjht.svg'

import { Link } from 'react-router-dom';

export default function Header() {

    return (
        <header>
            <nav id="navbar" className="nav-main">
                <div className="nav-brand">
                    <img data-toggle="tooltip" data-placement="top" data-animation="" title="Home" src={logo} alt="calculator logo;" />  
                </div>

                <ul className="nav-list">
                    
                    <li>
                        <Link to='/home'>Home</Link>
                    </li>
                    
                </ul>
            </nav>
        </header>
    );

}