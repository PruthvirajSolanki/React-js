import { useState } from 'react'
import './App.css'
import { Route, Routes } from "react-router";
import FlipkartHeader from './Components/Header';
import Home from './Pages/Home';
import AddProduct from './Components/AddProduct';
import EditProduct from './Pages/EditProduct';


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <FlipkartHeader />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add-product" element={<AddProduct />} />
        <Route path="/edit-product/:id" element={<EditProduct />} />
      </Routes>
    </>
  )
}

export default App
