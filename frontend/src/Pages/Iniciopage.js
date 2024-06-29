import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from './usp-2018.png'

async function getGrp(){
  try{
      const response = await fetch(`http://localhost:8080/groups`, {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify()
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
  }


export const Inicio = () => {
  const token = getToken();

  const [grupos, setgrupos] = useState(null);

  useEffect(() => {
    const fetchGrps = async () => {
      const infogrps= await getGrp();
      setgrupos(infogrps);
    };
    fetchGrps();
    },);

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
          <Link to="/profile" >Perfil</Link>
          <Link to="/" >Sair</Link>
      </nav>
    </div>
  );
};

export default Inicio;
