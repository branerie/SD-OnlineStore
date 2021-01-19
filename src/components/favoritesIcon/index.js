import React, { useContext, useMemo } from 'react'
import styles from './index.module.css'
import { setFavorites } from '../../services/user'
import UserContext from '../../UserContext'
import favoritesImageEmpty from '../../images/favoritesLink.svg'
import favoritesImageFilled from '../../images/favoritesLinkFilled.svg'
import { useAsyncError } from '../../hooks'

const FavoritesIcon = ({ productId }) => {
    const { user, setNewUser } = useContext(UserContext)
    const throwInternalError = useAsyncError()

    const changeFavorites = async () => {
        const response = await setFavorites(productId)

        if (response.error) {
            throwInternalError()
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