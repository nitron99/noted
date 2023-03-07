import React from "react";
import Router from './routes/routes';

import { AuthProvider } from './contexts/AuthContext';
import { DbProvider } from './contexts/firebase-db';

import './App.css';
import './firebase';

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <DbProvider>
          <Router />
        </DbProvider> 
      </AuthProvider>
      
      {/* App Version Text */}
      <div className="version__txt">
        v{process.env.REACT_APP_VERSION}
      </div>
    </div>
  );
}

export default App;
