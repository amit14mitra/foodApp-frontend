import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import '../styles/createModal.css'; // Make sure to create and style this CSS file as desired

const AddFoodModal = ({ show, onClose, addFood }) => {
  const [foodNo, setFoodNo] = useState('');
  const [foodName, setFoodName] = useState('');
  const [foodType, setFoodType] = useState('');
  const [foodPrice, setFoodPrice] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (!show) {
      setFoodNo('');
      setFoodName('');
      setFoodType('');
      setFoodPrice('');
      setDescription('');
    }
  }, [show]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newFood = {
      foodNo,
      foodName,
      foodType,
      foodPrice: parseFloat(foodPrice), // Convert to a number if needed
      description,
    };

    await addFood(newFood);
    onClose(); // Close the modal after adding
  };

  if (!show) {
    return null;
  }

  return (
    console.log('isOpen--->' + show),
    (
      <Modal
        isOpen={show}
        onRequestClose={onClose}
        className="show-modal"
        overlayClassName="overlay"
      >
        <div className="modal-content">
          <h2>Add New Food Item</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <label>Food No</label>
              <input
                type="text"
                value={foodNo}
                onChange={(e) => setFoodNo(e.target.value)}
                required
              />
            </div>
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
              <label>Food Type</label>
              <input
                type="text"
                value={foodType}
                onChange={(e) => setFoodType(e.target.value)}
                required
              />
            </div>
            <div>
              <label>Food Price</label>
              <input
                type="number"
                value={foodPrice}
                onChange={(e) => setFoodPrice(e.target.value)}
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
    )
  );
};

export default AddFoodModal;
