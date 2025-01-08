import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import '../styles/cart.css';

function CartComponent() {
  const cartItems = useSelector((state) => state.cart.cartItems);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [paymentResponse, setPaymentResponse] = useState(null);
  const navigate = useNavigate();

  const handlePay = async () => {
    setLoading(true);
    setError(null);

    try {
      console.log('checkoutItems---->' + checkoutItems);
      const response = await fetch('http://localhost:8082/foods/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(checkoutItems),
      });

      const data = await response.json();

      if (response.ok) {
        const checkoutUrl = data.sessionUrl;
        console.log('checkout URL--> ' + checkoutUrl);
        window.location.href = checkoutUrl;
      } else {
        setError(data.message || 'Something went wrong. Please try again.');
      }

      // if (data.status === 'SUCCESS') {
      //   setPaymentResponse('success');
      //   navigate('/success');
      // } else {
      //   setPaymentResponse('failure');
      //   navigate('/cancel');
      // }
    } catch (err) {
      setError('Failed to process the payment. Please try again.');
      // setPaymentResponse('failure');
      // navigate('/failure');
    } finally {
      setLoading(false);
    }
  };

  // const SuccessPage = () => (
  //   <div>
  //     <h1>Payment Successful</h1>
  //     <p>Thank you for your payment!</p>
  //   </div>
  // );

  // const FailurePage = () => (
  //   <div>
  //     <h1>Payment Failed</h1>
  //     <p>Something went wrong. Please try again.</p>
  //   </div>
  // );

  const groupedItems = cartItems.reduce((acc, item) => {
    if (!acc[item.foodName]) {
      acc[item.foodName] = { ...item, quantity: 0 };
    }
    acc[item.foodName].quantity += 1;
    acc[item.foodName].totalPrice =
      acc[item.foodName].foodPrice * acc[item.foodName].quantity;
    return acc;
  }, {});

  const uniqueCartItems = Object.values(groupedItems);
  console.log('uniqueCartItems------->' + uniqueCartItems);
  let finalAmt = 0;
  uniqueCartItems.map((item) => {
    finalAmt += item.totalPrice;
  });
  const checkoutItems = uniqueCartItems.map((item) => ({
    foodName: 'food item',
    currency: 'INR',
    quantity: 1,
    amount: finalAmt * 100,
  }))[0];

  // console.log('checkout items--->' + requestBody.);
  // const requestBody = {
  //   items: checkoutItems,
  // };

  return (
    <div>
      <h2>Tasty Cart Items</h2>
      <br></br>
      {cartItems.length === 0
        ? (console.log('cartItems-->' + cartItems),
          (<p>Your cart is empty.</p>))
        : (console.log('cartItems-->' + cartItems),
          (
            <table border="1" width="100%">
              <thead>
                <tr>
                  {/* <th>Image</th> */}
                  <th>Name</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total Price</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                {uniqueCartItems.map((item) => (
                  <tr key={item.id}>
                    <td>{item.foodName}</td>
                    <td>₹{item.foodPrice}</td>
                    <td>{item.quantity}</td>
                    <td>₹{item.totalPrice}</td>
                    <td>{item.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ))}
      {cartItems.length > 0 && (
        <button className="cartpay" onClick={handlePay} disabled={loading}>
          {loading ? 'Processing...' : 'Pay'}
        </button>
      )}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}

// function SuccessPage() {
//   return (
//     <div>
//       <h1>Payment Successful</h1>
//       <p>Thank you for your payment!</p>
//     </div>
//   );
// }

// // Functional component for the Cancel Page
// function CancelPage() {
//   return (
//     <div>
//       <h1>Payment Failed</h1>
//       <p>Your payment was not completed. Please try again.</p>
//     </div>
//   );
// }

export default CartComponent;
