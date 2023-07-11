import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { Auth } from '../../auth/auth'
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import './styles.css';
import { getCourses } from '../../services/api';

const Courses = () => {

    const { logout } = useContext(Auth)
    const handleLogout = () => {
        logout();
    }
    const [courses, setCourses] = useState([])
    const navigate = useNavigate();

    const home = () => {
        navigate('/home')
    }
    const { token } = localStorage.getItem('token')
    const id = 1
    const cancelarInscricao = async (id) => {
        console.log("CANCEL", id)
        try {
            const resp = await axios.delete(`http://192.168.0.14:4000/inscricoes/id/${id}`);
            console.log("RESP", resp)
            if (resp)
                toast.success("Sua Matrícula foi cancelada!");
            listCourses();
        } catch (err) {
            console.log("Error", err)
            toast.error("Erro ao Cancelar Matrícula!");
        }

    }

    const listCourses = async () => {
        try {
            const resp = await getCourses()

            setCourses(resp.data)
            console.log("Courses", resp.data)

        } catch (err) {
            console.log("Error", err)
        }

    }

    useEffect(() => {
        listCourses();
    }, [setCourses])


    return (
        <>
            <h1 className="title">Meus Courses</h1>
            <button onClick={handleLogout}>Logout</button>
            <button onClick={home}>Página Inicial</button>

            {/* <button onClick={listarCursos}>Listar Courses</button> */}

            {courses?.map((curso) =>
                <div key={curso.id} className="card">
                    <h1><span>Curso Id: </span> {curso.cursoId}</h1>
                    <p><span>Usuário: </span> {curso.usuarioId}</p>
                    <button onClick={() => cancelarInscricao(curso.id)} className="cancelar">Cancelar Inscrição</button>
                </div>
            )}

        </>
    );


}

export default Courses;