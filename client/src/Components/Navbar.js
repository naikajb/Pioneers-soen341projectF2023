import logo from './logo.png';
import navIcon from './nav.png';
import accountIcon from './61135.png';
function Navbar(){

    return (
        
        <nav className='Navbar'>
            <div>
            <img class = "Navbar-logo" src = {logo} alt = "logo" width = "100%" height = "100%"/> 
            </div>
                <p className='companyName'> 
                    <h1>Company Name</h1>
                </p>    
                <ul>
                    <li className='Navlinks'>
                        <button> sign-in </button>
                        <img class = "nav-icon" src = {accountIcon} alt = "logo" width = "50%" height = "50%"/>
                    </li>
                    <li className = 'Navlinks'> Search </li>
                    <li className = 'Navlinks'> Sell </li>
                    <li className = 'Navlinks'> Buy </li>
                    <a href = " ">
                        <img class = "nav-icon" src = {navIcon} alt = "logo" width = "50%" height = "50%"/>
                    </a>
                </ul>
        </nav>
        
    )
}
export default Navbar;