import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from './usp-2018.png'
import { getToken } from './useToken'
import { useParams } from 'react-router-dom';

export async function getGrp(idgrp) {
  try {
      const response = await fetch(`http://localhost:8080/groups/id?id=${idgrp}`, {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json'
          }
      });
      if (!response.ok) {
          if (response.status === 404) {
              console.error('User not found!');
          } 
          return null;
      }
      return await response.json();
  } 
  catch (error) {
      return null;
  }
}


export const Grupos = () => {
  const tokenid = getToken();

  const [grupoid, setgrp] = useState(null);
  const [isLoading, setLoading] =useState(false);

  const { idgrp } = useParams();

  useEffect(() => {
    const fetchGrpr = async () => {
      setLoading(true);
      const infogrp = await getGrp(idgrp);
      setgrp(infogrp);
      setLoading(false);
    };
    fetchGrpr();
    }, [idgrp]);

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
        <img src={logo} alt="a"></img>
        </div>
          <Link to="/Inicio" >Inicio</Link>
          <Link to="/seusgrupos" >Seus Grupos</Link>
          <Link to={`/profile/${tokenid}`} >Perfil</Link>
          <Link to="/" >Sair</Link>
      </nav>
      <div className="gruposgrid">
        <div className="fotogrp">
                <img className="ftperfil" src={grupoid.photo} alt="a" />
                <p className="Namegrp">{grupoid.name}:</p>
              <p className="Namegrpdescricao">{grupoid.description}</p>
        </div>
        <div className="line"></div>
        <div className="feedgrp">
        </div>
      </div>
    </div>
  );
};

export default Grupos;
