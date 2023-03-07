import React from 'react'
import { Link } from 'react-router-dom';

//contexts
import { useAuth } from '../../contexts/AuthContext';

import './styles.css';

const Home = () => {
  const { currentUser } = useAuth();

  return (
    <div className='home-container'>
      <div className='vertical-bar1'></div>
      <div className='vertical-bar2'></div>
      <div className='vertical-margin'></div>
      <div className='home-navbar'>
        <div className='home-logo'>notE<em>D</em></div>
        {
          (currentUser === null) 
          ? 
            <div>
              <Link to="/signup">
                <button className='home-navbar-btn'>
                  Sign Up
                </button>
              </Link>
              <Link to="/login">
                <button className='home-navbar-btn'>
                  Log in
                </button>
              </Link>
            </div>
          : 
            <Link to="/dashboard">
              <button className='home-navbar-btn dashboard-btn'>
                Dashboard
              </button>
            </Link>
        }
      </div>
      <div className='home-divider'></div>
      <div className='home-body'>
        {/* This is home body */}
        <div className='home-body-title'>
          A simple note taking web app.
        </div>
      </div>
    </div>
  )
}

export default Home