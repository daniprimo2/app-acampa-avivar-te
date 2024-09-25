import { useEffect, useState } from "react"
import { RiDeleteBin5Line } from "react-icons/ri";


import './main.sass'
import { toast } from "react-toastify";
import { getAplicacoes, deleteAplicacao } from "../../../services/aplicacao/Aplicacao";

function BuscarAplicacoes({atualziarPeloAdicionar}) {
    const [currentPage, setCurrentPage] = useState(1);
    const [paginas, setPaginas] = useState(1);

    const [nomeAplicacao, setAplicacao] = useState('')
    const [descricao, setDescricao] = useState('')
    const [idAplicacao, setIdAplicacao] = useState('')
    const [atualizar, setAtualziar] = useState(false)
    const [listaAplicacoe, setListaAplicacoe] = useState([])


    const data = {
        tipo: nomeAplicacao,
        descricao: descricao,
        id: idAplicacao
    }

    const buscarAplicacoes = (objeto, page) => {
        getAplicacoes(objeto, page).then((resp) => {
            setPaginas(resp.data.totalPages)
            setListaAplicacoe(resp.data.content)
        }).catch((e) => {
        })
    }

    const deletarAplicacoes = (id) => {
        deleteAplicacao(id).then((resp) => {
            toast.success(resp.data.descricao)
            setAtualziar(!atualizar)
        }).catch((e) => {
            toast.error("Aplicacao não foi encontrado.")
        })
    }

    const handlerDelete = (event, id) => {
        event.preventDefault();
        deletarAplicacoes(id)
        buscarAplicacoes(data, currentPage)
    } 

  

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
      };

    const handlerNomeAplicacao = (event) => {
        setAplicacao(event.target.value)
    }

    const handlerDescricaoAplicacao = (event) => {
        setDescricao(event.target.value)
    }

    const handlerIdAplicacao = (event) => {
        setIdAplicacao(event.target.value)
    }

    useEffect(() => {
        buscarAplicacoes(data, currentPage)
    }, [currentPage, nomeAplicacao, descricao, idAplicacao, atualizar, atualziarPeloAdicionar])


  return (
    <div className="list-component">
    <div className="filters">
        <h2>Filtrar por: </h2>
        <div>
            <input
                type="text"
                placeholder="Nome"
                value={nomeAplicacao}
                onChange={handlerNomeAplicacao}
            />
            <input
                type="text"
                placeholder="Descricao da aplicação"
                value={descricao}
                onChange={handlerDescricaoAplicacao}
            />
            <input
                type="text"
                placeholder="Id"
                value={idAplicacao}
                onChange={handlerIdAplicacao}
            />

        </div>
    </div>

    <table>
        <thead>
            <tr>
                <th>Id</th>
                <th>Tipo</th>
                <th>descricao</th>
                <th>Opções</th>
            </tr>
        </thead>
            {listaAplicacoe.map(item => (
                <tr key={item.id}>
                    <td id="idUsuario">{item.id}</td>
                    <td id="nomeUsuario">{item.tipo}</td>
                    <td>{item.descricao}</td>
                    <td><RiDeleteBin5Line id="delete" onClick={(event) => handlerDelete(event, item.id)}/></td>
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

export default BuscarAplicacoes