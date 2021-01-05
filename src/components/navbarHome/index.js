import React, { useContext } from 'react'
import styles from './index.module.css'
import UserContext from '../../Context'
import NavbarLink from '../navbarLink'
import NavButtons from '../navButtons'

const NavbarHome = () => {
    const { user: { isAdmin }} = useContext(UserContext)

    return (
        <nav className={styles['site-nav']}>
            <ul className={styles['navbar-links']}>
                <li className={styles['logo-space']}></li>
                <NavbarLink name='Men' path='/products/men'/>
                <NavbarLink name='Women' path='/products/women'/>
                <NavbarLink name='Promotions' path='/products/promotions'/>
                {isAdmin
                    ? <NavbarLink name='Admin' path='/admin/products' />
                    : null
                }
            </ul>
            <NavButtons />
        </nav>
    )
}

export default NavbarHome