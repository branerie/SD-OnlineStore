import React, { useCallback, useContext, useEffect, useState } from 'react'
import styles from './index.module.css'
import UserContext from '../../UserContext'
import { getProductDetailsMain } from '../../services/product'
import ShoppingCartItem from '../../components/shoppingCartItem'
import Header from '../../components/header'
import ShoppingCartCheckout from '../../components/shoppingCartCheckout'
import BackIconLink from '../../components/iconLinks/backIconLink'
import PageWrapper from '../../components/pageWrapper'

const ShoppingCartPage = () => {
    const [productsInCart, setProductsInCart] = useState([])
    const { user: { cart } } = useContext(UserContext)

    const getItemsInCart = useCallback(async () => {
        if (cart.length === 0) {
            setProductsInCart([])
            return
        }

        const result = await getProductDetailsMain(cart.map(p => p.productId))
        if (result.error) {
            //TODO: handle errors
            return
        }

        const resultsByProductId = result.reduce((acc, p) => {
            return { ...acc, [p.productId]: p }
        }, {})

        const newProductsInCart = cart.map(p => {
            return {
                sizeName: p.sizeName,
                quantity: p.quantity,
                ...resultsByProductId[p.productId]
            }
        })

        setProductsInCart(newProductsInCart)
    }, [cart])

    useEffect(() => {
        getItemsInCart()
    }, [getItemsInCart, cart])

    return (
        <PageWrapper>
            <Header />
            { productsInCart.length > 0
                ?
                <>
                    <h2 className={styles['page-title']}>your shopping cart</h2>
                    <div className={styles.container}>
                        <div className={styles.items}>
                            {productsInCart.map(item =>
                                <ShoppingCartItem 
                                    key={item.productId}
                                    {...item}
                                />)
                            }
                        </div>
                        <ShoppingCartCheckout productsInCart={productsInCart} />
                    </div>
                </>
                :
                <>
                    <h2 className={styles['page-title']} style={{ marginBottom: '3rem' }}>
                        your shopping cart is empty
                    </h2>
                    <BackIconLink />
                </>
            }
        </PageWrapper>
    )
}

export default ShoppingCartPage