import { useEffect, useState } from 'react'
import './main.sass'
import {FaUser, FaLock} from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';     

import logo from '../../image/Projeto_Redimensionar_imagem-removebg-preview.png'
import { autenticar } from '../../services/Autenticacao/ApiAuth';
import { verificarServidor } from '../../services/ApiBase/ApiBase';
import LoadingSpinner from '../../components/Loading/LoadingSpinner';

function Login() {
  const [login, setLogin] = useState("")
  const [senha, setSenha] = useState("")
  const [loading, setLoading] = useState(true)
  const [atualizar, setAtualizar] = useState(true)


  const data = {
    login: login,
    password: senha
  }

  const navigate = useNavigate()

  const handlerSubmit = (e) => {
    e.preventDefault();
    setLoading(true)
    
    autenticar(data).then((e) => {
      toast.success("Usuario logado")
      navigate("/inscrito")
      setLoading(false)
    }).catch((e) => {
      setLoading(false)
      toast.error("Usuário não indentificado.")
    })

  }

  setTimeout(() => {
    setAtualizar(!atualizar)
  }, 5000)


  useEffect(() => {
    verificarServidor().then((resp) => {
      setLoading(false)
    }).catch(() => {
      setLoading(true)
    })
  }, [atualizar])


  return (
    <aside id='login'>
        <form>
        <img src={logo} alt="Logo da Drogaria" id="logo" />
            <div id='campo-credenciais'>

              <div className='campo'>
                <input type='text' placeholder='Login' onChange={(e) => setLogin(e.target.value)}/>
                <FaUser className='icon'/>
              </div>
              
              <div className='campo'>
                <input type='password' placeholder='Senha' onChange={(e) => setSenha(e.target.value)}/>
                <FaLock className='icon'/>
              </div>

              <div className='lembra'>
                <label>
                  <input type='checkbox'/>
                  Lembrar de mim
                </label>
                <a href='#'>Esqueci a senha</a>
              </div>

              <button className='botao' onClick={(e) => handlerSubmit(e)}>Entrar</button>


            </div>

        </form>
        {loading && <LoadingSpinner mensagem={"Carregando API..."}/>}

    </aside>
    

  )
}

export default Login