import React from 'react';
import './styles/footer.css'; 
import twitter from './images/icons8-twitter-48.png';
import insta from './images/icons8-instagram-48.png';
import facebook from './images/icons8-facebook-48.png';
import linkedin from './images/icons8-linkedin-48.png';


const Footer = () => {
    return (
        <div className="footer">
            <p>© 2023 Pioneers. All rights reserved.</p>
            <a href="#">About Us</a> | 
            <a href="#">Listings</a> | 
            <a href="#">Contact Us</a> | 
            <a href="#">Privacy Policy</a> | 
            <a href="#">Terms of Service</a>
            <p><strong>Contact:</strong> +123456789 | Pioneers@gmail.com</p>
            <div className="social-media-icons">
                <a href="#"><img src={facebook} alt="Facebook" /></a>
                <a href="#"><img src={twitter} alt="Twitter" /></a>
                <a href="#"><img src={linkedin} alt="LinkedIn" /></a>
                <a href="#"><img src={insta} alt="Instagram" /></a>
            </div>
            <p>Stay connected with us on social media for the latest updates!</p>
            <p><strong>Disclaimer:</strong> The photos used in this project are not owned by the author and have been sourced from external sources. The author does not claim any rights over the photos, and they are being used for illustrative purposes only.</p>
        </div>
    );
}

export default Footer;
