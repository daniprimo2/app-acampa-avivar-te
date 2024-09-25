import { baseAutenticar } from "../ApiBase/ApiBase";


export const busacrParcelasPorId = (id) => {
    const url = `/parcela/${id}`;
    return baseAutenticar.get(url);
}

export const uploadComprovante = (data) => {
    const url = '/parcela/inserir/comprovente';
    return baseAutenticar.post(url, data)
}

export const deleteComprovante = (id) => {
    const url = `/parcela/deletar/comprovante/${id}`;
    return baseAutenticar.delete(url)
}