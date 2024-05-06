import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import '../../Assests/Login.css';
import { FaLock, FaUser } from "react-icons/fa";

export default function Login() {

  // let navigate = useNavigate();

  const [name, setName] = useState("");
  const [pass, setPass] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e) {
    // e.preventDefault();
    if (name === "admin" && pass === "admin") {
      // localStorage.setItem("id", name);
      // localStorage.setItem("password", pass);
      navigate("/admin/sidebar");
    } else {
      alert("Invalid Id & Password");
    }
  }



  return (
    <div className=' row  '>
      <div className="col-lg-12 col-md-12 col-sm-12 login">
      <div className=' wrapper'>
        <form onSubmit={handleSubmit}>
          <h1>Login</h1>
          <div className="input-box">
            <input
              type="text"
              placeholder='Username'
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <FaUser className='icon' />
          </div>
          <div className="input-box">
            <input
              type="password"
              placeholder='Password'
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              required
            />
            <FaLock className='icon' />
          </div>

          {/* <div className="remember-forgot">
          <label><input type="checkbox" /> Remember Me</label>
          <a href='#'>Forgot password</a>
        </div> */}

          <button onClick={(e) => handleSubmit(e.target.value)} type='submit'>Login</button>

          {/* <div className="register-link">
          <p>Don't have an account? <a href='#'>Register</a></p>
        </div> */}

        </form>
      </div>
      </div>
    </div>
  );
}
