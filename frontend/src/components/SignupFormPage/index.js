import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Redirect} from 'react-router-dom';
import * as sessionActions from '../../store/session';
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
      <>
      <div className="signup-form">
        <form onSubmit={handleSubmit} className="signup-form">
          <div className="signup-container">
            <ul>
                {errors.map(error => <li key={error}>{error}</li>)}
            </ul>
              <input type="text" required value={firstName} placeholder={"First Name".toString()} onChange={(e) => setFirstName(e.target.value)} />
              <input type="text" required value={lastName} placeholder={"Last Name".toString()} onChange={(e) => setLastName(e.target.value)} />
            <input type="text" required value={email} placeholder={"Email".toString()} onChange={(e) => setEmail(e.target.value)} />
            <input type="text" required value={password} placeholder={"Password".toString()} onChange={(e) => setPassword(e.target.value)} />
            <input type="text" required value={confirmPassword} placeholder={"Confirm Password".toString()} onChange={(e) => setConfirmPassword(e.target.value)} />
            <button type="submit" id="signup-button">Sign Up</button>
          </div>
        </form>
      </div>
      </>
    )
}
 
export default SignupFormPage;