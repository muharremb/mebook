import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import LoginFormModal from '../LoginFormModal';
import WelcomePage from '../WelcomePage';

const Navigation = () => {
    const sessionUser = useSelector(state => state.session.currentUserId);

    if(!sessionUser) return null;
    // console.log('sessionUser in nav, ', sessionUser)
    let sessionLinks;
    if (sessionUser) {
        sessionLinks = (
        <ProfileButton user={sessionUser} />
        );
    } 
    return ( 
        <>
        <div className="navigation-bar">
            {sessionLinks}
        </div>
        </>
    );
}
 
export default Navigation;