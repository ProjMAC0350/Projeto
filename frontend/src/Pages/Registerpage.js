import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';


export const Register = () => {
  const [usuarios, setFormUsuarios] = useState({
    nome: '',
    numerousp: '',
    curso: '',
    fotodeperfil: '',
    email: '',
    password: '',
  });

  const handleChange = (event) => {
    const { name, value, type, files } = event.target;
    setFormUsuarios({
        ...usuarios,
        [name]: type === 'file' ? files[0] : value,
    });
  };

  const [redirect, setRedirect] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault(); 

    setFormUsuarios.append('nome', setFormUsuarios.nome);
    setFormUsuarios.append('numerousp', setFormUsuarios.numerousp);
    setFormUsuarios.append('curso', setFormUsuarios.curso);
    setFormUsuarios.append('fotodeperfil', setFormUsuarios.fotodeperfil);
    setFormUsuarios.append('email', setFormUsuarios.email);
    setFormUsuarios.append('password', setFormUsuarios.password);

    try{
      const response = await axios.post('http://localhost:8080/users', usuarios, {
      headers: {
        'Content-Type': 'application/json',
      },
      });

      if(response.status === 201){
        alert('Usuario Criado');
        setRedirect(true);
      } 
      else{
          alert("Usuario nao foi criado");
      }
    } 
    catch(error){
      alert("Erro");
      }
  };

  const mudarpag = useNavigate();

  useEffect(() => {
    if (redirect) {
      mudarpag('/');
    }
  }, [redirect, mudarpag]);

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
      <div className="loginpage">
        <div className="Blocoregister">
          <div className="contentloginBloco">
            <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Nome" name='nome' onChange={handleChange}/>
            <input type="number" placeholder="Número Usp" name='numerousp' onChange={handleChange}/>
            <input type="text" placeholder="Curso" name='curso' onChange={handleChange}/>
            <input type='text' placeholder='Foto de Perfil' name='fotodeperfil' onChange={handleChange}/>
            <input type="text" placeholder="Digite o seu Email" name='email' onChange={handleChange}/>
            <input type="Password" placeholder="Digite senha desejada" name='password' onChange={handleChange}/>
            </form>
            <Link to="/"><button className="buttonlogin" type="submit" onMouseOver={Mouseover} onMouseOut={Mouseout}>Registrar</button></Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
