import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './style.css'
const Login = () => {

    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    useEffect(() => {
        const auth = localStorage.getItem('user');
        if (auth) {
            navigate("/")
        }
    }, [])

    const handleLogin = async (e) => {
        e.preventDefault('');
        setEmailError('');
        setPasswordError('');


    if (!email.includes('@')) {
      setEmailError('Invalid email format. Please enter a valid email address.');
      return;
    }

    if (!password) {
      setPasswordError('Please enter your password');
      return;
    }

        let result = await fetch("https://backend-mongodb-nu.vercel.app/login", {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        result = await result.json();
        console.warn(result)
        if (result.auth) {
            localStorage.setItem('user', JSON.stringify(result.user));
            localStorage.setItem('token', JSON.stringify(result.auth));
            navigate("/")
        } else {
            alert("Invalid email or password")
        }
    }

    return (
        <div className='login template d-flex justify-content-center align-items-center vh-100 bg-white'>
            <div className='form_container p-5 rounded border'>
            <form> 
            <h3 className='text-center'>Login</h3>
            <div className='mb-2'>
            <label htmlFor='email'>Email</label>
            <input type="text" placeholder='Enter Email' className='form-control'
                onChange={(e) => setEmail(e.target.value)} value={email} />
                 {emailError && <p className="error">{emailError}</p>}
            </div>
            <div className='mb-2'>
            <label htmlFor='password'>Password</label>
            <div className="input-group">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter Password"
                className="form-control"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <i className="bi bi-eye-slash"></i>
                ) : (
                  <i className="bi bi-eye"></i>
                )}
              </button>
            </div>
            {passwordError && <p className="error">{passwordError}</p>}
            </div>
            <div className='mb-2'>
                <input type='checkbox' className='custom-control custom-checkbox' id="check"/>
                <label htmlFor='check' className='custom-input-label ms-2'>
                    Remember me
                </label>
            </div>
            <div className='d-grid'>
            <button onClick={handleLogin} className="btn btn-primary">Login</button>
            </div>
            <p className='text-right'>
                Dont have an account? <a href="/signup">Register</a>
            </p>
        </form>
        </div>
        </div>
    )
}

export default Login