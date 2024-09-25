import { baseAutenticar } from "../ApiBase/ApiBase";

export const buscarInscritos = (data, page) => {
    const url = `/inscritos/buscar/comFiltro?size=10&page=${page}`;
    return baseAutenticar.post(url, data);
}

export const buscaDashboard = () => {
    const url = '/inscritos/infos';
    return baseAutenticar.get(url);
}

export const buscarInscritoId = (id) => {
    const url = `/inscritos/${id}`;
    return baseAutenticar.get(url);
}