import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/editModal.css';
import Modal from 'react-modal';

const EditFoodModal = ({
  username,
  password,
  show,
  onClose,
  food,
  fetchFoods,
}) => {
  console.log('show---->' + show);
  console.log('onclose---->' + onClose);
  console.log('food---->' + food.foodNo + ' ' + food.foodName);
  console.log('fetchFoods---->' + fetchFoods);
  const [foodName, setFoodName] = useState(food.foodName);
  const [foodType, setFoodType] = useState(food.foodType);
  const [foodPrice, setPrice] = useState(food.foodPrice);
  const [description, setDescription] = useState(food.description);

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost:8082/foods/updateFood/${food.foodNo}`,
        {
          foodName,
          foodType,
          foodPrice,
          description,
        },
        {
          headers: {
            Authorization: 'Basic ' + window.btoa(username + ':' + password),
          },
        }
      );
      alert('Food updated successfully');
      fetchFoods(); // Refresh the list after update
      onClose(); // Close the modal
    } catch (error) {
      console.error('Error updating food:', error);
    }
  };

  if (!show) {
    return null;
  }

  return (
    <Modal
      isOpen={show}
      onRequestClose={onClose}
      overlayClassName="overlay"
      className="show-modal"
    >
      <div className="modal-content">
        <h2>Edit Food Item</h2>
        <form onSubmit={handleSave}>
          <div>
            <label>Food Name</label>
            <input
              type="text"
              value={foodName}
              onChange={(e) => setFoodName(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Food Price</label>
            <input
              type="number"
              value={foodPrice}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Food Type</label>
            <input
              type="text"
              value={foodType}
              onChange={(e) => setFoodType(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            ></textarea>
          </div>
          <button type="submit">Save</button>
          <button type="button" className="cancel-button" onClick={onClose}>
            Cancel
          </button>
        </form>
      </div>
    </Modal>
  );
};

export default EditFoodModal;
