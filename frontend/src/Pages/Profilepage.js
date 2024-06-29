import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from './usp-2018.png'
import { useParams } from 'react-router-dom';


export async function getUsuario(id) {
  try {
      const espera = await fetch(`http://localhost:8080/users/id?id=${id}`, {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json'
          }
          body: JSON.stringify(id)
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


export const Profile = () => {
  function Mouseover(event) {
    event.target.style.background = 'rgb(300, 190, 2)';
  }
  function Mouseout(event){
    event.target.style.background="";
  }

  const [usuario, setusuario] = useState(null);

  const { id } = useParams();
  const idcerto = id.userId === 'string' ? parseInt(id.userId, 10) : id.userId;

  useEffect(() => {
    const fetchUser = async () => {
      const infousuario = await getUsuario(idcerto);
      setusuario(infousuario);
    };
    fetchUser();
    }, [id]);

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
          <div className="foto">
              <img className="ftperfil" src={'https://via.placeholder.com/250'} alt="a" />
          </div>
          <div className="infosusuario">
            <p>Nome: {user.nome}</p>
            <p>Email: {user.email}</p>
            <p>Curso: {user.curso}</p>
          </div>
        <div className="botoesaltera">
        <button className="buttonlogin" type="button" onMouseOver={Mouseover} onMouseOut={Mouseout}>Alterar foto</button>
        <button className="buttonlogin" type="button" onMouseOver={Mouseover} onMouseOut={Mouseout}>Alterar email</button>
        <button className="buttonlogin" type="button" onMouseOver={Mouseover} onMouseOut={Mouseout}>Alterar Senha</button>
        </div>
        <div className="infosusuario">
        <p>Grupos:</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
