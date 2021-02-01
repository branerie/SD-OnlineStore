import React, { useContext, useState } from 'react'
import styles from './index.module.css'
import UserContext from '../../UserContext'
import NavbarLink from '../navbarLink'
import NavButtons from '../navButtons'

const NavbarHome = () => {
    const { user: { isAdmin }} = useContext(UserContext)
    const [isActive, setIsActive] = useState(false)

    return (
        <nav className={styles['site-nav']}>
            <ul className={styles['navbar-links']}>
                <div className={ isActive ? `${styles['menu-toggle']} ${styles['is-active']}` : styles['menu-toggle'] } onClick={() => setIsActive(!isActive)}>
                    <span className={styles.bar}></span>
                    <span className={styles.bar}></span>
                    <span className={styles.bar}></span>
                </div>
                <div className={ isActive ? `${styles['nav-menu']} ${styles.active}` : styles['nav-menu']}>
                    <NavbarLink name='Men' path='/products/men'/>
                    <NavbarLink name='Women' path='/products/women'/>
                    <NavbarLink name='Promotions' path='/products/promotions'/>
                    {isAdmin
                        ? <NavbarLink name='Admin' path='/admin/products' />
                        : null
                    }
                </div>
            </ul>
            <NavButtons />
        </nav>
    )
}

export default NavbarHome