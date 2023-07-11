import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { Auth } from '../../auth/auth'
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import './styles.css';
import { getCourses } from '../../services/api';

const Home = () => {

  const { logout } = useContext(Auth)
  const handleLogout = () => {
    logout();
  }
  const [token, setToken] = useState('');
  const [courses, setCourses] = useState([])
  const navigate = useNavigate();

  const meusCursos = () => {
    navigate('/meusCursos')
  }

  const listCourses = async (token) => {
    try {
      const resp = await getCourses(token)
      setCourses(resp?.data)
      console.log("CURSOS", resp.data)
    } catch (err) {
      console.log("Error", err)
    }

  }

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
      listCourses(storedToken);
    }
  }, [setCourses])


  const idUsuario = localStorage.getItem('id')

  const inscricao = async (id) => {
    console.log("ID DO CURSO", id)
    try {
      const resp = await axios.post(`http://192.168.0.14:4000/inscricoes/${idUsuario}`, {

        data_inscricao: new Date(),
        cursoId: id
      });
      if (resp.data)
        toast.success("Inscrição realizada com sucesso!");
      listCourses();
    } catch (err) {
      toast.error(err.response.data);
      console.log("Error", err)
    }
  }

  return (
    <>
      <h1 className="title">Página Inicial</h1>
      <button onClick={handleLogout} >Logout</button>
      <button onClick={meusCursos} >Meus Cursos</button>

      <h2>Cursos Disponíveis</h2>

      {/* <button onClick={listarCursos}>Listar Cursos</button> */}

      {courses?.map((curso) =>
        <div key={curso.id} className="card">
          <h1><span>Curso </span> {curso.name}</h1>
          <p><span>Descrição: </span> {curso.description}</p>
          <p><span>Quantidade de Inscritos:</span> {curso.enrolled_students}</p>
          <button onClick={() => inscricao(curso.id)} className="inscrever">Inscrever</button>
        </div>
      )}

    </>
  );


}

export default Home;