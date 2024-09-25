import { useState } from "react"
import { GiHamburgerMenu } from "react-icons/gi"
import { SlArrowDown, SlArrowRight } from "react-icons/sl"
import { Link, useNavigate } from "react-router-dom"

import './main.sass'

function CampoSimples({nomeMenu}) {
    const [mostraMenu, setMostraMenu] = useState(false);
    const navigate = useNavigate();

  return (
    <>
            <ul className={false ? "selecionado" : "nao-selecionado"} onClick={() => navigate("//inscritoe")}>
            <li><Link to={"/inscrito"}>{false ?  <SlArrowDown /> : <SlArrowRight/>} {nomeMenu}</Link></li>
        
        </ul>
    </>
  )
}

export default CampoSimples

/*
listaSubMenus.map((item, index) => {
                    <div className="sub-menu">
                        <li key={index}><Link to={item.path}/><GiHamburgerMenu />{item.label}</li>
                    </div>
                })
*/