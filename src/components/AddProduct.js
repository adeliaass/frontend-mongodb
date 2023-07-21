import React, { useState } from 'react';
import { Alert } from 'react-bootstrap';

const AddProduct = () => {
    const [name, setName] = React.useState('');
    const [price, setPrice] = React.useState('');
    const [category, setCategory] = React.useState('');
    const [error, setError] = React.useState(false);
    const [showAlert, setShowAlert] = useState(false);

    const addProduct = async () => {
        if (!name || !price || !category) {
            setError(true);
            return false;
        }

        const userId = JSON.parse(localStorage.getItem('user'))._id;
        let result = await fetch("https://backend-mongodb-nu.vercel.app/add-product", {
            method: "POST",
            body: JSON.stringify({ name, price, category, userId }),
            headers: {
                "Content-type": "application/json"
            }
        });
        result = await result.json();
        console.warn(result);

        if (result) {
            setShowAlert(true);
            setName('');
            setPrice('');
            setCategory('');
            setError(false);
        }
    };
    


    return (
        
        <div className="container mt-5">
            {showAlert && (
                <Alert variant="success" onClose={() => setShowAlert(false)} dismissible>
                    Produk berhasil ditambahkan.
                </Alert>
            )}
            <div className="container justify-content-center">
            <div className="form-group mb-4">
            <div className="col-sm-12">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Enter product name"
                    value={name}
                    onChange={(e) => {
                        setName(e.target.value);
                    }}
                />
                {error && !name && (
                    <span className="text-danger">Data tidak valid</span>
                )}
            </div>
            </div>
            </div>
            
            <div className="container justify-content-center">
            <div className="form-group mb-4">
            <div className="col-sm-12">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Enter product price"
                    value={price}
                    onChange={(e) => {
                        setPrice(e.target.value);
                    }}
                />
                {error && !price && (
                    <span className="text-danger">Data tidak valid</span>
                )}
            </div>
            </div>
            </div>

            <div className="container justify-content-center">
            <div className="form-group mb-4">
            <div className="col-sm-12">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Enter product category"
                    value={category}
                    onChange={(e) => {
                        setCategory(e.target.value);
                    }}
                />
                {error && !category && (
                    <span className="text-danger">Data tidak valid</span>
                )}
            </div>
            </div>
            </div>

           

        <div className="container justify-content-center">
            <button onClick={addProduct} className="btn btn-primary">
                Tambah
            </button>
        </div>
        </div>
        
    );
};

export default AddProduct;
