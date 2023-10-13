import logo from './logo.png';
import navIcon from './navigation-bar.png';
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
                <li className='Navlinks'>Home</li>
                <li className='Navlinks'>Menu</li>
                <li className='Navlinks'>Order</li>
                <li className='Navlinks'>Contact</li>
                <img class = "nav-icon" src = {navIcon} alt = "logo" width = "10%" height = "50%"/>
                
            </ul>
        </nav>
        
    )
}
export default Navbar;