import React from 'react';
import { useRoutes } from './routes';
import {BrowserRouter as Router} from 'react-router-dom';
import { useAuth } from './hooks/authHook';
import { AuthContext } from './context/authContext';

function App() {

  
  const {token,login,logout,userId} = useAuth()
  const isAuthenticated = !!token   //!!token // cast to bool
  const routs = useRoutes(isAuthenticated);

  return (

    <AuthContext.Provider value = {{token,login,logout,userId,isAuthenticated}}>


      <Router>
        <div className="App">
          {routs}
        </div>
      </Router>


    </AuthContext.Provider>
  );
}

export default App;
