import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from './usp-2018.png';
import { getToken } from './useToken';

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
  } catch (error) {
    console.error('Error fetching groups:', error);
    return null;
  }
}

export const Inicio = () => {
  const tokenid = getToken();

  const [grupos, setGrupos] = useState([]);
  const [isLoading, setLoading] = useState(true); // Inicialize com true

  useEffect(() => {
    const fetchGrps = async () => {
      setLoading(true);
      const infogrps = await getGrp();
      if (infogrps) {
        setGrupos(infogrps); // Aqui `infogrps` provavelmente é um array de grupos
      }
      setLoading(false);
    };
    fetchGrps();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
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
          <img src={logo} alt="Logo USP"></img>
        </div>
        <Link to="/inicio">Inicio</Link>
        <Link to="/seusgrupos">Seus Grupos</Link>
        <Link to={`/profile/${tokenid}`}>Perfil</Link> {/* Corrigido template literal */}
        <Link to="/">Sair</Link>
      </nav>
      <div className="grpsdiv">
        {grupos.map((grupo) => (
          <div key={grupo.id} className="grps">
            <img className="ftperfil" src={grupo.photo} alt="Foto do grupo" />
            <p className="guponame">{grupo.name}</p>
            <p className="grupodescricao">{grupo.description}</p>
            <Link to={`/grupos/${grupo.id}`}><button className="buttongrp">Acesse</button></Link> {/* Corrigido template literal */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Inicio;
