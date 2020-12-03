import React, { useContext } from 'react'
import styles from './index.module.css'
import UserContext from '../../Context'
import NavbarLink from '../navbarLink'
import NavbarImageButton from '../navbarImageButton'
import NavbarSearch from '../navbarSearch'
import favoritesImage from '../../images/favoritesLink.svg'
import cartImage from '../../images/cartLink.svg'
import profileImage from '../../images/profileLink.svg'

const NavbarHome = () => {
    const { user: { isAdmin }} = useContext(UserContext)

    return (
        <nav className={styles['site-nav']}>
            <ul className={styles['navbar-links']}>
                <li className={styles['logo-space']}></li>
                <NavbarLink name='Men' path='/products?cat_gender=M'/>
                <NavbarLink name='Women' path='/products?cat_gender=F'/>
                <NavbarLink name='Promotions' path='/products?bool_discount=true'/>
                {isAdmin
                    ? <NavbarLink name='Admin' path='/admin/products' />
                    : null
                }
            </ul>
            <ul className={styles['navbar-buttons']}>
                <NavbarSearch />
                <NavbarImageButton path='' imageSrc={favoritesImage} />
                <NavbarImageButton path='' imageSrc={cartImage} />
                <NavbarImageButton path='' imageSrc={profileImage} />
            </ul>
        </nav>
    )
}

export default NavbarHome