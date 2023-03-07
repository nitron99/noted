import React, { useState } from 'react';

// contexts
import { useAuth } from  '../../contexts/AuthContext';

import './styles.css';

const Login = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function submitHandler(e) {
    e.preventDefault()
    //check the condition of email and password
    //signupHanlder(email,password)
    if(password.length >=  6){
      loginHanlder(email,password)
    }else{
      //password short error
    }
  }

  const loginHanlder = (email,password) => {
    login(email, password)
  }
    
  return (
    <div className='login-container'>
      <div className='login-navbar'>
        <div>notE<em>D</em></div>
      </div>

      <div className='login-form-container'>
        <form onSubmit={submitHandler} className='login-form'>
          <div>Login</div>
          <div className='login-input'>
            <input className='email' placeholder='email' type='text' value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
          </div>
          <div className='login-input'>
            <input className='password' placeholder='password' type='password' value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
          </div>
          <div className='login-btn-panel'>
            <button className='login-btn'>Login</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login;