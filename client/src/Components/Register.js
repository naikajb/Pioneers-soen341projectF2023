import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Register () {
  const [name, setName] = useState()
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  async function registerUser (event) {
    event.preventDefault()
    const response = await fetch('/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name,
        email,
        password
      })
    })

    const data = await response.json()

    if (data.status === 'ok') {
      console.log('Registration successful')
      navigate('/login')
    } else {
      setError(data.error)
    }
  }

  return (
    <div class='registerContainer'>
      <form class='registerForm' onSubmit={registerUser}>
        <div class='input-box'>
          <header>Register Here {error && <div className='error-message'>{error}</div>}</header>

          <div class='input-field'>
            <input type='text' class='input' id='name' value={name} onChange={(e) => setName(e.target.value)} required />
            <label for='name'>Name</label>
          </div>
          <div class='input-field'>
            <input type='text' class='input' id='email' value={email} onChange={(e) => setEmail(e.target.value)} required />
            <label for='email'>Email</label>
          </div>
          <div class='input-field'>
            <input type='password' class='input' id='pass' value={password} onChange={(e) => setPassword(e.target.value)} required />
            <label for='pass'>Password</label>
          </div>
          <div class='input-field'>
            <input type='submit' class='submit' value='Register' />
          </div>
          <div class='alternative'>
            <span>Already have an account? <a href='/login'>Login</a></span>
          </div>
        </div>
      </form>
    </div>

  )
}

export default Register
