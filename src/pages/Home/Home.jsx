import { useEffect, useState } from "react"
import LoadingSpinner from "../../components/Loading/LoadingSpinner";
import Layout from "../../components/Layout/Layout";
import EmDesenvolvimento from "../EmDesenvolvimento/EmDesenvolvimento";

function Home() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 5000)
  }, [])

  return (
    <Layout>
      <EmDesenvolvimento />
    </Layout>
  )
}

export default Home

/*

      {loading ? (<LoadingSpinner mensagem={"Carregando pagina home"}/>):(<PaginaEmDesenvolvimento />)}

*/