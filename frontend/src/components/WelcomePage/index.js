import './WelcomePage.css';
import LoginFormPage from '../LoginFormPage';
import SignupFormPage from '../SignupFormPage';

const WelcomePage = () => {
    return ( 
        <>
            <div className="home-div">
                <div className="welcome-message-div">
                    <h2 id="company-name">MeBook</h2>
                    <h3 id="company-motto">Connect with your friends on Mebook.</h3>
                </div>
                <div className="login-form-div">
                    <LoginFormPage />
                </div>

            </div>
        </>

     );
}
 
export default WelcomePage;