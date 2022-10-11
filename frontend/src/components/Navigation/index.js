import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import LoginFormModal from '../LoginFormModal';
import WelcomePage from '../WelcomePage';
import SignoutButton from './SignoutButton';

const Navigation = () => {
    const sessionUser = useSelector(state => state.session.currentUserId);

    if(!sessionUser) return null;
    let sessionLinks;
    if (sessionUser) {
        sessionLinks = (
        <ProfileButton user={sessionUser} />
        );
    } 
    return ( 
        <nav className="navigation-bar">
               {sessionLinks}
        </nav>
    );
}
 
export default Navigation;