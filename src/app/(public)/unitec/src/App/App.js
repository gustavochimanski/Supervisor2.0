import React from "react"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import SolicitarDemonstracao from "../Components/Demonstracao"
import TodasFuncionalidades from "../Components/TodasFuncionalidades"
import Home from "../Pages/Home"
function App() {
  return (
    <Router>
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/solicitar-demonstracao" element={<SolicitarDemonstracao />} />
        <Route path="/funcionalidades" element={<TodasFuncionalidades/>}/>
      </Routes>
    </div>
  </Router>
  )
}

export default App

