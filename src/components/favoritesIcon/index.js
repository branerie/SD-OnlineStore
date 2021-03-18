import React, { useContext, useMemo, useState } from 'react'
import UserContext from '../../UserContext'
import ErrorContext from '../../ErrorContext'
import styles from './index.module.css'
import { setFavorites } from '../../services/user'
import favoritesImageEmpty from '../../images/favoritesLink.svg'
import favoritesImageFilled from '../../images/favoritesLinkFilled.svg'

const FavoritesIcon = ({ productId }) => {
    const [changeTimeout, setChangeTimeout] = useState(null)
    const { user, setNewUser } = useContext(UserContext)
    const { addMessage } = useContext(ErrorContext)

    const changeFavorites = async () => {
        // avoids sending a request if user just pressed add to favorites and then quickly unpressed it
        if (changeTimeout) {
            clearTimeout(changeTimeout)
            return setChangeTimeout(null)
        }

        const newTimeout = setTimeout(async () => {
            const response = await setFavorites(productId)

            if (response.error) {
                addMessage(
                    'Change User Favorites',
                    'An error occurred while trying to update your favorite products. We apologize for the inconvenience!'
                )

                return
            }

            setNewUser({ ...user, favorites: response.favorites })
            setChangeTimeout(null)
        }, 500)

        setChangeTimeout(newTimeout)
    }

    const imgSrc = useMemo(() => {
        return user.favorites.includes(productId)
            ? favoritesImageFilled
            : favoritesImageEmpty
    }, [user, productId])

    return (
        <div className={styles['like-container']}>
            <img
                onClick={changeFavorites}
                src={imgSrc}
                alt='Button to add/remove from favorites'
                title='Add/remove from favorites collection'
                className={styles['like-button']}
            />
        </div>
    )
}

export default FavoritesIcon