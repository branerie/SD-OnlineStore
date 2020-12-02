import React, { useContext, useRef, useState } from 'react'
import ProductsContext from '../../ProductsContext'
import styles from './index.module.css'

import searchImage from '../../images/searchLink.svg'

const NavbarSearch = () => {
    const [searchTerm, setSearchTerm] = useState('')
    const productsContext = useContext(ProductsContext)
    const ref = useRef(null)

    const handleSubmit = (event) => {
        event.preventDefault()

        productsContext.searchProducts(searchTerm)
    }

    return (
        <form noValidate onSubmit={handleSubmit} className={styles.container}>
            <input
                type='text'
                name='search'
                value={searchTerm}
                className={styles.input}
                placeholder='Search' required
                onChange={e => setSearchTerm(e.target.value)} />
            <img src={searchImage} className={styles.image} onClick={() => ref.current.click() } />
            <input type='submit' ref={ref} className={styles['submit-btn']} />
        </form>
    )
}

export default NavbarSearch