import { useEffect, useState } from "react"
// pages
import Layout from "./pages/painel/layout"
import Login from "./pages/login"
// components
import Loadingpage from "./components/loadingpage"
// hooks
import useToogleMenu from "./hooks/useToogleMenu"
// context  
import { useAuthContext } from "./context/AuthContext"


function App() {
  const { toogleMenu, setToogleMenu } = useToogleMenu()
  const { authenticated } = useAuthContext()
  const [loading, setLoading] = useState(true);

  useEffect(() => {
      setLoading(true);

      setTimeout(() => {
        setLoading(false); 
      }, 3000);
  }, [authenticated]);
  
  return (
    <>
      {authenticated ? <Layout $setToogleMenu={setToogleMenu} $toogleMenu={toogleMenu}></Layout> : <Login />}
      {loading && <Loadingpage />}
    </>
  )
}

export default App
