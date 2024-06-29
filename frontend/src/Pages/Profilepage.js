import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from './usp-2018.png'
import { useParams } from 'react-router-dom';
import { getToken } from './useToken'


export async function getUsuario(id) {
  try {
      const response = await fetch(`http://localhost:8080/users/id?id=${id}`, {
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


export const Profile = () => {
  function Mouseover(event) {
    event.target.style.background = 'rgb(300, 190, 2)';
  }
  function Mouseout(event){
    event.target.style.background="";
  }
  const token = getToken();

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
              <img className="ftperfil" src={usuario.photo} alt="a" />
          </div>
          <div className="infosusuario">
            <p>Nome: {usuario.name}</p>
            <p>Email: {usuario.mail}</p>
            <p>Curso: {usuario.course}</p>
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
