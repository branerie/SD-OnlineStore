import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react'
import styles from './index.module.css'
import UserContext from '../../UserContext'
import PageSecondaryTitle from '../pageSecondaryTitle'
import { formatDate } from '../../utils/date'
import ShoppingCartReceipt from '../shoppingCartReceipt'
import ProfileSidebarButton from '../profileSidebarButton'

const ProfileHistory = () => {
    const { user: { purchaseHistory }, getFullHistoryProducts } = useContext(UserContext)
    const [productInfo, setProductInfo] = useState(null)
    const [shownIndex, setShownIndex] = useState(purchaseHistory.length - 1)

    const fetchProductInfo = useCallback(async () => {
        const fullProducts = await getFullHistoryProducts()
        setProductInfo(fullProducts)
    }, [getFullHistoryProducts])

    useEffect(() => {
        fetchProductInfo()
    }, [fetchProductInfo])

    const productsInPurchase = useMemo(() => {
        if (!purchaseHistory || purchaseHistory.length === 0 || !productInfo) {
            return null
        }

        const purchaseProducts = purchaseHistory[shownIndex].products

        return purchaseProducts.map(p => ({ ...p, ...productInfo[p.productId]}))
    }, [shownIndex, purchaseHistory, productInfo])

    return (
        <div className={styles.container}>
            { purchaseHistory && purchaseHistory.length > 0 && productsInPurchase
                ?
                <>
                <PageSecondaryTitle title='purchase history' style={{ marginTop: '0', marginBottom: '10px' }} />
                <div className={styles['inner-container']}>
                    <div className={styles['receipt-current']}>
                        <ShoppingCartReceipt 
                            productsInCart={productsInPurchase} 
                            isCheckout={false} 
                        />
                    </div>
                    <div className={styles['receipt-buttons']}>
                        {purchaseHistory.map((h, index) => {
                            return (
                                <ProfileSidebarButton
                                    key={`${h._id}-${h.dateAdded}`}
                                    historyId={h._id}
                                    onClick={() => setShownIndex(index)}
                                    isSelected={shownIndex === index}
                                    text={formatDate(new Date(h.dateAdded), '%d.%m.%Y, %H:%M')}
                                    style={{ marginRight: '0.5rem', order: `${-index}`, textAlign: 'start' }}
                                />
                            )
                        })}
                    </div>
                </div>
                </>
                :
                <PageSecondaryTitle title={'you haven\'t made any purchases yet'} />
            }
        </div>
    )
}

export default ProfileHistory