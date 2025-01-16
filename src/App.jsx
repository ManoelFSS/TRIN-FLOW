import React, { useState } from "react"
// components
import Painel from "./pages/painel/layout"
import Login from "./pages/login"

function App() {
  const [islogged, setIsLogged] = useState(false)

  return (
    <>
      {islogged ? <Painel /> : <Login />}
    </>
  )
}

export default App
