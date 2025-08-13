import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import BlinkitHeader from './Components/Header';
import AddProduct from './Components/AddProduct';
import EditProduct from './Components/EditProduct';
import Home from './Components/Home';

function App() {
   const [searchTerm, setSearchTerm] = useState("")

  return (
    <>
      <BlinkitHeader onSearch={setSearchTerm} />
      <Routes>
        <Route path="/" element={<Home searchTerm={searchTerm} />} />
        <Route path="/add-product" element={<AddProduct />} />
        <Route path="/edit-product/:id" element={<EditProduct />} />
        <Route path="*" element={<h2>404 Page Not Found</h2>} />
      </Routes>
    </>
  )
}

export default App
