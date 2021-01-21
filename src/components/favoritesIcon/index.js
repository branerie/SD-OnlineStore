import React, { useContext, useMemo } from 'react'
import UserContext from '../../UserContext'
import ErrorContext from '../../ErrorContext'
import styles from './index.module.css'
import { setFavorites } from '../../services/user'
import favoritesImageEmpty from '../../images/favoritesLink.svg'
import favoritesImageFilled from '../../images/favoritesLinkFilled.svg'

const FavoritesIcon = ({ productId }) => {
    const { user, setNewUser } = useContext(UserContext)
    const { addMessage } = useContext(ErrorContext)

    const changeFavorites = async () => {
        const response = await setFavorites(productId)

        if (response.error) {
            addMessage(
                'Change User Favorites',
                'An error occurred while trying to update your favorite products. We apologize for the inconvenience!'
            )   

            return
        }

        setNewUser({ ...user, favorites: response.favorites })
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
                alt='No image'
                title='Add/remove from favorites collection'
                className={styles['like-button']}
            />
        </div>
    )
}

export default FavoritesIcon