import logo from './images/logo.png';
import navIcon from './images/nav.png';
import accountIcon from './images/test.png';
import { Link } from '@mui/material';
function Navbar(){

    return (
        
        <nav data-testid = 'navbar' className='Navbar'>
            <div>
            <a href = "/">
                <img class = "Navbar-logo" src = {logo} alt = "logo" width = "100%" height = "100%"/> 
            </a>
            </div>
            <a href = "/">
                <p className='companyName'> 
                    <h1>Pioneers</h1>
                </p>    
            </a>
                <ul> 
                    <li className = 'Navlinks'> Search </li>
                    <li className = 'Navlinks'> Sell </li>
                    <li className = 'Navlinks'> Buy </li>
                    
                    <a href = "">
                        <img className = "nav-icon" src = {navIcon} alt = "logo" width = "50%" height = "50%"/>
                    </a>
                    <li className='Navlinks'>
                    <a href = "Login">
                        <img className = "account-icon" src = {accountIcon} alt = "account icon"/>
                    </a>    
                    {/*<button><img class = "account-icon" src = {accountIcon} alt = "logo" width = "10%" height = "10%"/> sign-in </button> */}
                </li>
                </ul>
        </nav>
        
    )
}
export default Navbar;