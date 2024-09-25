import './main.sass'
import { useState } from "react";


function InputSelect({placeholder, listaOpcoes, dado, setDado, label}) {
    const [selectedOption, setSelectedOption] = useState();

    

    const handleChange = (event) => {
      setSelectedOption(event.target.value);
      setDado(event.target.value);
    };
    
  return (
    <div className='campo-select'>
        <select value={selectedOption} onChange={handleChange}>
            <option value={""} disabled>{placeholder}</option>
            <option value={""}>{label}</option>

            {listaOpcoes.map((item, index) => (
                <option value={item.value} key={index}>{item.nome}</option>
            ))}
        </select>
    </div>
  )
}

export default InputSelect