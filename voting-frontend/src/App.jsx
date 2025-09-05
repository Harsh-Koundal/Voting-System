import {BrowserRouter, Routes, Route,Navigate} from 'react-router-dom'
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import VotePage from "./pages/VotePage";
import Admin from "./pages/Admin";
import Results from "./pages/Results";
import './App.css'

function App() {

  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/register' element={<Register />} />
      <Route path='/login' element={<Login />} />
      <Route path ='/vote' element={<VotePage />} />
      <Route path='/results' element={<Results />} />
      <Route path='/admin' element={<Admin />} />
     </Routes>
    </BrowserRouter>
  )
}

export default App
