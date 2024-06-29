import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from './usp-2018.png'
import { getToken } from './useToken'

export const Grupos = () => {
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
      <div className="gruposgrid">
        <div className="fotogrp">
                <img className="ftperfil" src={'https://via.placeholder.com/250'} alt="a" />
                <p className="Descricao">Descrição:</p>
              <p className="Descricaotxt">Nós somos um grupo de maratona</p>
        </div>
        <div className="line"></div>
        <div className="feedgrp">
            <img className="ftperfil" src={'https://via.placeholder.com/250'} alt="a" />
        </div>
      </div>
    </div>
  );
};

export default Grupos;
