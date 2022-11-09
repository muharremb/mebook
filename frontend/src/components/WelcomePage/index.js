import './WelcomePage.css';
import LoginFormPage from '../LoginFormPage';
import { useSelector } from 'react-redux';

const WelcomePage = () => {
    const sessionUser = useSelector(state => state.session.currentUserId);
    if (sessionUser) return null;
    
    return ( 
        <>
            <div className="home-div">
                <div className="welcome-message-div">
                    <h1 id="company-name">mebook</h1>
                    <h2 id="company-motto">Connect with your friends and the world around you on Mebook.</h2>
                </div>
                <div className="login-form-div">
                    <LoginFormPage />
                </div>
            </div>
            <div className="footer-div">
                <div className="footer-info">
                    <ul className="footer-items">
                        <li >JavaScript</li>
                        <li>Ruby</li>
                        <li>Rails</li>
                        <li>React</li>
                        <li>Redux</li>
                    </ul>
                </div>
            </div>
        </>

     );
}
 
export default WelcomePage;