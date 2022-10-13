import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import LoginFormModal from '../LoginFormModal';
import WelcomePage from '../WelcomePage';
import SignoutButton from './SignoutButton';
import HomeButton from './HomeButton';
import GotoProfileButton from './GotoProfileButton';

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
        <div className="navigation-full-page">

            <div className="navigation-left-bar">
                <HomeButton />
                <div className="magnifiying-glass-div">
                    <i id="magnify-glass" class="fa-solid fa-magnifying-glass"></i>
                </div>
            </div>

            <div className="navigation-middle-bar">
                <div className="home-icon-div">
                    <i class="fa-solid fa-house-user"></i>                
                </div>
                
                <div className="friends-icon-div">
                    <i class="fa-solid fa-user-group"></i>                
                </div>
            </div>
            
            <div className="navigation-right-bar">
                <NavLink to={`/users/${sessionUser.id}`}> <GotoProfileButton /></NavLink>
                <SignoutButton />                
            </div>
            
        </div>
    );
}
 
export default Navigation;