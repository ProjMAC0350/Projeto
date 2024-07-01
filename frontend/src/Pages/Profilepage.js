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
  } catch (error) {
    console.error('Error fetching user:', error);
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
  const tokenid = getToken();

  const [usuario, setusuario] = useState(null);
  const [isLoading, setLoading] =useState(true);

  const { id } = useParams();

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      const infousuario = await getUsuario(id);
      setusuario(infousuario);
      setLoading(false);
    };
    fetchUser();
    }, [id]);

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
