import React, { useEffect, useState } from 'react'
import { deletarPorId, getVeiculos } from '../../../services/Veiculo/veiculo'
import { RiDeleteBin5Line } from 'react-icons/ri'
import { toast } from 'react-toastify'

function BuscarVeiculos({atualziarPeloAdicionar}) {
    const [placa, setPlaca] = useState('')
    const [modelo, setModelo] = useState('')
    const [tipo, setTipo] = useState('')
    const [categora, setCategoria] = useState('')
    const [listaVeiculos, setListaVeiculos] = useState([])

    const [currentPage, setCurrentPage] = useState(1);
    const [paginas, setPaginas] = useState(1);

    const [atualizar, setAtualizar] = useState(false)

    const data ={
        placa: placa,
        modelo: modelo,
        tipo: tipo,
        categoria: categora
    }

    const handlerFilterPlaca = (event) => {
        setPlaca(event.target.value)
    }

    const handlerFilterModelo = (event) => {
        setModelo(event.target.value)
    }

    
    const handlerFilterTipo = (event) => {
        setTipo(event.target.value)
    }

    
    const handlerFilterCategoria = (event) => {
        setCategoria(event.target.value)
    }

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    }

    const buscarVeiculos = (objeto, page) => {
        getVeiculos(objeto, page).then((resp) => {
            setListaVeiculos(resp.data.content)
            setPaginas(resp.data.totalPages)
        }).catch((e) => {
        })
    }

    useEffect(() => {
        buscarVeiculos(data, currentPage)
    }, [currentPage, placa, modelo, tipo, categora, atualizar, atualziarPeloAdicionar])

    
    const handleDelete = (event, placa) => {
        event.preventDefault();
        handlerDeletarVeiculo(placa)
        buscarVeiculos(data, currentPage)
        setAtualizar(!atualizar)
    }
    
    const handlerDeletarVeiculo = (placa) => {
        deletarPorId(placa).then((resp) => {
            toast.success(resp.data.descricao)
            setAtualizar(!atualizar)

        }).catch((e) => {
            toast.error("Falha ao deletar a placa "+ placa)
        })
    }

  return (
    <div className="list-component">
        <div className="filters">
            <div>
                <input type="text"
                       placeholder='Placa'
                       value={placa}
                       onChange={handlerFilterPlaca}
                />
                <input type="text"
                       placeholder='Modelo'
                       value={modelo}
                       onChange={handlerFilterModelo}
                />
                <input type="text"
                       placeholder='Tipo'
                       value={tipo}
                       onChange={handlerFilterTipo}
                />
                <input type="text"
                       placeholder='Categoria'
                       value={categora}
                       onChange={handlerFilterCategoria}
                />
            </div>
        </div>

        <table>
            <thead>
                <tr>
                    <th>Placa</th>
                    <th>Modelo</th>
                    <th>Ano</th>
                    <th>Tipo</th>
                    <th>Categoria</th>
                    <th>Ações</th>

                </tr>
            </thead>
            <tbody>
                {listaVeiculos.map(item => (
                    <tr key={item.placa}>
                        <td id='idUsuario'>{item.placa}</td>
                        <td id='nomeUsuario'>{item.modelo}</td>
                        <td>{item.ano}</td>
                        <td>{item.categoria.nome}</td>
                        <td>{item.tipo.nome}</td>
                        <td><RiDeleteBin5Line id="delete" onClick={(event) => handleDelete(event, item.placa)}/></td>
                    </tr>
                ))}
            </tbody>
        </table>

        <div className="pagination">
            {Array.from({ length: paginas }, (_, index) => (
                <button
                key={index + 1}
                onClick={() => handlePageChange(index + 1)}
                className={currentPage === index + 1 ? 'active' : ''}
                >
                {index + 1}
                </button>
            ))}
            </div>

    </div>
  )
}

export default BuscarVeiculos