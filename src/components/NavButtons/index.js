import React from 'react'
import styles from './index.module.css'
import NavbarSearch from '../NavbarSearch'

import ShoppingCartIconLink from '../IconLinks/ShoppingCartIconLink'
import FavoritesIconLink from '../IconLinks/FavoritesIconLink'
import ProfileIconLink from '../IconLinks/ProfileIconLink'

const NavButtons = () => {
    return (
        <ul className={styles['navbar-buttons']}>
            <NavbarSearch />
            <FavoritesIconLink />
            <ShoppingCartIconLink />
            <ProfileIconLink />
        </ul>
    )
}

export default NavButtons