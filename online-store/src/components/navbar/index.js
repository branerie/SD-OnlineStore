import React, { useContext } from 'react'
import styles from './index.module.css'
import UserContext from '../../Context'
import NavbarLink from '../navbarLink'

import NavbarImageLink from '../navbarImageLink'

const Navbar = ({ clickedName }) => {
    const { user: { isAdmin } } = useContext(UserContext)

    return (
        <nav className={styles.container}>
            <ul className={styles['navbar-links']}>
                {/* <NavbarLink name='Men' path='/products?cat_gender=M'/> */}
                <NavbarImageLink
                    name='Women'
                    path='/products?cat_gender=F'
                    imageName='menLink.png'
                    clicked={clickedName === 'Women'} />
                <NavbarImageLink
                    name='Men'
                    path='/products?cat_gender=M'
                    imageName='menLink.png'
                    clicked={clickedName === 'Men'} />
                <NavbarImageLink
                    name='Promotions'
                    path='/products?bool_discount=true'
                    imageName='menLink.png'
                    clicked={clickedName === 'Promotions'} />
                {isAdmin
                    ? <NavbarLink name='Admin' path='/admin/products' />
                    : null
                }
            </ul>
        </nav>
    )
}

export default Navbar