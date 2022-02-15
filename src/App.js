import React from 'react'
import { Catalog} from './components/catalog/catalog';
import {Menu} from './components/menu/menu'
import { BuyPage } from './components/buypage/buypage';
import { BrowserRouter ,Routes, Route } from 'react-router-dom';



export const App = () => {
  return <>
    <BrowserRouter>
    <Menu/>
        <Routes>
            <Route path="/" element={<Catalog/>} />
            <Route path="/catalog" element={<Catalog/>} />
            <Route path="/buypage" element={<BuyPage/>} />
        </Routes>
    </BrowserRouter>  
  </>
}

export default App
