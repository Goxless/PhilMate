import React from 'react';
import { useRoutes } from './routes';
import {BrowserRouter as Router} from 'react-router-dom';

function App() {

  const routs = useRoutes(false);

  return (
    <Router>
      <div className="App">
        {routs}
      </div>
    </Router>
  );
}

export default App;
