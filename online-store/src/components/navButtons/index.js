import React from 'react'
import styles from './index.module.css'
import NavbarImageButton from '../navbarImageButton'
import NavbarSearch from '../navbarSearch'

import favoritesImage from '../../images/favoritesLink.svg'
import cartImage from '../../images/cartLink.svg'
import profileImage from '../../images/profileLink.svg'

const NavButtons = () => {
    return (
        <ul className={styles['navbar-buttons']}>
            <NavbarSearch />
            <NavbarImageButton path='' imageSrc={favoritesImage} />
            <NavbarImageButton path='' imageSrc={cartImage} />
            <NavbarImageButton path='' imageSrc={profileImage} />
        </ul>
    )
}

export default NavButtons