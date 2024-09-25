import { RiUserAddFill } from "react-icons/ri";
import { FaCheck } from "react-icons/fa";
import { useEffect, useState } from "react";
import { IoMdDownload } from "react-icons/io";
import { MdFileUpload } from "react-icons/md";
import { SlActionUndo } from "react-icons/sl";
import { RiDeleteBin5Line } from "react-icons/ri";


import './main.sass'
import { toast } from "react-toastify";
import Layout from "../../components/Layout/Layout";
import LoadingSpinner from "../../components/Loading/LoadingSpinner";
import { buscaDashboard, buscarInscritoId } from "../../services/Inscritos/Inscritos";
import { useNavigate, useParams } from "react-router-dom";
import { busacrParcelasPorId, deleteComprovante, uploadComprovante } from "../../services/Parcela/parcela";
import InputPadrao from "../../components/input/InputPadrao/InputPadrao";
import log from "loglevel";

function InscritosParcelas() {
    const {id} = useParams();
    const [atualizar, setAtualziar] = useState(true)
    const [mostrarCarregando, setMostrarCarregando] = useState(false)

    const [inscrito, setInscrito] = useState()

    const [nome, setNome] = useState()
    const [sexo, setSexo] = useState()
    const [status, setStatus] = useState()
    const [WhatsApp, setWhatsApp] = useState()
    const [idade, setIdade] = useState()
    const [comprovanteBase64, setComprovanteBase64] = useState("");

    const [parcelas, setParcela] = useState([])


    const navigate = useNavigate()

    const handlerBuscaInscrito = (id) => {
        setMostrarCarregando(true)

        buscarInscritoId(id).then(resp => {
            setNome(resp.data.nome)
            setSexo(resp.data.sexo)
            setStatus(resp.data.status)
            setWhatsApp(resp.data.whatsApp)
            setIdade(resp.data.idade)

            setMostrarCarregando(false)
        })
    }

    const handlerBuscaParcela = (id) => {
        setMostrarCarregando(true)
        busacrParcelasPorId(id).then(resp => {
            setParcela(resp.data)
            setMostrarCarregando(false)
        })
    }

    
    const handleDownload = (comprovante) => {
        const link = document.createElement("a");
        link.href = `data:application/pdf;base64,${comprovante}`; // ajuste o tipo MIME conforme necessário
        link.download = `comprovante_pagamento${nome}.pdf`; // nome do arquivo ao fazer o download
        link.click();
    };

    
    const handleUpload = (idParcela) => {
        const requestBody = {
            idParcela: idParcela,
            comprovantePg: comprovanteBase64 // String Base64 que você irá capturar de um input
        };
        uploadComprovante(requestBody).then(resp => {
            // Fazer algo após o upload, como atualizar a lista de parcelas
            handlerBuscaParcela(id);
        });
    };

    const handleExcluirComprovante = (id) => {
        deleteComprovante(id).then(() => {
            setAtualziar(!atualizar)
        }).catch(e => {
            log.setLevel('info')
            log.info(e)
        })
    }
    
    useEffect(() => {
        handlerBuscaInscrito(id)
        handlerBuscaParcela(id)
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
            <div className="cabecario">        
                <button className="volta" onClick={() => navigate("/inscrito")}>
                    <SlActionUndo id="icone"/>
                </button>
                 <h1><RiUserAddFill/> Perfil</h1>
            </div>
            <div className="sessoes tabela">     
                    <div className="bloco">
                        <InputPadrao type={"text"} dado={nome} label={"Nome"} setDado={() => {}}/>
                        <InputPadrao type={"text"} dado={sexo} label={"Sexo"} setDado={() => {}}/>
                        <InputPadrao type={"text"} dado={status} label={"Status"} setDado={() => {}}/>
                        <InputPadrao type={"text"} dado={WhatsApp} label={"WhatsApp"} setDado={() => {}}/>
                        <InputPadrao type={"text"} dado={idade} label={"Idade"} setDado={() => {}}/>
                    </div>
                    <div>
                        <table className="inscritos">
                            <thead>
                                <tr>
                                    <th>Mes</th>
                                    <th>Status</th>
                                    <th>Valor</th>
                                    <th>Comprovante</th>
                                </tr>
                            </thead>
                            <tbody>
                                {parcelas.map((inscrito, index) => (
                                    <tr key={index}>
                                        <td>{inscrito.mes}</td>
                                        <td>{inscrito.status}</td>
                                        <td>{inscrito.valor == '' ?  '-' : 'R$ '+ inscrito.valor}</td>
                                        <td id="comprovante">{inscrito.comprovante != null ? (
                                                <>
                                                    <button onClick={() => handleDownload(inscrito.comprovante)} className="download">
                                                        <IoMdDownload className="icone-download"/> Baixar Comprovante 
                                                    </button>
                                                    <button onClick={() => handleExcluirComprovante(inscrito.id)}
                                                     className="excluir">
                                                        <RiDeleteBin5Line className="icone-download"/> 
                                                    </button>
                                                </>
                                        ) : (
                                            <label className="upload">
                                                <MdFileUpload className="icone-ipload"/>

                                                Upload Comprovante  
                                                <input
                                                    type="file"
                                                    onChange={(e) => {
                                                        const file = e.target.files[0];
                                                        const reader = new FileReader();
                                                        reader.onloadend = () => {
                                                            const base64String = reader.result.split(',')[1]; 
                                                            setComprovanteBase64(base64String);
                                                        };
                                                        reader.readAsDataURL(file);
                                                        handleUpload(inscrito.id)
                                                    }}
                                                    className="input-pdf"
                                                />
                                            </label>
                                        )}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

            </div>

        </div>
        {mostrarCarregando && <LoadingSpinner mensagem={"Gerando novo usuário."}/>}
    </Layout>
  )
}   

export default InscritosParcelas