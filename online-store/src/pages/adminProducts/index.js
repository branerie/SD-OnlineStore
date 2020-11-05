import React from 'react'
import { Link } from 'react-router-dom'

const AdminProductsPage = () => {
    return (
        <div>
            <p>I am an admin!</p>
            <Link to='/'>Home</Link>
        </div>
    )
}

export default AdminProductsPage