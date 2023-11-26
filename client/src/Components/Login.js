import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from '../context/userContext.js';

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  // async function loginUser(event) {
  //   event.preventDefault();
  //   try {
  //     const response = await fetch("/api/login", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
          
  //       },withCredentials:true,
        
  //       body: JSON.stringify({
  //         email,
  //         password,
  //       }),
  //     });
  
  //     const data = await response.json();
  
  //     if (data.status === 'ok') {
  //       console.log("Login successful");
  //       setUser(data.user); // Update user context with the received user data
        

  //       // Fetch user profile after navigating to the home page
  //       const profileResponse = await fetch("/api/profile");
  //       const profileData = await profileResponse.json();
  //       setUser(profileData);
  //       navigate("/");
        
  //     } else {
  //       setError(data.error);
  //     }
  //   } catch (error) {
  //     console.error("Error during login:", error);
  //     setError("Internal server error");
  //   }
  // }

  async function loginUser(event) {
    event.preventDefault();
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: 'include', // Use 'credentials' instead of 'withCredentials'
        body: JSON.stringify({
          email,
          password,
        }),
      });
  
      const data = await response.json();
  
      if (response.ok) {

        if(data.status === 'error') {
            setError(data.error);
        }

        else {

        
        console.log("Login successful");
        setUser(data.user); 
        
        // Fetch user profile after navigating to the home page
        const profileResponse = await fetch("/api/profile");
        const profileData = await profileResponse.json();
        setUser(profileData);
        navigate("/");
        }
      } 
    } catch (error) {
      console.error("Error during login:", error);
      setError("Internal server error");
    }
  }
  

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
