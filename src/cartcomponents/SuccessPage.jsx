import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

const SuccessPage = () => {
  const [message, setMessage] = useState('Processing your payment...');

  useEffect(() => {
    setTimeout(() => {
      setMessage('Payment successful! Thank you for your purchase.');

      Swal.fire({
        title: 'Payment Successful!',
        text: 'Thank you for your purchase.',
        icon: 'success',
        confirmButtonText: 'OK',
      });
    }, 1000);
  }, []);

  const pageStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f0f8ff',
  };

  const messageStyle = {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#4CAF50',
    textAlign: 'center',
  };

  return (
    <div style={pageStyle}>
      <h3 style={messageStyle}>{message}</h3>
    </div>
  );
};

export default SuccessPage;
