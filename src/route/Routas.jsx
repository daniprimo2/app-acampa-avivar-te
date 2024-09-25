import { Route, BrowserRouter as Router, Routes } from "react-router-dom"
import Login from "../pages/Login/Login"
import Home from "../pages/Home/Home"
import Inscritos from "../pages/Fornecedor/NovoFornecedor/Inscritos"
import InscritosParcelas from "../pages/Inscrito/InscritosParcelas"

function Routas() {
  return (
    <>
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/home" element={<Home />} />
                <Route path="/inscrito" element={<Inscritos />} />
                <Route path="/inscrito/:id" element={<InscritosParcelas />} />


            </Routes>
        </Router>
    </>
  )
}

export default Routas