import { useState } from 'react';
import './App.css';
import { Route, Routes } from 'react-router';
import FlipkartHeader from './Components/Header';
import Home from './Pages/Home';
import AddProduct from './Components/AddProduct';
import EditProduct from './Pages/EditProduct';

function App() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <>
      <FlipkartHeader onSearch={setSearchTerm} />
      <Routes>
        <Route path="/" element={<Home searchTerm={searchTerm} />} />
        <Route path="/add-product" element={<AddProduct />} />
        <Route path="/edit-product/:id" element={<EditProduct />} />
      </Routes>
    </>
  );
}

export default App;

