import './App.css';
import './firebase';

import Router from './routes/routes';
import { AuthProvider } from './contexts/AuthContext';
import { DbProvider } from './contexts/firebase-db';
import { useDB } from './contexts/firebase-db';


function App() {
  return (
    <div className="App">
      <AuthProvider>
        <DbProvider>
          <Router />
        </DbProvider> 
      </AuthProvider>
    </div>
  );
}

export default App;
