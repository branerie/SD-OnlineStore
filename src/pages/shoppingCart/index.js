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

    const { getFullCartProducts } = useContext(UserContext)

    const getItemsInCart = useCallback(async () => {
        const result = await getFullCartProducts()
        setProductsInCart(result)
    }, [getFullCartProducts])

    useEffect(() => {
        getItemsInCart()
    }, [getItemsInCart])

    const getCartItemTotalQuantity = (cartItem) => {
        const cartItemSizeInfo = cartItem.sizes.filter(s => s.sizeName === cartItem.sizeName)[0]
        return cartItemSizeInfo.count
    }

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
                                        productId={item.productId}
                                        brand={item.brand}
                                        description={item.description}
                                        price={item.price}
                                        discountPrice={item.discountPrice}
                                        image={item.image}
                                        sizeName={item.sizeName}
                                        sizeQuantity={getCartItemTotalQuantity(item)}
                                        quantity={item.quantity}
                                    />
                                )
                            }
                        </div>
                        <ShoppingCartReceipt 
                            productsInCart={productsInCart} 
                            setProductsInCart={setProductsInCart}
                            isCheckout={true} 
                        />
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