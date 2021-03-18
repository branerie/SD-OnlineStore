import React, { useCallback, useContext, useEffect, useState } from 'react'
import UserContext from '../../contexts/UserContext'
import Header from '../../components/Header'
import BackIconLink from '../../components/IconLinks/BackIconLink'
import FavoritesListItem from '../../components/FavoritesListItem'
import styles from './index.module.css'
import PageWrapper from '../../components/PageWrapper'
import NavButtons from '../../components/NavButtons'
import PageSecondaryTitle from '../../components/PageSecondaryTitle'

const FavoritesPage = () => {
    const [favorites, setFavorites] = useState(null)
    const { user, getFullFavoriteProducts } = useContext(UserContext)

    const getFavorites = useCallback(async () => {
        const favoriteProducts = await getFullFavoriteProducts()

        setFavorites(Object.values(favoriteProducts))
    }, [getFullFavoriteProducts])

    useEffect(() => {
        getFavorites()
    }, [getFavorites, user.favorites])

    if (!favorites) {
        return null
    }

    return (
        <>
            <PageWrapper maxWidth='1280px'>
                <Header />
                <NavButtons />
                { (favorites && favorites.length > 0)
                    ?
                    <>
                        <PageSecondaryTitle title='your favorite products' />
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