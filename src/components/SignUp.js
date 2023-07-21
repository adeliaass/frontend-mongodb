import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'
import './style.css'


const SignUp = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const auth = localStorage.getItem('user');
        if (auth) {
            navigate('/')
        }
    }, [])

    const collectData = async () => {
        if (!name || !email || !password) {
            alert("Please fill in all the fields");
            return;
          }
        
          if (!email.includes("@")) {
            alert("Invalid email format. Please enter a valid email address.");
            return;
        }


        console.warn(name, email, password);
        let result = await fetch("https://backend-mongodb-nu.vercel.app/register", {
            method: 'POST',
            body: JSON.stringify({ name, email, password }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        result = await result.json();
        console.warn(result)
        localStorage.setItem("user", JSON.stringify(result.result));
        localStorage.setItem("token", JSON.stringify(result.auth));
        navigate('/')
    } 
    



    return (
        <div className='login template d-flex justify-content-center align-items-center vh-100 bg-white'>
        <div className="form_container p-5 rounded border">
            <form>
            <h3 className='text-center'>Register</h3>
            <div className="mb-2">
            <label htmlFor="nama">Nama</label>
            <input type="text" placeholder="Enter Name" className="form-control"
                value={name} onChange={(e) => setName(e.target.value)}/>
        </div>
        <div className="mb-2">
        <label className="email">Email</label>
            <input type="text" placeholder="Enter Email" className="form-control"
                value={email} onChange={(e) => setEmail(e.target.value)}/>
        </div>
        <div className="mb-2">
        <label className="password">Password</label>
        <div className="input-group">
             <input type={showPassword ? "text" : "password"} 
             placeholder="Enter Password" 
             className="form-control"
            value={password} 
            onChange={(e) => setPassword(e.target.value)} />
            <button className="btn btn-outline-secondary" 
            type="button" 
            onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? (<i className="bi bi-eye-slash"></i>) 
            : (<i className="bi bi-eye"></i>)}
            </button>
            </div>
        </div>
        <div className='d-grid'>
            <button onClick={collectData} className="btn btn-primary">Sign Up</button>
        </div>
        <p className='text-right'>
                Already have an account? <a href="/login">Login</a>
            </p>
        </form>
        </div>
        </div>
    )
}
export default SignUp
