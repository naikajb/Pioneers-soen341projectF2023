// import React, { useContext } from "react";
// import { useNavigate } from "react-router-dom";
// import { UserContext } from '../context/userContext.js';
// import logo from './images/logo.png';
// import accountIcon from './images/test.png';

// function Navbar() {
//   const { logout, user } = useContext(UserContext);
//   const navigate = useNavigate();

//   const handleLogout = async () => {
//     await logout();
//     navigate("/");
//   };

//   return (
//     <nav data-testid="navbar" className="Navbar">
//       <div>
//         <a data-testid="navbar-logo" href="/">
//           <img className="Navbar-logo" src={logo} alt="logo" width="100%" height="100%" />
//         </a>
//       </div>
//       <a href="/">
//         <p className="companyName">
//           <h1>Pioneers</h1>
//         </p>
//       </a>
//       <ul>
//         <a href="/">
//           <li className="Navlinks">Properties</li>
//         </a>
//         {/* {user ? (
//           <li className="Navlinks" onClick={handleLogout}>
//             Logout
//           </li>
//         ) : (
//           <a href="/login">
//             <li className="Navlinks">Login</li>
//           </a>
//         )} */}
//       </ul>
//     </nav>
//   );
// }

// export default Navbar;

import React, { useContext } from 'react';
import { UserContext } from '../context/userContext';
import NavbarBuyer from './NavbarBuyer';
import NavbarBroker from './NavbarBroker';
import NavbarAdmin from './NavbarAdmin';
import logo from './images/logo.png';

function Navbar() {
  const { user } = useContext(UserContext);

  // Add conditions based on user type
  if (user) {
    switch (user.type) {
      case 'buyer':
        return <NavbarBuyer />;
      case 'broker':
        return <NavbarBroker />;
      case 'admin':
        return <NavbarAdmin />;
      // Add more cases as needed
      default:
        return null;
    }
  }

  // Render a default navbar for unauthenticated users
  return <NavbarBuyer />;
}

// Create a DefaultNavbar component for unauthenticated users
// function DefaultNavbar() {
   
  
//     return (
//       <nav data-testid="navbar" className="Navbar">
//         <div>
//           <a data-testid="navbar-logo" href="/">
//             <img className="Navbar-logo" src={logo} alt="logo" width="100%" height="100%" />
//           </a>
//         </div>
//         <a href="/">
//           <p className="companyName">
//             <h1>Pioneers</h1>
//           </p>
//         </a>
//         <ul>
//           <a href="/searchBrokers">
//             <li className="Navlinks">Find Brokers</li>
//           </a>
//           <a href="/">
//             <li className="Navlinks">Properties</li>
//           </a>
//             <a href="/login">
//               <li className="Navlinks">Login</li>
//             </a>
         
//         </ul>
//       </nav>
//     );
// }

export default Navbar;

