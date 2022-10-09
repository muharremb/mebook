import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import LoginFormModal from '../LoginFormModal';

const Navigation = () => {
    const sessionUser = useSelector(state => state.session.currentUserId);

    let sessionLinks;
    if (sessionUser) {
        sessionLinks = (
        <ProfileButton user={sessionUser} />
        );
    } else {
        sessionLinks = (
        <>
            <LoginFormModal />
            <NavLink to="/signup">Sign Up</NavLink>
        </>
        );
    }
    return ( 
      <ul>
        <li>
            <NavLink exact to="/">Home</NavLink>
            {sessionLinks}
        </li>
    </ul>
     );
}
 
export default Navigation;