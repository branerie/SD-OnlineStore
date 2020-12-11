import React from 'react'
import styles from './index.module.css'
import NavbarImageButton from '../navbarImageButton'
import NavbarSearch from '../navbarSearch'

import ShoppingCartIconLink from '../iconLinks/shoppingCartIconLink'
import FavoritesIconLink from '../iconLinks/favoritesIconLink'
import ProfileIconLink from '../iconLinks/profileIconLink'

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