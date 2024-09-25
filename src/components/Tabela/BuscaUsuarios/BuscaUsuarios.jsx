import { useEffect, useState } from "react";
import './main.sass'
import { RiDeleteBin5Line } from "react-icons/ri";
import { deleteUsuario, getUsuario } from "../../../services/NovoUsuario/NovoUsaurio";
import { toast } from "react-toastify";


function BuscaUsuarios({atualziarPeloAdicionar}) {
    const [currentPage, setCurrentPage] = useState(1);
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [login, setLogin] = useState('');
    const [id, setId] = useState('');
    const [paginas, setPaginas] = useState(1);
    const [listaUsuarios, setListaUsuarios] = useState([])

    const [atualizar, setAtualziar] = useState(false)

    const data = {
      nomeUsuario: nome,
      emailUsuario: email,
      idUsuario: id

    }

    const handleDelete = (event, id) => {
      event.preventDefault();
      handlerDeletarUsuario(id)
      buscarUsuarios(data, currentPage)
    }

    const handlerFilterNome = (event) => {
        setNome(event.target.value)
    }

    
    const handlerFilterEmail = (event) => {
      setEmail(event.target.value)
    }
    
    const handlerFilterLogin = (event) => {
      setLogin(event.target.value)
    }
    
    const handlerFilterId = (event) => {
      setId(event.target.value)
    }

    const buscarUsuarios = (objeto, page) => {
      getUsuario(objeto, page).then((resp) => {
        setListaUsuarios(resp.data.content)
        setPaginas(resp.data.totalPages)
      }).catch((e) => {
      })
    }


    useEffect(() => {
      buscarUsuarios(data, currentPage)
    }, [currentPage, email, login, nome, id, atualizar, atualziarPeloAdicionar])
  

    const handlePageChange = (pageNumber) => {
      setCurrentPage(pageNumber);
    };
  
    const handlerDeletarUsuario = (id) => {
      deleteUsuario(id)
      .then((resp) => {
        toast.success(resp.data.descricao)
        setAtualziar(!atualizar)
      }).catch((e) => {
        toast.error("Usuario nao foi encontrado.")
      })
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
                placeholder="email"
                value={email}
                onChange={handlerFilterEmail}
            />
            <input
                type="text"
                placeholder="login"
                value={login}
                onChange={handlerFilterLogin}
            />
            <input
                type="text"
                placeholder="id"
                value={id}
                onChange={handlerFilterId}
            />

        </div>
    </div>



    <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Nome</th>
            <th>Email</th>
            <th>Login</th>
            <th>Opções</th>
          </tr>
        </thead>
        <tbody>
          {listaUsuarios.map(item => (
            <tr key={item.id}>
              <td id="idUsuario">{item.id}</td>
              <td id="nomeUsuario">{item.nome}</td>
              <td>{item.email}</td>
              <td>{item.username}</td>
              <td><RiDeleteBin5Line id="delete" onClick={(event) => handleDelete(event, item.id)}/></td>
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

export default BuscaUsuarios