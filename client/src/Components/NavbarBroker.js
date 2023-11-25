// import logo from './images/logo.png';
// import navIcon from './images/nav.png';
// import accountIcon from './images/test.png';
// import { Link } from '@mui/material';

// function showMenu(){

// }
// function Navbar(){

//     return (
        
//         <nav data-testid = 'navbar' className='Navbar'>
//         <div>
//         <a data-testid = "navbar-logo"className = "links" href = "/">
//             <img data-testid = "navbar-logo" class = "Navbar-logo" src = {logo} alt = "logo" width = "100%" height = "100%"/> 
//         </a>
//         </div>
//         <a lassName = "links" href = "/">
//             <p className='companyName'> 
//                 <h1>Pioneers</h1>
//             </p>    
//         </a>   
//                 <ul> 
//                     {/*<li className = 'Navlinks'> Search </li>
//                     <li className = 'Navlinks'> Sell </li>
//                     <li className = 'Navlinks'> Buy </li>}*/}
//                     <a href = "">
//                         <img  onClick = "showMenu()" className = "nav-icon" src = {navIcon} alt = "logo" width = "50%" height = "50%"/>
//                     </a>
//                     <li className='Navlinks'>
//                         <a href = "/manageOffers">
//                         <button data-testid = "manageOffersButton" href = "/manageOffers" className = "offers-button">Manage Offers</button>  
//                         </a>
//                     </li>
//                     <li className='Navlinks'>
//                         <a href = "/editprop">
//                         <button className = 'properties-button'>Manage Properties</button>
//                         </a> 
//                     </li>
//                 </ul>
//         </nav>
        
//     )
// }
// export default Navbar;



import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from '../context/userContext.js';
import logo from './images/logo.png';
import accountIcon from './images/test.png';

function NavbarBroker() {
  const { logout, user } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <nav data-testid="navbar" className="Navbar">
      <div>
        <a data-testid="navbar-logo" href="/">
          <img className="Navbar-logo" src={logo} alt="logo" width="100%" height="100%" />
        </a>
      </div>
      <a href="/">
        <p className="companyName">
          <h1>Pioneers</h1>
        </p>
      </a>
      <ul>
        <a href="/manageOffers">
          <li className="Navlinks">Manage Offers</li>
        </a>
        <a href="/editProp">
          <li className="Navlinks">Manage Properties</li>
        </a>
        {user ? (
          <li className="Navlinks" onClick={handleLogout}>
            Logout
          </li>
        ) : (
          <a href="/login">
            <li className="Navlinks">Login</li>
          </a>
        )}
      </ul>
    </nav>
  );
}

export default NavbarBroker;
