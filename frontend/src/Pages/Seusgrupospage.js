import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from './usp-2018.png'

export const SeusGrupos = () => {
  return ( 
    <div>
      <div className="headerlogin">
         <div className="headerline">
            <div id="HeaderUSP"></div>
         </div>
      </div>
      <nav className="navbar">
      <div className="ftlogo">
        <img src={logo}></img>
        </div>
          <Link to="/Inicio" >Inicio</Link>
          <Link to="/seusGrupos" >Seus Grupos</Link>
          <Link to="/profile" >Perfil</Link>
          <Link to="/" >Sair</Link>
      </nav>
    </div>
  );
};

export default SeusGrupos;
