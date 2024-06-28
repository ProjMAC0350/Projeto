import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from './usp-2018.png'

export const Profile = () => {
  function Mouseover(event) {
    event.target.style.background = 'rgb(300, 190, 2)';
  }
  function Mouseout(event){
    event.target.style.background="";
  }
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
          <Link to="/seusgrupos" >Seus Grupos</Link>
          <Link to="/profile" >Perfil</Link>
          <Link to="/" >Sair</Link>
      </nav>
      <div className="profilepg">
        <div className="profileif">
          <div className="foto">
              <img className="ftperfil" src={'https://via.placeholder.com/250'} alt="a" />
          </div>
          <div className="infosusuario">
            <p>nome</p>
            <p>email</p>
            <button className="buttonlogin" type="button" onMouseOver={Mouseover} onMouseOut={Mouseout}>Alterar email</button>
            
            <button className="buttonlogin" type="button" onMouseOver={Mouseover} onMouseOut={Mouseout}>Alterar Senha</button>
          </div>
        </div>
        <div className="infosusuariocursogrp">
        <p>curso</p>
        <p>Grupos</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
