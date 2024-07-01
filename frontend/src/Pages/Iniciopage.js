import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from './usp-2018.png'
import { getToken } from './useToken'

export async function getGrp() {
  try {
      const response = await fetch(`http://localhost:8080/users/groups`, {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json'
          }
      });
      if (!response.ok) {
          if (response.status === 404) {
              console.error('Groups error!');
          } 
          return null;
      }
      return await response.json();
  } 
  catch (error) {
      return null;
  }
}


export const Inicio = () => {
  const tokenid=getToken();

  const [grupos, setgrupos] = useState([]);
  const [isLoading, setLoading] =useState(false);

  useEffect(() => {
    setLoading(true);
    const fetchGrps = async () => {
      const infogrps= await getGrp();
      setgrupos(infogrps);
      setLoading(false);
    };
    fetchGrps();
    },);


    if(isLoading){
      return <div>Loading...</div>
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
          <Link to="/inicio" >Inicio</Link>
          <Link to="/seusgrupos" >Seus Grupos</Link>
          <Link to={'/profile/${tokenid}'} >Perfil</Link>
          <Link to="/" >Sair</Link>
      </nav>
      <div className="grpsdiv">
        <div className="grps">
          <img className="ftperfil" src={grupos.photo} alt="a" />
          <p className="guponame">{grupos.name}</p>
          <p className="grupodescricao">{grupos.description}</p>
          <Link to={'/grupos/${grupos.id}'} ><button className="buttongrp">Acesse</button></Link>
        </div>
      </div>
    </div>
  );
};

export default Inicio;
