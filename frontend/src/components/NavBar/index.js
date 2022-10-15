import './NavBar.css'

const NavBar = () => {
    return ( 
        <div className="navbar-header">

            <div className="navbar-header-left">
                <i className="fa-solid fa-m fa-2xl"></i>
                
            </div>

            <div className="navbar-header-middle navbar-header-middle-active">
                <i className="fa-solid fa-house fa-2xl"></i>
                <i className="fa-solid fa-user-group fa-2xl"></i>
            </div>
            
            <div className="navbar-header-right">
                <div>
                    <i className="fa-sharp fa-solid fa-bell fa-2xl"></i>
                </div>
                <div>
                    <i className="fa-solid fa-user fa-2xl"></i>
                </div>
            </div>
        </div>
     );
}
 
export default NavBar;

