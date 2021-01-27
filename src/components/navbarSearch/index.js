import React, { useContext, useEffect, useRef, useState } from 'react'
import ProductsContext from '../../ProductsContext'
import styles from './index.module.css'

import { useHistory } from 'react-router-dom'
import { parseQueryString } from '../../utils/product'
import SearchIconLink from '../iconLinks/searchIconLink'

const NavbarSearch = () => {
    const [searchTerm, setSearchTerm] = useState('')
    const [isInputShown, setIsInputShown] = useState(false)
    const { filtersDispatch } = useContext(ProductsContext)
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

        filtersDispatch({ type: 'search', searchTerm: searchTerm })
    }

    const handleClick = () => {
        if (window.innerWidth < 768) {
            setIsInputShown(true)
        } else {
            ref.current.click()
        }
    }

    const closeMediaSearch = () => {
        setIsInputShown(false)
    }

    return (
        <form noValidate onSubmit={handleSubmit} className={styles.container} data-testid='search-form'>
            <input
                type='text'
                name='search'
                value={searchTerm}
                className={styles.input}
                placeholder='Search' required
                onChange={e => setSearchTerm(e.target.value)}
            />
            {isInputShown 
                ?   <div className={styles['media-search']}>
                        <input
                            type='text'
                            name='responsiveSearch'
                            value={searchTerm}
                            className={styles['media-input']}
                            placeholder='Search' required
                            onChange={e => setSearchTerm(e.target.value)}/>
                        <div className={styles['close-mediaSearch']} onClick={closeMediaSearch}>
                            <span className={styles['media-bar']} />
                            <span className={styles['media-bar']} />
                        </div>
                    </div>
                : null
            }
            <SearchIconLink onClick={handleClick} />
            <input type='submit' ref={ref} className={styles['submit-btn']} />
        </form>
    )
}

export default NavbarSearch