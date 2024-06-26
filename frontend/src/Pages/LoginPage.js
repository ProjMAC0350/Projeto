import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types'

async function logando(emailsenha) {  
  const espera = await fetch('http://localhost:8080/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(emailsenha)
  }).then((response) => {
    if(!response.ok) throw new Error(response.status);
	  else return response.json();
  }).then((data) => {
	  return data
  }).catch((error) => {
    console.log('error: ' + error);
	  return null;
  });
	return espera
}

export const Login = ( {setToken} ) => {
  function Mouseover(event) {
    event.target.style.background = 'rgb(300, 190, 2)';
  }
  function Mouseout(event){
    event.target.style.background="";
  }

  const[mail, setUsername] = useState("");
  const[password, setPassword] = useState("");

  const mudarpag = useNavigate();

  const handleSubmit = async event => {
    event.preventDefault();
    const tokenData = await logando({ mail, password });
    if(tokenData){
        setToken(tokenData);
        mudarpag('/inicio');
    }
  } 

  return ( 
    <div>
      <div className="headerlogin">
         <div className="headerline">
            <div id="HeaderUSP"></div>
         </div>
      </div>
      <div className="loginpage">
        <div className="Blocologin">
          <div className="contentloginBloco">
            <form onSubmit={handleSubmit}>
            <input type="Username" placeholder="Email USP" onChange={(event) => setUsername(event.target.value)}/>
            <input type="Password" placeholder="Password" onChange={(event) => setPassword(event.target.value)}/>
            <button className="buttonlogin" type="submit" onMouseOver={Mouseover} onMouseOut={Mouseout}>Entrar</button>
            <Link to="/register" ><button className="buttonlogin2">Registre-se</button></Link>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

Login.propTypes = {
  setToken: PropTypes.func.isRequired
};

export default Login;
