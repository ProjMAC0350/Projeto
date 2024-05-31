import React, { useState } from "react";
import { Link } from "react-router-dom";


export const Login = () => {
  function Mouseover(event) {
    event.target.style.background = 'rgb(300, 190, 2)';
  }
  function Mouseout(event){
    event.target.style.background="";
  }

  const[username, setUsername] = useState("");
  const[password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log("Envio");
  };

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
            <input type="Username" placeholder="ID or Mail USP" onChange={(e) => setUsername(e.target.value)} onSubmit={handleSubmit}/>
            <input type="Password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} onSubmit={handleSubmit}/>
            <Link to=""><button className="buttonlogin" type="button" onMouseOver={Mouseover} onMouseOut={Mouseout}>Login</button></Link>
            <Link to="" ><button className="buttonlogin2">Registre-se</button></Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
