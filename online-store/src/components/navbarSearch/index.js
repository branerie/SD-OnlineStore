import React from 'react'
import styles from './index.module.css'

import searchImage from '../../images/searchLink.svg'

const NavbarSearch = () => {
    const handleSubmit = (event) => {
        event.preventDefault()

        //TODO: Handle search submit
    }

    return (
        <form noValidate onSubmit={handleSubmit} className={styles.container}>
            <input type='text' className={styles.input} placeholder='Search' required />
            <img src={searchImage} className={styles.image} />
        </form>
    )
}

export default NavbarSearch