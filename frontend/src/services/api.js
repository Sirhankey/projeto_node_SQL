import axios from "axios";

export const api = axios.create({
    baseUrl: "http://localhost:4000",
})


export const createSession = async (email, password) => {
    // return api.post("http://192.168.0.14:3001/auth/login/"
    return api.post("http://localhost:3333/login/", {
        email: email, password: password
    });
}


//TODO: ENVIAR TOKEN NO HEADER
// export const getCourses = async (token) => {
//     console.log("TOKEN", token)

//     return api.get("http://localhost:3333/course/", {
//         token: token
//     })
// }

export const getCourses = async (token) => {
    try {
        return await axios.get('http://localhost:3333/course/', {
            headers: {
                Authorization: `${token}`
            }
        });
        // Faça algo com os dados dos cursos recebidos
    } catch (error) {
        // Lide com erros
    }
};

export const getRegistrations = async (token) => {
    try {
        return await axios.get('http://localhost:3333/registration/', {
            headers: {
                Authorization: `${token}`
            }
        });
        // Faça algo com os dados dos cursos recebidos
    } catch (error) {
        // Lide com erros
    }
};