import Login from './Login'
import Cadastro from './Cadastro'
import { BrowserRouter } from 'react-router-dom'
import { Routes, Route } from 'react-router-dom'

function App() {
  return(
  <BrowserRouter>
    <Routes>
      <Route path='/login' element={<Login />} />
      <Route path='/cadastro' element={<Cadastro />} />
    </Routes>
  </BrowserRouter>
  )
}

export default App