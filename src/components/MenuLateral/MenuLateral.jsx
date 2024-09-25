import './main.sass'
import Campo from "../campoMenu/Campo";

import logo from '../../image/Projeto_Redimensionar_imagem-removebg-preview.png'


function MenuLateral({mostra, mostraSubMenu, setMostraSubMenu, nomeMenu}) {

  const menuFornecedor = [
    {path: "/inscrito", label: "Inscritos"}
  ];

    return (
    <div className={mostra ? "active" : "sidenav"}>
                <img src={logo} alt="Logo da Drogaria" id="logo" />

        <Campo nomeMenu={"Acampa 2025"} listaSubMenus={menuFornecedor}/>


    </div>
  )
}

export default MenuLateral