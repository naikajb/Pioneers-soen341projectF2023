import React from "react";

function Register() {
    return(
        <div class="registerContainer">
            <form class = "registerForm" action="">
                <div class="input-box">
                   <header>Register Here</header>
                   <div class="input-field">
                    <input type="text" class="input" id="name" required="" autocomplete="off" />
                    <label for="name">Name</label> 
                </div> 
                   <div class="input-field">
                        <input type="text" class="input" id="email" required="" autocomplete="off" />
                        <label for="email">Email</label> 
                    </div> 
                   <div class="input-field">
                        <input type="password" class="input" id="pass" required="" />
                        <label for="pass">Password</label>
                    </div> 
                   <div class="input-field">
                        
                        <input type="submit" class="submit" value="Register" />
                   </div> 
                   <div class="alternative">
                    <span>Already have an account? <a href="login">Login</a></span>
                   </div>
                </div> 
                </form> 
        </div>
    );
}

export default Register;