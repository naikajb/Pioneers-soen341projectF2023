import logo from './images/logo.png';
// import navIcon from './images/nav.png';
import accountIcon from './images/test.png';
// import { Link } from '@mui/material';
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from '../context/userContext.js';

function Navbar(){


    const { logout } = useContext(UserContext);
    const { user } = useContext(UserContext);
    const navigate = useNavigate(); 

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

    return (
        
        <nav data-testid = "navbar" className='Navbar'>
            <div>
            <a data-testid = "navbar-logo" href = "/">
                <img  className = "Navbar-logo" src = {logo} alt = "logo" width = "100%" height = "100%"/> 
            </a>
            </div>
            <a href = "/">
                <p className='companyName'> 
                    <h1>Pioneers</h1>
                </p>    
            </a>
                <ul> 
                    <a href = "/searchBrokers">
                        <li className = 'Navlinks'> Search Brokers </li>
                    </a>
                    <a href = "/">
                        <li className = 'Navlinks'> Buy </li>
                    </a>
                    
                    {user ? (
          // If user is logged in, show the logout button
          <li className="Navlinks" onClick={handleLogout}>
            Logout
          </li>
        ) : (
          // If user is not logged in, show the login link
          <a href="/login">
            <li className="Navlinks">
              <img className="account-icon" src={accountIcon} alt="account icon" />
            </li>
          </a>
        )}
                </ul>
        </nav>
        
    )
}
export default Navbar;

