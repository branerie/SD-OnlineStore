import React, { useCallback, useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import styles from './index.module.css'
import UserContext from '../../UserContext'
import ErrorContext from '../../ErrorContext'
import { getProductDetailsMain } from '../../services/product'
import ShoppingCartItem from '../../components/shoppingCartItem'
import Header from '../../components/header'
import ShoppingCartCheckout from '../../components/shoppingCartCheckout'
import BackIconLink from '../../components/iconLinks/backIconLink'
import PageWrapper from '../../components/pageWrapper'
import NavButtons from '../../components/navButtons'

const ShoppingCartPage = () => {
    const [productsInCart, setProductsInCart] = useState([])
    const [productInfoById, setProductInfoById] = useState(null)
    const { user: { cart } } = useContext(UserContext)
    const { addMessage } = useContext(ErrorContext)
    const history = useHistory()

    const getItemsInCart = useCallback(async () => {
        if (cart.length === 0) {
            setProductsInCart([])
            return
        }

        let newProductsInCart
        if (cart.length <= productsInCart.length) {
            // either user removed a product from cart or changed the quantity
            // of a product
            newProductsInCart = cart.map(p => {
                return {
                    sizeName: p.sizeName,
                    quantity: p.quantity,
                    ...productInfoById[p.productId]
                }
            })
        } else {
            // page is loading up for the first time
            const result = await getProductDetailsMain(cart.map(p => p.productId))
            if (result.error) {
                addMessage(
                    'Product Details Cart',
                    'An error occurred while trying to receive product information. Please be patient as we try to solve this issue.'
                )

                return history.goBack()
            }

            const resultsByProductId = result.reduce((acc, p) => {
                return { ...acc, [p.productId]: p }
            }, {})

            // filter cart by returned product ids in case a product which is in the cart
            // has been deleted and is not available anymore 
            newProductsInCart = cart.filter(ci => resultsByProductId[ci.productId]).map(p => {
                return {
                    sizeName: p.sizeName,
                    quantity: p.quantity,
                    ...resultsByProductId[p.productId]
                }
            })

            setProductInfoById(resultsByProductId)
        }

        setProductsInCart(newProductsInCart)
    }, [cart, history, addMessage])

    useEffect(() => {
        getItemsInCart()
    }, [getItemsInCart])

    return (
        <PageWrapper>
            <Header />
            <NavButtons />
            { productsInCart.length > 0
                ?
                <>
                    <h2 className={styles['page-title']}>your shopping cart</h2>
                    <div className={styles.container}>
                        <div className={styles.items}>
                            {productsInCart.map(item =>
                                <ShoppingCartItem
                                    key={`${item.productId}-${item.sizeName}`}
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