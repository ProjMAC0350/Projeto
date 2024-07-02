import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

export const Register = () => {
  const [name, setName] = useState('');
  const [nusp, setNusp] = useState('');
  const [email, setEmail] = useState('');
  const [pwd, setPwd] = useState('');
  const [photo, setPhoto] = useState('');
  const [course, setCourse] = useState('');
  const [redirect, setRedirect] = useState(false);
  const mudarpag = useNavigate();

  const handleChange = (event) => {
    const { name, value, type, files } = event.target;
    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'nusp':
        setNusp(value);
        break;
      case 'email':
        setEmail(value);
        break;
      case 'pwd':
        setPwd(value);
        break;
      case 'photo':
        setPhoto(value);
        break;
      case 'course':
        setCourse(value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const dados = new FormData();
    dados.append('name', name);
    dados.append('nusp', nusp);
    dados.append('email', email);
    dados.append('pwd', pwd);
    dados.append('photo', photo);
    dados.append('course', course);

    try {
      const response = await axios.post('http://localhost:8080/users', dados, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 201) {
        alert('Usuário criado com sucesso');
        setRedirect(true);
      } else {
        alert('Usuário não foi criado');
      }
    } catch (error) {
      alert('Erro ao cadastrar usuário');
      console.error(error);
    }
  };

  useEffect(() => {
    if (redirect) {
      mudarpag('/');
    }
  }, [redirect, mudarpag]);

  const handleMouseOver = (event) => {
    event.target.style.background = 'rgb(300, 190, 2)';
  };

  const handleMouseOut = (event) => {
    event.target.style.background = '';
  };

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
              <input type="text" placeholder="Nome" name='name' value={name} onChange={handleChange} />
              <input type="number" placeholder="Número Usp" name='nusp' value={nusp} onChange={handleChange} />
              <input type="text" placeholder="Email" name='email' value={email} onChange={handleChange} />
              <input type='password' placeholder='Senha' name='pwd' value={pwd} onChange={handleChange} />
              <input type="text" placeholder="Link da foto" name='photo' value={photo} onChange={handleChange} />
              <input type="text" placeholder="Curso" name='course' value={course} onChange={handleChange} />
              <button className="buttonlogin" type="submit" onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>Registrar</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
