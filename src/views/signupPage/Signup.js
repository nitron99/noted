import React,{useState} from 'react'
import './signup.css'
import { useAuth } from  '../../contexts/AuthContext'
import {Link} from 'react-router-dom'

function Signup() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmpassword, setConfirmPassword] = useState('')

    const {currentUser, signup} = useAuth()

    function submitHandler(e) {
      e.preventDefault()

      //check the condition of email and password
      //signupHanlder(email,password)
      if(password === confirmpassword)
      {
        if(password.length >=  6)
        {
          signupHanlder(email,password)
        }else{
          //password short error
        }
      }else{
        //password don't match error
      }

    }

    const googlesignupHandler = () => {

    }

    const signupHanlder = (email,password) => {
      signup(email, password)
    }
    
  return (
    <div className='signup-container'>
         <div className='signup-navbar'>
            <div>notE<em>D</em></div>
        </div>

        <div className='signup-form-container'>
          <form onSubmit={submitHandler} className='signup-form'>
            <div>Create Account</div>
            <div className='signup-input'>
              <input className='email' placeholder='email' type='text' value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
            </div>
            <div className='signup-input'>
              <input className='password' placeholder='password' type='password' value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
            </div>
            <div className='signup-input'>
              <input className='password' placeholder='password again' type='password' value={confirmpassword} onChange={(e)=>{setConfirmPassword(e.target.value)}}/>
            </div>
            <div className='signup-input signup-btn-panel'>
              <button className='signup-btn createacc'>Create Account</button>
              <button className='signup-btn googlesignup' onClick={googlesignupHandler}>Google Signup</button>
            </div>
            <Link to='/login'><u>Already have an account?</u></Link>
          </form>
          
        </div>
    </div>
  )
}

export default Signup