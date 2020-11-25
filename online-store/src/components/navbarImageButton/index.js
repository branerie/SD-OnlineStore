import React from 'react'
import { Link } from 'react-router-dom'
import styles from './index.module.css'

const NavbarImageButton = ({ imageSrc, path }) => {
    return (
        <li className={styles['list-item']}>
            <Link to={path} className={styles.link}>
                <img className={styles.image} src={imageSrc} />
            </Link>
        </li>
    )
}

export default NavbarImageButton