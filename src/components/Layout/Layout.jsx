import { GiHamburgerMenu } from "react-icons/gi"
import { IoMdExit } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import MenuLateral from "../MenuLateral/MenuLateral";

import './main.sass'

function Layout({children}) {
    const [mostrarLateral, setMostraLateral] = useState(true)
    const [mostraSubMenu, setMostraSubMenu] = useState(false)
    const navigate = useNavigate();
  return (
    <>
        <header>
          <GiHamburgerMenu onClick={() => setMostraLateral(!mostrarLateral)}/>
          <IoMdExit onClick={() => navigate("/")}/>
        </header>
        <MenuLateral nomeMenu={"Home"} mostra={mostrarLateral} mostraSubMenu={mostraSubMenu} setMostraSubMenu={setMostraSubMenu}/>

        <div className="main">
            {children}
        </div>
    </>
  )
}

export default Layout