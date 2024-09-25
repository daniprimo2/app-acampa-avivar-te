import { useState } from "react"
import { GiHamburgerMenu } from "react-icons/gi"
import { SlArrowDown, SlArrowRight } from "react-icons/sl"
import { Link } from "react-router-dom"

import './main.sass'

function Campo({nomeMenu, listaSubMenus}) {
    const [mostraMenu, setMostraMenu] = useState(false);


  return (
    <>
            <ul className={mostraMenu ? "selecionado" : "nao-selecionado"} onClick={() => setMostraMenu(!mostraMenu)}>
            <li><Link>{mostraMenu ?  <SlArrowDown /> : <SlArrowRight/>} {nomeMenu}</Link></li>

            {mostraMenu && (
                <div className="sub-menu">
                    {listaSubMenus && listaSubMenus.map((item, index) => (
                    <li id="sub-menu-descrincao" key={index}>
                        <Link to={item.path}>
                        <GiHamburgerMenu /> <span>{item.label}</span>
                        </Link>
                    </li>
                    ))}
                </div>
            )}
        
        </ul>
    </>
  )
}

export default Campo

/*
listaSubMenus.map((item, index) => {
                    <div className="sub-menu">
                        <li key={index}><Link to={item.path}/><GiHamburgerMenu />{item.label}</li>
                    </div>
                })
*/