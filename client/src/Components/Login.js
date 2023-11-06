import { useState } from "react";

function Login() {

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    async function loginUser(event) {
        event.preventDefault()
        const response = await fetch('http://localhost:5000/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email,
                password,
            }),
        })

        const data = await response.json()
        console.log(data)
    }

    return (
        <div class="loginContainer">
            <form class="loginForm" onSubmit={loginUser}>
                <div class="input-box">
                    <header>Login Here</header>
                    <div class="input-field">
                        <input type="text" class="input" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        <label for="email">Email</label>
                    </div>
                    <div class="input-field">
                        <input type="password" class="input" value={password} onChange={(e) => setPassword(e.target.value)} />
                        <label for="pass">Password</label>
                    </div>
                    <div class="input-field">
                        <input type="submit" class="submit" value="Login" />
                    </div>
                    <div class="alternative">
                        <span>Don't have an account? <a href="/register">Register</a></span>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default Login;