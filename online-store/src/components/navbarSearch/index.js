import React, { useContext, useEffect, useRef, useState } from 'react'
import ProductsContext from '../../ProductsContext'
import styles from './index.module.css'

import { useHistory } from 'react-router-dom'
import { parseQueryString } from '../../utils/url'
import SearchIconLink from '../iconLinks/searchIconLink'

const NavbarSearch = () => {
    const [searchTerm, setSearchTerm] = useState('')
    const productsContext = useContext(ProductsContext)
    const ref = useRef(null)
    const history = useHistory()

    useEffect(() => {
        const query = parseQueryString(window.location.search)
        if (query && query.searchTerm) {
            setSearchTerm(query.searchTerm)
        }
    }, [])

    const handleSubmit = (event) => {
        event.preventDefault()

        const { pathname } = window.location
        const isOnProductsPage = pathname === '/products' || pathname === '/admin/products'

        if (!isOnProductsPage) {
            history.push(`/products?searchTerm=${searchTerm}`)
        }

        productsContext.filtersDispatch({ type: 'search', searchTerm: searchTerm })
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
            {/* <img src={searchImage} className={styles.image} onClick={() => ref.current.click()} /> */}
            <SearchIconLink onClick={() => ref.current.click()} />
            <input type='submit' ref={ref} className={styles['submit-btn']} />
        </form>
    )
}

export default NavbarSearch