import React, { useState } from 'react'
import styles from './index.module.css'
import { Link } from 'react-router-dom'

const NavbarImageLink = ({ name, path, imageName, clicked }) => {
    // const [isShowing, setIsShowing] = useState(clicked)
    
    return (
        <div className={clicked ? styles['clicked-container'] : styles.container}>
            {/* onMouseEnter={() => setIsShowing(!isShowing || clicked)}
            onMouseLeave={() => setIsShowing(!isShowing || clicked)}> */}
            { clicked && <img src={`/images/${imageName}`} className={styles.image} />}
            <Link to={path} className={clicked 
                                            ? [styles.link, styles['img-link']].join(' ')
                                            : styles.link}>
                <span>{name}</span>
            </Link>
        </div>
    )
}

export default NavbarImageLink