// import { Button, Col, Container, Form, Row, Card } from "react-bootstrap";
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import generateUniqueId from "generate-unique-id";
// import { useDispatch } from "react-redux";
// import {  addProductAsync } from "../Services/Actions/productAction";

// const AddProduct = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const initialState = {
//     id: "",
//     productName: "",
//     desc: "",
//     unit: "",
//     price: "",
//     category: "",
//     image: "",
//   };

//   const [inputForm, setInputForm] = useState(initialState);

//   const handleChanged = (e) => {
//     const { name, value } = e.target;
//     setInputForm({
//       ...inputForm,
//       [name]: value,
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const id = generateUniqueId({ length: 6, useLetters: false });
//     inputForm.id = id;
//     // dispatch(addProduct(inputForm));
//     dispatch(addProductAsync(formData));
//     navigate("/");
//   };

//   return (
//     <Container style={{ maxWidth: "700px", marginTop: "40px" }}>
//       <Card className="shadow-sm p-4 border-0">
//         <h2 className="mb-4 text-success text-center">Add New Product</h2>
//         <Form onSubmit={handleSubmit}>
//           <Form.Group className="mb-3">
//             <Form.Label>Product Name</Form.Label>
//             <Form.Control
//               type="text"
//               placeholder="e.g., Fruit & Vegetables"
//               name="title"
//               value={inputForm.title}
//               onChange={handleChanged}
//               required
//             />
//           </Form.Group>

//           <Form.Group className="mb-3">
//             <Form.Label>Description</Form.Label>
//             <Form.Control
//               type="text"
//               placeholder="e.g., Fresh & Cheap"
//               name="desc"
//               value={inputForm.desc}
//               onChange={handleChanged}
//               required
//             />
//           </Form.Group>

//           <Form.Group className="mb-3">
//             <Form.Label>Price (₹)</Form.Label>
//             <Form.Control
//               type="number"
//               placeholder="e.g., 129"
//               name="price"
//               value={inputForm.price}
//               onChange={handleChanged}
//               required
//             />
//           </Form.Group>

//           <Form.Group className="mb-3">
//             <Form.Label>Unit</Form.Label>
//             <Form.Control
//               type="text"
//               placeholder="e.g., 1 kg, 500 ml, 1 pack"
//               name="unit"
//               value={inputForm.unit}
//               onChange={handleChanged}
//               required
//             />
//           </Form.Group>

//           <Form.Group className="mb-3">
//             <Form.Label>Category</Form.Label>
//             <Form.Select
//               name="category"
//               value={inputForm.category}
//               onChange={handleChanged}
//               required
//             >
//               <option value="" disabled hidden>Select Category</option>
//               <option value="paan">Paan</option>
//               <option value="dairy">Dairy</option>
//               <option value="fruits">Fruits</option>
//               <option value="drinks">Drinks</option>
//               <option value="snacks">Snacks</option>
//               <option value="breakfast">Breakfast</option>
//               <option value="sweet">Sweet</option>
//               <option value="bakery">Bakery</option>  
//               <option value="tea">Tea</option>
//               <option value="atta">Atta</option>
//               <option value="masala">Masala</option>
//               <option value="sauces">Sauces</option>
//               <option value="meat">Meat</option>
//               <option value="organic">Organic</option>
//               <option value="baby">Baby</option>
//               <option value="pharma">Pharma</option>
//               <option value="cleaning">Cleaning</option>
//               <option value="home">Home</option>
//               <option value="personal">Personal</option>
//               <option value="pet">Pet</option>
//             </Form.Select>
//           </Form.Group>

//           <Form.Group className="mb-3">
//             <Form.Label>Image URL</Form.Label>
//             <Form.Control
//               type="text"
//               placeholder="Paste image URL here"
//               name="image"
//               value={inputForm.image}
//               onChange={handleChanged}
//               required
//             />
//           </Form.Group>

//           <div className="d-grid mt-4">
//             <Button
//               type="submit"
//               style={{ backgroundColor: "#03831f", border: "none" }}
//               size="lg"
//             >
//               Add Product
//             </Button>
//           </div>
//         </Form>
//       </Card>
//     </Container>
//   );
// };

// export default AddProduct;

import { Button, Col, Container, Form, Row, Card } from "react-bootstrap";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import generateUniqueId from "generate-unique-id";
import { useDispatch } from "react-redux";
import { addProductAsync } from "../Services/Actions/productAction";

const AddProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const initialState = {
    id: "",
    title: "", // ✅ changed to match Home.jsx and API
    desc: "",
    unit: "",
    price: "",
    category: "",
    image: "",
  };

  const [inputForm, setInputForm] = useState(initialState);

  const handleChanged = (e) => {
    const { name, value } = e.target;
    setInputForm({
      ...inputForm,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const id = generateUniqueId({ length: 6, useLetters: false });
    const formData = { ...inputForm, id };
    dispatch(addProductAsync(formData)); // ✅ send correct variable
    navigate("/");
  };

  return (
    <Container style={{ maxWidth: "700px", marginTop: "40px" }}>
      <Card className="shadow-sm p-4 border-0">
        <h2 className="mb-4 text-success text-center">Add New Product</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Product Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="e.g., Fruit & Vegetables"
              name="title" // ✅ matches state key
              value={inputForm.title}
              onChange={handleChanged}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              placeholder="e.g., Fresh & Cheap"
              name="desc"
              value={inputForm.desc}
              onChange={handleChanged}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Price (₹)</Form.Label>
            <Form.Control
              type="number"
              placeholder="e.g., 129"
              name="price"
              value={inputForm.price}
              onChange={handleChanged}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Unit</Form.Label>
            <Form.Control
              type="text"
              placeholder="e.g., 1 kg, 500 ml, 1 pack"
              name="unit"
              value={inputForm.unit}
              onChange={handleChanged}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Category</Form.Label>
            <Form.Select
              name="category"
              value={inputForm.category}
              onChange={handleChanged}
              required
            >
              <option value="" disabled hidden>Select Category</option>
              <option value="paan">Paan</option>
              <option value="dairy">Dairy</option>
              <option value="fruits">Fruits</option>
              <option value="drinks">Drinks</option>
              <option value="snacks">Snacks</option>
              <option value="breakfast">Breakfast</option>
              <option value="sweet">Sweet</option>
              <option value="bakery">Bakery</option>
              <option value="tea">Tea</option>
              <option value="atta">Atta</option>
              <option value="masala">Masala</option>
              <option value="sauces">Sauces</option>
              <option value="meat">Meat</option>
              <option value="organic">Organic</option>
              <option value="baby">Baby</option>
              <option value="pharma">Pharma</option>
              <option value="cleaning">Cleaning</option>
              <option value="home">Home</option>
              <option value="personal">Personal</option>
              <option value="pet">Pet</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Image URL</Form.Label>
            <Form.Control
              type="text"
              placeholder="Paste image URL here"
              name="image"
              value={inputForm.image}
              onChange={handleChanged}
              required
            />
          </Form.Group>

          <div className="d-grid mt-4">
            <Button
              type="submit"
              style={{ backgroundColor: "#03831f", border: "none" }}
              size="lg"
            >
              Add Product
            </Button>
          </div>
        </Form>
      </Card>
    </Container>
  );
};

export default AddProduct;
