import React, { useContext } from 'react'
import styles from './index.module.css'
import UserContext from '../../UserContext'
import NavbarLink from '../navbarLink'
import NavButtons from '../navButtons'
import { useVisible } from '../../hooks'

const NavbarHome = () => {
    const { user: { isAdmin }} = useContext(UserContext)
    const { ref, isVisible, setIsVisible } = useVisible(false)

    return (
        <nav className={styles['site-nav']}>
            <ul className={styles['navbar-links']}>
                <div 
                    className={ isVisible 
                        ? `${styles['menu-toggle']} ${styles['is-active']}` 
                        : styles['menu-toggle'] } 
                    onClick={() => setIsVisible(!isVisible)}
                >
                    <span className={styles.bar}></span>
                    <span className={styles.bar}></span>
                    <span className={styles.bar}></span>
                </div>
                <div 
                    className={ isVisible 
                        ? `${styles['nav-menu']} ${styles.active}` 
                        : styles['nav-menu']} 
                    ref={ref}
                >
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