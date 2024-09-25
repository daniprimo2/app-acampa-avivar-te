import { RiUserAddFill } from "react-icons/ri";
import { useEffect, useState } from "react";

import './main.sass'
import { toast } from "react-toastify";
import Layout from "../../../components/Layout/Layout";
import InputPadrao from "../../../components/input/InputPadrao/InputPadrao";
import LoadingSpinner from "../../../components/Loading/LoadingSpinner";
import BuscaFornecedor from "../../../components/Tabela/BuscaFornecedores/BuscaFornecedor";
import { buscaDashboard } from "../../../services/Inscritos/Inscritos";
import log from "loglevel";

function Inscritos() {
    const [atualizar, setAtualziar] = useState(true)
    const [mostrarCarregando, setMostrarCarregando] = useState(false)

    const [totalInscrito, setTotalInscrito] = useState(0)
    const [inscritoPago, setInscritoPago] = useState(0)
    const [inscritoEmAndamento, setInscritoEmAndamento] = useState(0)
    const [totalPago, setTotalPago] = useState(0.0)

    const handlerBuscarInformacoes = () => {
        setMostrarCarregando(true)
        buscaDashboard().then(resp => {
            setTotalInscrito(resp.data.totalInscritos)
            setInscritoPago(resp.data.inscritosPago)
            setInscritoEmAndamento(resp.data.inscritosEmAndamento)
            setTotalPago(resp.data.totalPago)
            setMostrarCarregando(false)
        }).catch((e) => {
            setMostrarCarregando(false)
            log.setLevel('info')
            log.info(e.data)
        }) 
    }


    useEffect(() => {
        handlerBuscarInformacoes()
    }, [atualizar])

    
    useEffect(() => {
        const interval = setInterval(() => {
            setAtualziar(prev => !prev);
        }, 5 * 60 * 1000); 

        return () => clearInterval(interval); 
    }, []);

  return (
    <Layout>
        <div className="container">
             <h1><RiUserAddFill/> Dashboard</h1>
            <div className="sessoes">
                <div className="quadro">
                    <h2>Total Inscritos</h2>
                    <h3>{totalInscrito}</h3>
                </div>
                <div className="quadro">
                    <h2>Inscritos Pago</h2>
                    <h3>{inscritoPago}</h3>
                </div>
                <div className="quadro">
                    <h2>Em Andamento</h2>
                    <h3>{inscritoEmAndamento}</h3>
                </div>
                
                <div className="quadro">
                    <h2>Total Pago</h2>
                    <h3>R$ {totalPago} </h3>
                </div>

            </div>
            <h1><RiUserAddFill/> Inscritos</h1>

            <BuscaFornecedor atualziarPeloAdicionar={atualizar}/>
        </div>
        {mostrarCarregando && <LoadingSpinner mensagem={"Gerando novo usuário."}/>}
    </Layout>
  )
}   

export default Inscritos