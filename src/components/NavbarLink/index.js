import React from 'react' 
import { Link } from 'react-router-dom'
import styles from './index.module.css'

const NavbarLink = ({ path, name }) => {
    return (
        <li className={styles['list-item']}>
            <Link to={path} className={styles.link}>
                {name}
            </Link>
        </li>
    )
}

export default NavbarLink