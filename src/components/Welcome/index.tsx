import './styles.css';


import JackInTheBox from 'react-awesome-reveal';


export default function Welcome() {

    return (
        <section id="welcome-section">
            <div className="welcome-container">
                <JackInTheBox>
                    <br></br>
                    <h1>Welcome to Math Operations</h1>
                    <br></br>
                    <blockquote className="welcome-quote">

                        Here’s a brief overview of some fundamental operations:
                        <br></br>
                        <h2 className="welcome-important">+</h2>
                        It is commutative (a + b = b + a) and associative ((a + b) + c = a + (b + c)).
                        <br></br>
                        <h2 className="welcome-important">-</h2>
                        It is not commutative (a - b ≠ b - a) and not associative ((a - b) - c ≠ a - (b - c)).
                        <br></br>
                        <h2 className="welcome-important">x</h2>
                        It is commutative (a × b = b × a) and associative ((a × b) × c = a × (b × c)).
                        <br></br>
                        <h2 className="welcome-important">/</h2>
                        It is not commutative (a / b != b / a) and divisor must be greater than 0.
                        <br></br>
                        <h2 className="welcome-important">√</h2>
                        The square root of x is a number y such that y exp 2 = x.

                    </blockquote>
                    <h3>Provide your credentials and explore the operations and their applications.

                    </h3>
                    <br></br>
                </JackInTheBox>

            </div>
        </section>
    );
}