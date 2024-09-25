import { useEffect, useState } from "react";
import './main.sass'
import { RiDeleteBin5Line } from "react-icons/ri";
import { toast } from "react-toastify";
import { buscarInscritos } from "../../../services/Inscritos/Inscritos";
import { useNavigate } from "react-router-dom";
import { FcInfo } from "react-icons/fc";

function BuscaFornecedor({atualziarPeloAdicionar}) {
    const [currentPage, setCurrentPage] = useState(1);
    const [nome, setNome] = useState('');
    const [cnpj, setCnpj] = useState('');
    const [login, setLogin] = useState('');
    const [id, setId] = useState('');
    const [paginas, setPaginas] = useState(1);
    const [listaUsuarios, setListaUsuarios] = useState([])

    const [atualizar, setAtualziar] = useState(false)

    const navigate = useNavigate();


    const data = {
      nome: nome,
      sexo: cnpj,
      status: login,
      whatsApp: id
  }

    const handleDelete = (event, id) => {
      event.preventDefault();
      handlerDeletarFornecedor(id)
      navigate(`/inscrito/${id}`)
      getInscritos(data, currentPage)
    }

    const handlerFilterNome = (event) => {
        setAtualziar(!atualizar)
        setNome(event.target.value)
    }

    
    const handlerFilterEmail = (event) => {
      setAtualziar(!atualizar)
      setCnpj(event.target.value)
    }
    
    const handlerFilterLogin = (event) => {
      setAtualziar(!atualizar)
      setLogin(event.target.value)
    }
    
    const handlerFilterId = (event) => {
      setAtualziar(!atualizar)
      setId(event.target.value)
    }

    const getInscritos = (objeto, page) => {
      buscarInscritos(objeto, page).then((resp) => {
        setListaUsuarios(resp.data.content)
        setPaginas(resp.data.totalPages)
      }).catch((e) => {
      })
    }


    useEffect(() => {
      getInscritos(data, currentPage)
    }, [currentPage, cnpj, login, nome, id, atualizar, atualziarPeloAdicionar])
  

    const handlePageChange = (pageNumber) => {
      setCurrentPage(pageNumber);
    };
  
    const handlerDeletarFornecedor = (id) => {

    }

  return (
    <div className="list-component">
    <div className="filters">
        <h2>Filtrar por: </h2>
        <div>
            <input
                type="text"
                placeholder="Nome"
                value={nome}
                onChange={handlerFilterNome}
            />
            <input
                type="text"
                placeholder="Sexo"
                value={cnpj}
                onChange={handlerFilterEmail}
            />
            <input
                type="text"
                placeholder="Status"
                value={login}
                onChange={handlerFilterLogin}
            />
            <input
                type="text"
                placeholder="Whats App"
                value={id}
                onChange={handlerFilterId}
            />

        </div>
    </div>



    <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>WhatsApp</th>
            <th>Status</th>
            <th>Pagamento</th>
            <th>Acessar Perfil</th>
          </tr>
        </thead>
        <tbody>
          {listaUsuarios.map(item => (
            <tr key={item.id}>
              <td id="nomeUsuario">{item.nome}</td>
              <td id="nomeUsuario">{item.whatsApp}</td>
              <td id="nomeUsuario">{item.status}</td>
              <td id="nomeUsuario">{item.quantidadeParcela}</td>


              <td><FcInfo id="delete" onClick={(event) => handleDelete(event, item.id)}/></td>
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

export default BuscaFornecedor