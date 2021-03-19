import React, { useCallback, useContext, useEffect, useState } from 'react'
import styles from './index.module.css'
import UserContext from '../../contexts/UserContext'
import ShoppingCartItem from '../../components/ShoppingCartItem'
import Header from '../../components/Header'
import ShoppingCartReceipt from '../../components/ShoppingCartReceipt'
import BackIconLink from '../../components/IconLinks/BackIconLink'
import PageWrapper from '../../components/PageWrapper'
import NavButtons from '../../components/NavButtons'
import PageSecondaryTitle from '../../components/PageSecondaryTitle'

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