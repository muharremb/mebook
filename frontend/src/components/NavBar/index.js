import { useHistory } from 'react-router-dom';
import {NavLink, Link} from 'react-router-dom'
import { useSelector } from 'react-redux';
import './NavBar.css'
import SignoutButton from '../Navigation/SignoutButton';

const NavBar = () => {
    const history = useHistory();
    const goToHome = (e) => {
        history.push("/")
    };

    const sessionUser = useSelector(state => state.session.currentUserId);
    if(!sessionUser) return null;
    
    // console.log('sessionUser.id', sessionUser.id)
    return ( 
        <div className="navbar-header">

            <div className="navbar-header-left">
                <Link to="/"><i className="fa-solid fa-m fa-xl"></i></Link> 
            </div>

            <div className="navbar-header-middle navbar-header-middle-active">
                <NavLink to="/">
                    <i className="fa-solid fa-house fa-xl"></i>
                </NavLink>

                <NavLink to={`/users/${sessionUser.id}`}>
                    <i className="fa-solid fa-user-group fa-xl"></i>
                </NavLink>
            </div>
            
            <div className="navbar-header-right">
                <div>
                    <NavLink to={`/users/${sessionUser.id}`}>
                        <i className="fa-solid fa-user fa-xl"></i>
                    </NavLink>
                </div>
                <div>
                    <SignoutButton />
                </div>
            </div>
        </div>
     );
}
 
export default NavBar;

