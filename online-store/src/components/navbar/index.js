import React, { useContext } from 'react'
import styles from './index.module.css'
import UserContext from '../../Context'
import NavbarLink from '../navbarLink'
import NavbarImageButton from '../navbarImageButton'

import searchImage from '../../images/searchLink.svg'
import favoritesImage from '../../images/favoritesLink.svg'
import cartImage from '../../images/cartLink.svg'
import profileImage from '../../images/profileLink.svg'

const Navbar = () => {
    const { isAdmin } = useContext(UserContext)

    return (
        <nav className={styles['site-nav']}>
            <ul className={styles['navbar-links']}>
                <NavbarLink name='Men' path='/products?gender=M'/>
                <NavbarLink name='Women' path='/products?gender=F'/>
                <NavbarLink name='Promotions' path='/products?is_discount=true'/>
                {isAdmin
                    ? <NavbarLink name='Admin' path='/admin/products' />
                    : null
                }
            </ul>
            <ul className={styles['navbar-buttons']}>
                <NavbarImageButton path='' imageSrc={searchImage} />
                <NavbarImageButton path='' imageSrc={favoritesImage} />
                <NavbarImageButton path='' imageSrc={cartImage} />
                <NavbarImageButton path='' imageSrc={profileImage} />
            </ul>
        </nav>
    )
}

export default Navbar