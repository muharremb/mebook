import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import LoginFormModal from '../LoginFormModal';
import WelcomePage from '../WelcomePage';

const Navigation = () => {
    const sessionUser = useSelector(state => state.session.currentUserId);

    // if(!sessionUser) return null;

    let sessionLinks;
    if (sessionUser) {
        sessionLinks = (
        <ProfileButton user={sessionUser} />
        );
    } else {
        sessionLinks = (
        <>
            <NavLink to="/signup">Sign Up</NavLink>
            <WelcomePage />
        </>
        );
    }
    return ( 
        <>
            {sessionLinks}
        </>
    );
}
 
export default Navigation;