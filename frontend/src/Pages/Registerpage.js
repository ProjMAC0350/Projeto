import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';


export const Register = () => {
  const [usuarios, setFormUsuarios] = useState({
    name: '',
    nusp: '',
    email: '',
    pwd: '',
    photo: '',
    course: '',
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

    setFormUsuarios.append('name', setFormUsuarios.name);
    setFormUsuarios.append('nusp', setFormUsuarios.nusp);
    setFormUsuarios.append('email', setFormUsuarios.email);
    setFormUsuarios.append('pwd', setFormUsuarios.pwd);
    setFormUsuarios.append('photo', setFormUsuarios.photo);
    setFormUsuarios.append('course', setFormUsuarios.course);

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
            <input type="text" placeholder="Nome" name='name' onChange={handleChange}/>
            <input type="number" placeholder="Número Usp" name='nusp' onChange={handleChange}/>
            <input type="text" placeholder="Email" name='email' onChange={handleChange}/>
            <input type='Password' placeholder='Senha' name='pwd' onChange={handleChange}/>
            <input type="text" placeholder="Link da foto" name='photo' onChange={handleChange}/>
            <input type="Text" placeholder="Curso" name='course' onChange={handleChange}/>
            <Link to="/"><button className="buttonlogin" type="submit" onMouseOver={Mouseover} onMouseOut={Mouseout}>Registrar</button></Link>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
