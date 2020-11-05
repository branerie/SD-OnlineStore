import React from 'react'
import { Link } from 'react-router-dom'


const HomePage = () => {
    return (
        <div>
            <div>Welcome home!</div>
            <Link to="/admin/products" >To Admin Products</Link>
        </div>
    )
}

export default HomePage