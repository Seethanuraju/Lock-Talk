import React from 'react'
import '../src/App.css'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Secret from './component/Secret'
import Encrypt from './component/Encrypt'
function App() {
  return(
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Secret/>}></Route>
      <Route path='/encrypt' element={<Encrypt/>}></Route>
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App