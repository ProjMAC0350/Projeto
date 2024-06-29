import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types'

async function logando(emailsenha) {
  const { email, password } = emailsenha;
  const espera = await fetch('http://localhost:8080/login?email=${email}&password=${password}`', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
  });
  if (!espera.ok) {
    alert("Usuário ou senha inválidos");
    return null;
  }
    return espera.json();
 }

export const Login = ( {setToken} ) => {
  function Mouseover(event) {
    event.target.style.background = 'rgb(300, 190, 2)';
  }
  function Mouseout(event){
    event.target.style.background="";
  }

  const[email, setUsername] = useState("");
  const[password, setPassword] = useState("");

  const mudarpag = useNavigate();

  const handleSubmit = async event => {
    event.preventDefault();
    const tokenData = await logando({ email, password });
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
            <Link to=""><button className="buttonlogin" type="submit" onMouseOver={Mouseover} onMouseOut={Mouseout}>Entrar</button></Link>
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
