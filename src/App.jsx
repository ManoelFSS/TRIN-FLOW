import { useEffect } from "react"
// pages
import Layout from "./pages/painel/layout"
import Login from "./pages/login"
// components
import Loadingpage from "./components/loadingpage"
// hooks
import useToogleMenu from "./pages/hooks/useToogleMenu"
// context  
import { useAuthContext } from "./context/AuthContext"


function App() {
  const { toogleMenu, setToogleMenu } = useToogleMenu()

  const { loading, setLoading, authenticated } = useAuthContext()

  useEffect(() => {
    if (loading) {
      setTimeout(() => {
        setLoading(false); // Garante a atualização correta do estado
      }, 2000);
    }
  }, [authenticated]);
  
  if(loading) return <Loadingpage />
  
  return (
    <>
      {authenticated ? <Layout $setToogleMenu={setToogleMenu} $toogleMenu={toogleMenu}></Layout> : <Login />}
    </>
  )
}

export default App
