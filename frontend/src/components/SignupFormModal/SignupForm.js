import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Redirect} from 'react-router-dom';
import * as sessionActions from '../../store/session';
import './SignupForm.css';

const SignupForm = () => {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.currentUserId);
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState([]);

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

      <div className="signup-form-container">
        <form onSubmit={handleSubmit} className="signup-form">
            {/* <ul>
                {errors.map(error => <li key={error}>{error}</li>)}
            </ul> */}
            <div className="signup-name-block">
              <input className='name-items' type="text" value={firstName} placeholder={"First Name".toString()} onChange={(e) => setFirstName(e.target.value)} />
              <input className='name-items' type="text" value={lastName} placeholder={"Last Name".toString()} onChange={(e) => setLastName(e.target.value)} />
            </div>

            <input className='user-items' type="text" required value={email} placeholder={"Email".toString()} onChange={(e) => setEmail(e.target.value)} />
            <input className='user-items' type="text" required value={password} placeholder={"Password".toString()} onChange={(e) => setPassword(e.target.value)} />
            <input className='user-items' type="text" required value={confirmPassword} placeholder={"Confirm Password".toString()} onChange={(e) => setConfirmPassword(e.target.value)} />
            
            <div className="titles">
              <p>Birthday</p>
            </div>
            
            <div className="birthday">
              <select id="month" >
                <option value="Jan">Jan</option>
                <option value="Feb">Feb</option>
                <option value="Mar">Mar</option>
                <option value="Apr">Apr</option>
                <option value="May">May</option>
                <option value="Jun">Jun</option>
                <option value="Jul">Jul</option>
                <option value="Aug">Aug</option>
                <option value="Sep">Sep</option>
                <option value="Nov">Nov</option>
                <option value="Dec">Dec</option>
              </select>

              <select id="day" >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
                <option value="11">11</option>
                <option value="12">12</option>
                <option value="13">13</option>
                <option value="14">14</option>
                <option value="15">15</option>
                <option value="16">16</option>
                <option value="17">17</option>
                <option value="18">18</option>
                <option value="19">19</option>
                <option value="20">20</option>
                <option value="21">21</option>
                <option value="22">22</option>
                <option value="23">23</option>
                <option value="24">24</option>
                <option value="25">25</option>
                <option value="26">26</option>
                <option value="27">27</option>
                <option value="28">28</option>
                <option value="29">29</option>
                <option value="30">30</option>
                <option value="31">31</option>
              </select>

              <select id="year">
                <option value="2010">2010</option>
                <option value="2009">2009</option>
                <option value="2008">2008</option>
                <option value="2007">2007</option>
                <option value="2006">2006</option>
                <option value="2005">2005</option>
                <option value="2004">2004</option>
                <option value="2003">2003</option>
                <option value="2002">2002</option>
                <option value="2001">2001</option>
                <option value="2000">2000</option>
                <option value="1999">1999</option>
                <option value="1998">1998</option>
                <option value="1997">1997</option>
                <option value="1996">1996</option>
                <option value="1995">1995</option>
                <option value="1994">1994</option>
                <option value="1993">1993</option>
                <option value="1992">1992</option>
                <option value="1991">1991</option>
                <option value="1989">1989</option>
                <option value="1988">1988</option>
                <option value="1987">1987</option>
                <option value="1986">1986</option>
                <option value="1985">1985</option>
                <option value="1984">1984</option>
                <option value="1983">1983</option>
                <option value="1982">1982</option>
                <option value="1981">1981</option>
                <option value="1980">1980</option>
              </select>
            </div>

            {/* <div className="gender-div">
              <label>Female
                <input type="radio" value="Male"/>
              </label>

              <label>Male
                <input type="radio" value="Male"/>
              </label>

              <label>Custom
                <input type="radio" value="Male"/>
              </label>
            </div> */}
            
            <button type="submit" id="signup-form-button">Sign Up</button>
        </form>
      </div>
    )
}
 
export default SignupForm;