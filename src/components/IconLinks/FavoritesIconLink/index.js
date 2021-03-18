import React, { useState, useMemo, useContext } from 'react'
import { Link } from 'react-router-dom'
import styles from './index.module.css'
import UserContext from '../../../contexts/UserContext'

const FavoritesIconLink = () => {
    const [isFilled, setIsFilled] = useState(false)
    const { user: { favorites } } = useContext(UserContext)

    const numberOfItems = favorites.length

    const fillColor = useMemo(() => {
        return isFilled
            ? '#ef696e'
            : 'none'
    }, [isFilled])

    return (
        <>
            <div
                className={styles.container}
                onMouseEnter={() => setIsFilled(true)}
                onMouseLeave={() => setIsFilled(false)}>
                <Link to='/user/favorites'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 44.625 49.876">
                        <path id="Path_43" data-name="Path 43" d="M1668.176,1022.516c-10.3-13.553-20.219-9.951-19.229,0s23.188,39.8,23.188,39.8-13.382-28.322,4.773-25c1,.183,9.416,4.44,10.447,4.477,7.162.266,4.355-8.337,2.612-12.686-1.714-4.28-6.9-8.547-9.7-10.074C1674.483,1015.888,1668.176,1022.516,1668.176,1022.516Z" transform="translate(-1648.125 -1012.889)" fill={fillColor} stroke="#707070" strokeWidth="1.5" />
                    </svg>
                </Link>
            </div>
            { numberOfItems > 0 && 
                <div className={styles['num-item']}>{numberOfItems}</div>
            }
        </>
    )
}

export default FavoritesIconLink