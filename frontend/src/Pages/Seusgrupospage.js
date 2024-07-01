import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from './usp-2018.png'
import { getToken } from './useToken'

export async function getGrpown(id) {
  try {
      const response = await fetch(`http://localhost:8080/users/id?id=${id}/ownedgroups`, {
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


export const SeusGrupos = () => {
  const token=getToken();

  const [gruposown, setgruposown] = useState([]);
  const [isLoading, setLoading] =useState(false);

  useEffect(() => {
    const fetchGrpsown = async () => {
      setLoading(true);
      const infogrpsown= await getGrpown(token);
      setgruposown(infogrpsown);
      setLoading(false);
    };
    fetchGrpsown();
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
          <Link to={`/profile/${token}`} >Perfil</Link>
          <Link to="/" >Sair</Link>
      </nav>
      <div className="grpsdiv">
        <div className="grps">
          <img className="ftperfil" src={gruposown.photo} alt="a" />
          <p className="guponame">{gruposown.name}</p>
          <p className="grupodescricao">{gruposown.description}</p>
          <Link to={`/grupos/${gruposown.id}`} ><button className="buttongrp">Acesse</button></Link>
        </div>
      </div>
    </div>
  );
};

export default SeusGrupos;
