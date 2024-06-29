import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Login } from './Pages/LoginPage';
import { Register } from './Pages/Registerpage';
import { Profile } from './Pages/Profilepage';
import { Inicio } from './Pages/Iniciopage'
import { SeusGrupos } from './Pages/Seusgrupospage';
import useToken from './Pages/useToken';
import Grupos from './Pages/Grupospage';

function App() { 
 const { token, setToken } = useToken();

  if(!token) {
    <Router>
      return <Login setToken={setToken} />;
    </Router>
  }
  return (
    <Router>
      <div className="App">
        <Routes>  
          <Route path="/" element={<Login setToken={setToken}/>} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile token={token}/>} />
          <Route path="/inicio" element={<Inicio token={token}/>} />
          <Route path="/seusgrupos" element={<SeusGrupos token={token}/>} />
          <Route path="/grupos" element={<Grupos token={token}/>} />
          <Route path="*" element={<h1>Page Not Found</h1>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
