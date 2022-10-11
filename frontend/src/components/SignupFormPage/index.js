import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Redirect} from 'react-router-dom';
import * as sessionActions from '../../store/session';
import SignupForm from '../SignupFormModal/SignupForm';
import './SignupFormPage.css';

const SignupFormPage = () => {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.currentUserId);
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState([]);

    if (sessionUser) return <Redirect to="/"/>

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password === confirmPassword) {
          setErrors([]);
          return dispatch(sessionActions.signup({ firstName, lastName, email, password }))
            .catch(async (res) => {
            let data;
            try {
              data = await res.clone().json();
            } catch {
              data = await res.text(); // Will hit this case if the server is down
            }
            if (data?.errors) setErrors(data.errors);
            else if (data) setErrors([data]);
            else setErrors([res.statusText]);
          });
        }
        return setErrors(['Confirm Password field must be the same as the Password field']);
    };
    return (
      <div className="signup-page-container">
        <div id='signup-company-logo'>mebook</div>
        <div className='signup-form-message'>Create a new account </div>
        <SignupForm />
      </div>
    )
}
 
export default SignupFormPage;