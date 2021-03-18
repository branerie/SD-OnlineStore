import React from 'react'
import styles from './index.module.css'
import { Link } from 'react-router-dom'

const NavbarImageLink = ({ name, path, imageName, clicked, order, handleClick }) => {
    // const handlePageReload = () => {
    //     handleClick(name)

    //     const [pathname, search] = path.split('?')
    //     if (window.location.pathname === pathname && search) {
    //         window.location.search = search
    //     }
    // }

    return (
        <>{clicked
            ?
            <div className={
                [styles['clicked-container'], styles[`order-${order}`]].join(' ')}>

                <img src={`/images/${imageName}`} className={styles.image} alt='Link' />
                <span className={[styles.link, styles['img-link']].join(' ')}>
                    {name}
                </span>

            </div>
            :
            <div className={[styles.container, styles[`order-${order}`]].join(' ')}>

                <Link to={path} className={styles.link} onClick={handleClick}>
                    <span>{name}</span>
                </Link>
            </div>}
        </>

    )
}

export default NavbarImageLink