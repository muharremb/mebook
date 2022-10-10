import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import * as sessionActions from '../../store/session';
import {Redirect, useHistory} from 'react-router-dom';
import SignupForm from '../SignupFormModal';
import SignupFormModal from '../SignupFormModal';


const LoginForm = () => {
    const dispatch = useDispatch();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]);

    const history = useHistory();

    const [showSignupModal, setShowSignupModal] = useState(false)
       
    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([]);
        const user = {email, password};
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
    
    return ( 
        <div className="login-form-container">
                <form className="login-form" onSubmit={handleSubmit}>
                    <ul>
                        {errors.map(error => <li key={error}>{error}</li>)}
                    </ul>
                    <input id="login-page-email" type="text" placeholder={"Email".toString()} value={email} onChange={(e) => setEmail(e.target.value)} required/>
                    <br />
                    <input id="login-page-password" type="password" placeholder={"Password".toString()} value={password} onChange={(e) => setPassword(e.target.value)} required/>
                    <br />
                    <br />
                    <button type="submit" id="login-button" >Log In</button>
                    <br />
                    <br />
                    <button id="demo-user-button" onClick={handleDemoSubmit}>Demo User</button>
                    <hr />           
                </form>
                
                <div>
                    <SignupFormModal />                    
                </div>
        </div>
     );
}
 
export default LoginForm;