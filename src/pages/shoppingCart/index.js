import React, { useCallback, useContext, useEffect, useState } from 'react'
import styles from './index.module.css'
import UserContext from '../../UserContext'
import ShoppingCartItem from '../../components/shoppingCartItem'
import Header from '../../components/header'
import ShoppingCartReceipt from '../../components/shoppingCartReceipt'
import BackIconLink from '../../components/iconLinks/backIconLink'
import PageWrapper from '../../components/pageWrapper'
import NavButtons from '../../components/navButtons'
import PageSecondaryTitle from '../../components/pageSecondaryTitle'

const ShoppingCartPage = () => {
    const [productsInCart, setProductsInCart] = useState([])

    const { user: { cart }, getFullCartProducts } = useContext(UserContext)

    const getItemsInCart = useCallback(async () => {
        const result = await getFullCartProducts()
        
        // filter cart by returned product ids in case a product which is in the cart
        // has been deleted and is not available anymore 
        const filteredProductsInCart = cart.filter(ci => result[ci.productId])
        const newProductsInCart = filteredProductsInCart.map(p => { 
            return { sizeName: p.sizeName, quantity: p.quantity, ...result[p.productId] } 
        })

        setProductsInCart(newProductsInCart)
    }, [cart, getFullCartProducts])

    useEffect(() => {
        getItemsInCart()
    }, [getItemsInCart])

    return (
        <PageWrapper maxWidth='1680px'>
            <Header />
            <NavButtons />
            { productsInCart.length > 0
                ?
                <>
                    <PageSecondaryTitle title='your shopping cart' />
                    <div className={styles.container}>
                        <div className={styles.items}>
                            { 
                                productsInCart.map(item =>
                                    <ShoppingCartItem
                                        key={`${item.productId}-${item.sizeName}`}
                                        {...item}
                                    />
                                )
                            }
                        </div>
                        <ShoppingCartReceipt productsInCart={productsInCart} isCheckout={true} />
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