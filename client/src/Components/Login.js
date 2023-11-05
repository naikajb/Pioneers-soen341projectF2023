import React from "react";

function Login() {
    return (
        <div class="loginContainer">
 <form class="loginForm" action="">
                                <div class="input-box">
                                    <header>Login Here</header>
                                    <div class="input-field">
                                        <input type="text" class="input" id="email" required="" autocomplete="off" />
                                        <label for="email">Email</label>
                                    </div>
                                    <div class="input-field">
                                        <input type="password" class="input" id="pass" required="" />
                                        <label for="pass">Password</label>
                                    </div>
                                    <div class="input-field">
                                        <input type="submit" class="submit" value="Login" />
                                    </div>
                                    <div class="alternative">
                                        <span>Don't have an account? <a href="register">Register</a></span>
                                    </div>
                                </div>
                            </form>
        </div>
    );
}

export default Login;