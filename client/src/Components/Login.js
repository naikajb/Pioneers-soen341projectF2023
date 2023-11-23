// import { useState } from "react";
// import { useNavigate } from "react-router-dom";

// function Login() {

//     const [email, setEmail] = useState();
//     const [password, setPassword] = useState();
//     const [error, setError] = useState(null);
//     const navigate = useNavigate();

//     async function loginUser(event) {
//         event.preventDefault()
//         const response = await fetch('http://localhost:5000/api/login', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({
//                 email,
//                 password,
//             }),
//         })

//         const data = await response.json()
         
//         if (data.user) {
//             console.log('Login successful');
//             navigate("/");
//         } else {
//             setError(data.error);
//         }
//     }

//     return (
//         <div class="loginContainer">
//             <form class="loginForm" onSubmit={loginUser}>
//                 <div class="input-box">
//                     <header>Login Here {error && <div className="error-message">{error}</div>}</header>
//                     <div class="input-field">
//                         <input type="text" class="input" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
//                         <label for="email">Email</label>
//                     </div>
//                     <div class="input-field">
//                         <input type="password" class="input" value={password} onChange={(e) => setPassword(e.target.value)} required />
//                         <label for="pass">Password</label>
//                     </div>
//                     <div class="input-field">
//                         <input type="submit" class="submit" value="Login" />
//                     </div>
//                     <div class="alternative">
//                         <span>Don't have an account? <a href="/register">Register</a></span>
//                     </div>
//                 </div>
//             </form>
//         </div>
//     );
// }

// export default Login;


import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from '../context/userContext.js';

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  const loginUser = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        })//,
        // credentials: "include",
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Login successful");
        setUser(data.user); // Update user context with the received user data
        navigate("/");
      } else {
        setError(data.error);
      }
    } catch (error) {
      console.error("Error during login:", error);
      setError("Internal server error");
    }
  };

  return (
    <div className="loginContainer">
      <form className="loginForm" onSubmit={loginUser}>
        <div className="input-box">
          <header>
            Login Here {error && <div className="error-message">{error}</div>}
          </header>
          <div className="input-field">
            <input
              type="text"
              className="input"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label htmlFor="email">Email</label>
          </div>
          <div className="input-field">
            <input
              type="password"
              className="input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <label htmlFor="pass">Password</label>
          </div>
          <div className="input-field">
            <input type="submit" className="submit" value="Login" />
          </div>
          <div className="alternative">
            <span>
              Don't have an account? <a href="/register">Register</a>
            </span>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Login;
