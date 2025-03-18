import React, { useState } from "react"
// components
import Layout from "./pages/painel/layout"
import Login from "./pages/login"
// hooks
import useToogleMenu from "./pages/hooks/useToogleMenu"

function App() {
  const { toogleMenu, setToogleMenu } = useToogleMenu()
  const [islogged, setIsLogged] = useState(false)
  
  return (
    <>
      {!islogged ? <Layout $setToogleMenu={setToogleMenu} $toogleMenu={toogleMenu}></Layout> : <Login />}
    </>
  )
}

export default App
