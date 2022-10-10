import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import * as sessionActions from '../../store/session';
import {Redirect, useHistory} from 'react-router-dom';
import './LoginFormPage.css';
import SignupForm from '../SignupFormModal';
import SignupFormModal from '../SignupFormModal';



const LoginFormPage = () => {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.currentUserId);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]);

    const history = useHistory();

    const [showSignupModal, setShowSignupModal] = useState(false)
   
    if (sessionUser) return <Redirect to='/' />
    
    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([]);
        const user = {email, password};
        // console.log("user ", user);
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
        // console.log("user ", user);
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

    const handleSignupMainButton = (e) => {
        e.preventDefault();
        history.push("/signup");
        // setShowSignupModal(true);
    }
    
    return ( 
        <>
            <div className="sign-form">
                <form onSubmit={handleSubmit}>
                    <ul>
                        {errors.map(error => <li key={error}>{error}</li>)}
                    </ul>
                    <input type="text" placeholder={"Email".toString()} value={email} onChange={(e) => setEmail(e.target.value)} required/>
                    <br />
                    <input type="text" placeholder={"Password".toString()} value={password} onChange={(e) => setPassword(e.target.value)} required/>
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
        </>
     );
}
 
export default LoginFormPage;