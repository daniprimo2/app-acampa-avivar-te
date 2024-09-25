import { useState } from 'react';
import './main.sass';
import { IoMdAddCircle } from "react-icons/io";

function ImputSelectAdicionarTipo({placeholder, controleModal,  listaOpcoes, dado, setDado, label, atualizar}) {
    const [selectedOption, setSelectedOption] = useState();

    
    const handleChange = (event) => {
        setSelectedOption(event.target.value);
        setDado(event.target.value);
    };

    const handlerAdicionar = (event) => {
        event.preventDefault()
        controleModal()
        atualizar()
    }

  return (
    <div className='campo-select'>
        <select value={selectedOption} onChange={handleChange}>
            <option value={""} disabled>{placeholder}</option>
            <option value={""}>{label}</option>

            {listaOpcoes.map((item, index) => (
                <option value={item.id} key={index}>{item.nome}</option>
            ))}
        </select>
        <IoMdAddCircle id='addIcon' onClick={(e) => handlerAdicionar(e)}/>
    </div>
  )
}

export default ImputSelectAdicionarTipo