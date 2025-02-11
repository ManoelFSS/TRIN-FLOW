import React, { useState } from "react"
// components
import Painel from "./pages/painel/layout"
import Login from "./pages/login"
// hooks
import useToogleMenu from "./pages/hooks/useToogleMenu"

function App() {
  const { toogleMenu, setToogleMenu } = useToogleMenu()
  const [islogged, setIsLogged] = useState(false)
  
  return (
    <>
      {!islogged ? <Painel $setToogleMenu={setToogleMenu} $toogleMenu={toogleMenu} /> : <Login />}
    </>
  )
}

export default App
