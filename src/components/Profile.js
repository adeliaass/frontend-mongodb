import React , { useEffect, useState } from 'react';
import backgroundImage from './background.png'; 

const Profile = () => {
    const [minHeight, setMinHeight] = useState(0);

  useEffect(() => {
    const updateMinHeight = () => {
      const windowHeight = window.innerHeight;
      setMinHeight(windowHeight);
    };

    // Panggil fungsi updateMinHeight saat komponen Profile dimuat
    updateMinHeight();

    // Tambahkan event listener untuk memperbarui minHeight saat ukuran jendela berubah
    window.addEventListener('resize', updateMinHeight);

    // Cleanup event listener saat komponen Profile dibongkar
    return () => {
      window.removeEventListener('resize', updateMinHeight);
    };
  }, []);
    const styles = {
        background: `url(${backgroundImage})`,
        backgroundSize: '100%',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        minHeight: `${minHeight}px`,
      };
      
      return (
        <div style={styles}>
          <h3>About CRUD Web App</h3>
          <p>
            This MERN CRUD web app is built using MongoDB, Express.js, React, and Node.js. </p>
            <p>It allows you to perform CRUD operations on products. You can create new products, view a list of existing products, update product details, and delete products from the database.
          </p>
          <h4>Features:</h4>
          <ul>
            <li>Create a new product by providing the name, price, category.</li>
            <li>View a list of all products, including their details.</li>
            <li>Update the details of a product, including the name, price, category.</li>
            <li>Delete a product from the database.</li>
            <li>Search for products based on their name, category.</li>
          </ul>
          <h3>Technologies Used:</h3>
          <ul>
            <li>MongoDB: A NoSQL database used for storing product data.</li>
            <li>Express.js: A web application framework for building the backend server.</li>
            <li>React: A JavaScript library for building the user interface.</li>
            <li>Node.js: A JavaScript runtime environment used for running the backend server.</li>
          </ul>
          <p>
            This CRUD web app is a simple example of how to build a full-stack web application using the MERN stack. It can be customized and extended to fit various use cases and requirements.
          </p>
        </div>
      );
    };

export default Profile;
