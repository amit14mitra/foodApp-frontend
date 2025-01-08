import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../cartcomponents/CartSlice';

import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/Home.css';
import EditFoodModal from '../modalcomponents/EditFoodModal';
import AddFoodModal from '../modalcomponents/AddFoodModal';
import Cart from '../cartcomponents/Cart';

const HomePage = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);

  const [searchTerm, setSearchTerm] = useState('');
  const [foods, setFoods] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [foodList, setFoodList] = useState([]);
  const [selectedFood, setSelectedFood] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);

  // const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const userCreds = JSON.parse(localStorage.getItem('userCreds'));
    console.log(userCreds);
    if (userCreds) {
      setUsername(userCreds.username);
      setPassword(userCreds.password);
    }
  }, []);

  const fetchFoods = async () => {
    try {
      let response;
      // If search term is empty, fetch all foods
      if (searchTerm.trim() === '') {
        response = await axios.get('http://localhost:8082/foods/getFoods', {
          headers: {
            Authorization: 'Basic ' + window.btoa(username + ':' + password),
          },
        }); // API to get all foods
      } else {
        // Fetch food by ID if search term is not empty
        response = await axios.get(
          `http://localhost:8082/foods/getFood/${searchTerm}`,
          {
            headers: {
              Authorization: 'Basic ' + window.btoa(username + ':' + password),
            },
          }
        );
      }
      if (
        typeof response.data === 'string' &&
        response.data.includes('No Food Item found')
      ) {
        setErrorMessage(response.data); // Set error message
        setFoods([]); // Clear food data
      } else {
        setErrorMessage('');
        setFoods(response.data);
      }
      console.log(response.data);
      console.log('foods length---->' + foods.length);
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.httpStatus === 'NOT_FOUND'
      ) {
        setErrorMessage(`Error: ${error.response.data.message}`);
      } else {
        setErrorMessage('An unexpected error occurred');
      }
      // console.error('Error fetching food data', error);
      // setErrorMessage('Error fetching food data');
    }
  };

  const handleEdit = (food) => {
    console.log('Edit food item with ID:', food.foodNo);
    setShowEditModal(true);
    setSelectedFood(food);
  };

  const handleCloseModal = () => {
    setShowEditModal(false);
    setSelectedFood(null);
  };

  const handleDelete = async (foodNo) => {
    console.log('Delete food item with ID:', foodNo);
    if (window.confirm('Are you sure you want to delete this food item?')) {
      try {
        await axios.delete(`http://localhost:8082/foods/deleteFood/${foodNo}`, {
          headers: {
            Authorization: 'Basic ' + window.btoa(username + ':' + password),
          },
        });
        // Refresh the food list after deletion
        fetchFoods();
        alert('Food item deleted successfully.');
      } catch (error) {
        console.error('Error deleting food item:', error);
        alert('Error deleting food item.');
      }
    }
  };

  const handleAddFood = async (newFood) => {
    console.log('Navigating to add food form');
    try {
      await axios.post('http://localhost:8082/foods/addFoods', newFood);
      fetchFoods();
    } catch (error) {
      console.error('Error adding food:', error);
    }
  };

  // const openModal = () => {
  //   if (!showAddModal) {
  //     setShowAddModal(true);
  //   }
  // };
  const addItemToCart = (food) => {
    // console.log('food item--->' + food);
    // setCartItems((prevCart) => [...prevCart, food]);
    dispatch(addToCart(food));
    alert(`${food.foodName} has been added to the cart!`);
  };

  const handleCartClick = () => {
    navigate('/Cart');
  };

  return (
    <div className="page-container">
      {/* Navbar */}
      {/* Bootstrap Navbar */}
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
          <a className="navbar-brand" href="/">
            Welcome to Tasty Fast Food Service
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            {/* Push other links to the right */}
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <a className="nav-link" href="/">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/about">
                  About
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/contact">
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <div style={{ position: 'absolute', top: '15px', right: '20px' }}>
            {/* <img
              src="https://cdn-icons-png.flaticon.com/512/1170/1170576.png"
              alt="Cart"
              style={{ width: '45px', height: '45px', cursor: 'pointer' }}
            /> */}
            <button onClick={handleCartClick}>Cart ({cartItems.length})</button>
          </div>
        </div>
      </nav>
      {/* {window.location.pathname === '/cart' && <Cart cartItems={cartItems} />} */}

      {/* Search Bar and Button */}
      <div className="container text-center mt-4">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search Foods"
              className="form-control"
            />
          </div>
          <div className="col-md-2">
            <button onClick={fetchFoods} className="btn btn-primary">
              Search
            </button>
          </div>
        </div>
      </div>

      {/* Render error message if exists */}
      {errorMessage && <p id="errormsg">{errorMessage}</p>}

      {/* Display Data in Table */}
      {!errorMessage && foods.length > 0 && (
        <div className="container mt-4">
          <table className="table table-bordered">
            <thead className="thead-dark">
              <tr>
                <th>Food ID</th>
                <th>Food Name</th>
                <th>Food Type</th>
                <th>Food Price</th>
                <th>Description</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {foods.map((food) => (
                <tr key={food.foodNo}>
                  <td>{food.foodNo}</td>
                  <td>{food.foodName}</td>
                  <td>{food.foodType}</td>
                  <td>{food.foodPrice}</td>
                  <td>{food.description}</td>
                  <td>
                    <button
                      className="btn btn-primary btn-sm"
                      onClick={() => handleEdit(food)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      style={{ marginLeft: '10px' }}
                      onClick={() => handleDelete(food.foodNo)}
                    >
                      Delete
                    </button>
                    <button
                      className="btn btn-warning btn-sm"
                      style={{ marginLeft: '10px' }}
                      onClick={() => addItemToCart(food)}
                    >
                      Add to Cart
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {showEditModal && (
            <EditFoodModal
              username={username}
              password={password}
              show={showEditModal}
              onClose={handleCloseModal}
              food={selectedFood} // Pass the selected food to the modal
              fetchFoods={fetchFoods} // Function to refresh food list after edit
            />
          )}
          <div style={{ marginTop: '20px', textAlign: 'center' }}>
            <button
              className="btn btn-success"
              onClick={() => setShowAddModal(true)}
            >
              Add Food Item
            </button>
          </div>
          {showAddModal && (
            <AddFoodModal
              show={showAddModal}
              onClose={() => setShowAddModal(false)}
              addFood={handleAddFood}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default HomePage;
