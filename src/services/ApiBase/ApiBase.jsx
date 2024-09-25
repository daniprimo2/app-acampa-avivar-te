import axios from 'axios'

export const baseAutenticar = axios.create({
    baseURL: "http://ec2-18-208-232-215.compute-1.amazonaws.com:8080",
    headers: {
        'Accept': '*/*',
        'Content-Type': 'application/json'
    }
})


export const verificarServidor = () => {
    return baseAutenticar.get('/');
};