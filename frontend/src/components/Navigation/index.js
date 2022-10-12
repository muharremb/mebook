import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import LoginFormModal from '../LoginFormModal';
import WelcomePage from '../WelcomePage';
import SignoutButton from './SignoutButton';
import HomeButton from './HomeButton';

const Navigation = () => {
    const sessionUser = useSelector(state => state.session.currentUserId);

    if(!sessionUser) return null;
    let sessionLinks;
    if (sessionUser) {
        sessionLinks = (
        <ProfileButton user={sessionUser} />
        );
    }
    // console.log('session user ', sessionUser); 
    return ( 
        <div className="navigation-full-page">
                {/* <div className="navigation-home-button">
                    <button>Home</button>
                </div>
                <h1>Hello {sessionUser.firstName} </h1>
               {sessionLinks}
               <div className="navigation-home-button">
                    <button>Signout</button>
                </div> */}
                <NavLink to="/">Go to Profile</NavLink>
                <h1>Hello {sessionUser.firstName}, here is your page</h1>
                <SignoutButton />
        </div>
    );
}
 
export default Navigation;