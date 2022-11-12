import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import * as sessionActions from '../../store/session';
import * as userActions from '../../store/users'
import {Redirect, useHistory} from 'react-router-dom';
import './LoginFormPage.css';
import SignupFormModal from '../SignupFormModal';

const LoginFormPage = () => {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.currentUserId);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]);
    const [emailClientSideCheck, setEmailClientSideCheck] = useState(false);
    const [passwordClientSideCheck, setPasswordClientSideCheck] = useState(false);

    const history = useHistory();

    const [showSignupModal, setShowSignupModal] = useState(false)
   
    if (sessionUser) return <Redirect to='/' />
    
    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([]);
        const user = {email, password};

        if(!email.includes('@')) {
            setEmailClientSideCheck(true);
            return null;
        } else setEmailClientSideCheck(false);

        if(password.length < 6) {
            setPasswordClientSideCheck(true);
            return null;
        } else setPasswordClientSideCheck(false);
        return dispatch(sessionActions.login(user))
            .catch(async (res) => {
                let data;
                try {
                    data = await res.clone().json();
                } catch {
                    data = await res.text()
                }
                if (data?.errors) setErrors(data.errors);
                else if (data) setErrors([data]);
                else setErrors([res.statusText]);
            }
        );
    }

    const handleDemoSubmit = (e) => {
        e.preventDefault();
        setErrors([]);
        const user = {email: "muha@mb.io", password: "password"};
        return dispatch(sessionActions.login(user))
            .catch(async (res) => {
                let data;
                try {
                    data = await res.clone().json();
                } catch {
                    data = await res.text()
                }
                if (data?.errors) setErrors(data.errors);
                else if (data) setErrors([data]);
                else setErrors([res.statusText]);
            }
        );
    }

    const handleBlur = (e) => {
        if(!email.includes('@') && email.length !== 0)  setEmailClientSideCheck(true);
        else setEmailClientSideCheck(false);
    }

    const emailFieldErrorClass = (errors[1] === "email") ? "error" : "";
    return (
        <div className="login-page-full">

        <form onSubmit={handleSubmit} className="signin-form">

            <div className="credentials">
                <input type="text" placeholder={"Email".toString()} value={email} onChange={(e) => setEmail(e.target.value)} 
                    id={(emailClientSideCheck) ? "error-div":"credentials" }
                    // onBlur={handleBlur}
                />
                {(emailClientSideCheck) && (
                    <div className="error-messages">{`The email you entered is not connected to an account. Find your account and log in.`}</div>
                )}
                {errors[0] && (
                    <div className="error-messages">{`Invalid credentials.`}</div>
                )}
                <input type="password" placeholder={"Password".toString()} value={password} onChange={(e) => setPassword(e.target.value)} 
                    id={(passwordClientSideCheck) ? "error-div":"credentials" }
                />
                {(passwordClientSideCheck) && (
                    <div className="error-messages">{`The password you have entered is incorrect. Forgot Password?`}</div>
                )}
                {errors[0] && (
                    <div className="error-messages">{`Invalid credentials.`}</div>
                )}
            </div>
            <button type="submit" id="login-button" >Log In</button>
            
            <button id="demo-user-button" onClick={handleDemoSubmit}>Demo User</button>
            <hr color="gray" width="70%" size="5"/>
        </form>
            <div className="signup-modal-div">
                <SignupFormModal />                    
            </div>
        </div>
     );
}
 
export default LoginFormPage;