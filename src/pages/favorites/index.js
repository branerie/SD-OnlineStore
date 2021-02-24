import React, { useCallback, useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import UserContext from '../../UserContext'
import ErrorContext from '../../ErrorContext'
import Header from '../../components/header'
import BackIconLink from '../../components/iconLinks/backIconLink'
import FavoritesListItem from '../../components/favoritesListItem'
import { getProductDetailsMain } from '../../services/product'
import styles from './index.module.css'
import PageWrapper from '../../components/pageWrapper'
import NavButtons from '../../components/navButtons'

const FavoritesPage = () => {
    const [favorites, setFavorites] = useState(null)
    const { user } = useContext(UserContext)
    const { addMessage } = useContext(ErrorContext)
    const history = useHistory()

    const getFavorites = useCallback(async () => {
        if (user.favorites.length === 0) {
            setFavorites(null)
            return
        }

        if (favorites && user.favorites.length < favorites.length) {
            // A product was removed from favorites. In this case we avoid a 
            // database query by simply dropping the removed product from the 
            // already fetched "favorites" state
            setFavorites(favorites.filter(p => user.favorites.includes(p.productId)))
            return
        }

        const favoriteProducts = await getProductDetailsMain(user.favorites)
        if (favoriteProducts.error) {
            addMessage(
                'User Favorites', 
                'Something went wrong when trying to get user\'s product favorites.'
            )

            return history.goBack()
        }

        setFavorites(favoriteProducts)
    }, [user.favorites])

    useEffect(() => {
        getFavorites()
    }, [getFavorites, user.favorites])

    return (
        <>
            <PageWrapper maxWidth='1280px'>
                <Header />
                <NavButtons />
                { (favorites && favorites.length > 0)
                    ?
                    <>
                        <div className={styles['page-title']}>your favorite products</div>
                        <div className={styles.container}>
                            <div className={styles.items}>
                                {favorites.map(item =>
                                    <FavoritesListItem 
                                        key={item.productId}
                                        {...item} 
                                    />)
                                }
                            </div>
                        </div>
                    </>
                    :
                    <>
                        <h2 className={styles['page-title']} style={{ marginBottom: '3rem' }}>
                            { user.userId 
                                ? 'your favorites list is empty'
                                : 'please log in to see your favorites'
                            }
                        </h2>
                        <BackIconLink />
                    </>
                }
            </PageWrapper>
        </>
    )
}

export default FavoritesPage