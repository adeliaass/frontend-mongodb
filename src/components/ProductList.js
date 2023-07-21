import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const ProductList = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        getProducts();
    }, []);

    const getProducts = async () => {
        let result = await fetch('https://backend-mongodb-nu.vercel.app/products', {
            headers: {
                authorization: JSON.parse(localStorage.getItem('token'))
            }
        });
        result = await result.json();
        setProducts(result);
    }

    const deleteProduct = async (id) => {
        console.warn(id)
        let result = await fetch(`https://backend-mongodb-nu.vercel.app/product/${id}`, {
            method: "DELETE"
        });
        result = await result.json();
        if (result) {
            getProducts();
        }
    }

    const searchHandle = async (event) => {
        let key = event.target.value;
        if (key) {
            let result = await fetch(`https://backend-mongodb-nu.vercel.app/search/${key}`);
            result = await result.json()
            if (result) {
                setProducts(result)
            }
        } else {
            getProducts();
        }

    }

    return (
        <div className="product-list mt-5">
            <h3>List</h3>
            <div className="container justify-content-center">
            <div className="col-sm-12">
            <input type="" className='search-product-box form-control' placeholder='Search Product'
                onChange={searchHandle}
            />
            </div>
            </div>
            <div className="container justify-content-center">
            <table className="table">
                <thead>
                    <tr>
                        <th>No.</th>
                        <th>Nama</th>
                        <th>Harga</th>
                        <th>Kategori</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {products.length > 0 ? products.map((item, index) =>
                        <tr key={item._id}>
                            <td>{index + 1}</td>
                            <td>{item.name}</td>
                            <td>{item.price}</td>
                            <td>{item.category}</td>
                            <td>
                                <button onClick={() => deleteProduct(item._id)} className='btn btn-danger'>Delete</button>
                                <Link to={"/update/" + item._id} className='btn btn-primary'>Update</Link>
                            </td>
                        </tr>
                    )
                        : <tr>
                            <td colSpan="6">No Result Found</td>
                        </tr>
                    }
                </tbody>
            </table>
            </div>
        </div>
    )
}

export default ProductList;
