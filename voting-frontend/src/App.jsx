import {BrowserRouter, Routes, Route,Navigate} from 'react-router-dom'
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import VotePage from "./pages/VotePage";
import Admin from "./pages/Admin";
import Results from "./pages/Results";
import NabBar from './components/NabBar';
import Footer from './components/Footer';
import Profile from './pages/Profile';
import './App.css'
import Signup from './pages/Signup';

function App() {

  return (
    <BrowserRouter>
    <NabBar/>
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/register' element={<Register />} />
      <Route path='/login' element={<Login />} />
      <Route path='/signup' element={<Signup/>}/>
      <Route path ='/vote' element={<VotePage />} />
      <Route path='/results' element={<Results />} />
      <Route path='/admin' element={<Admin />} />
      <Route path='/profile' element={<Profile />} />
     </Routes>
      <Footer/>
    </BrowserRouter>
  )
}

export default App
