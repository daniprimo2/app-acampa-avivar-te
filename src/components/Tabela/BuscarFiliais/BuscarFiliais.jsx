import { useEffect, useState } from "react"
import { getFilial, deleteFilial } from "../../../services/filial/filial";
import { RiDeleteBin5Line } from "react-icons/ri";


import './main.sass'
import { toast } from "react-toastify";

function BuscarFiliais({atualziarPeloAdicionar}) {
    const [currentPage, setCurrentPage] = useState(1);
    const [paginas, setPaginas] = useState(1);


    const [nomeFilial, setNome] = useState('')
    const [centroDeCustoFilial, setCentroDeCusto] = useState('')
    const [patenteFilial, setPatente] = useState('')
    const [idFilial, setId] = useState('')
    const [atualizar, setAtualziar] = useState(false)
    const [listaFiliais, setListaFiliais] = useState([])

    const data = {
        nome: nomeFilial,
        centroDeCusto: centroDeCustoFilial,
        patente: patenteFilial,
        id: idFilial
    }


    const buscarFiliais = (objeto, page) => {
        getFilial(objeto, page).then((e) => {
            setListaFiliais(e.data.content)
            setPaginas(e.data.totalPages)
        }).catch((e) => {
        })
    }

    const deletarFiliais = (id) => {
        deleteFilial(id).then((resp) => {
            toast.success(resp.data.descricao)
            setAtualziar(!atualizar)
        }).catch((e) => {
            toast.error("Filial não foi encontrado.")
        })
    }

    const handleDelete = (event, id) => {
        event.preventDefault();
        deletarFiliais(id)
        buscarFiliais(data, currentPage)

    }


    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
      };

    const handlerFilterNome = (event) => {
        setNome(event.target.value)
    }

    const handlerCentroDeCusto = (event) => {
        setCentroDeCusto(event.target.value)
    }

    const handlerPatente = (event) => {
        setPatente(event.target.value)
    }

    const handlerId = (event) => {
        setId(event.target.value)
    }

    useEffect(() => {
       buscarFiliais(data, currentPage); 
    }, [currentPage, nomeFilial, patenteFilial, centroDeCustoFilial, idFilial, atualizar, atualziarPeloAdicionar])

  return (
    <div className="list-component">
        <div className="filters">
            <h2>Filtrar por: </h2>
            <div>
                <input
                    type="text"
                    placeholder="Nome"
                    value={nomeFilial}
                    onChange={handlerFilterNome}
                />
                <input
                    type="text"
                    placeholder="Centro de custo"
                    value={centroDeCustoFilial}
                    onChange={handlerCentroDeCusto}
                />
                <input
                    type="text"
                    placeholder="Patente"
                    value={patenteFilial}
                    onChange={handlerPatente}
                />
                <input
                    type="text"
                    placeholder="Id"
                    value={idFilial}
                    onChange={handlerId}
                />
            </div>
        </div>

        <table>
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Nome</th>
                    <th>Centro de custo</th>
                    <th>Nivel</th>
                    <th>Opções</th>
                </tr>
            </thead>
                {listaFiliais.map(item => (
                    <tr key={item.id}>
                        <td id="idUsuario">{item.id}</td>
                        <td id="nomeUsuario">{item.nome}</td>
                        <td>{item.centroDeCusto	}</td>
                        <td>{item.patente}</td>
                        <td><RiDeleteBin5Line id="delete" onClick={(event) => handleDelete(event, item.id)}/></td>
                    </tr>
                ))}
            <tbody>

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

export default BuscarFiliais