import React, { useCallback, useContext, useEffect, useState } from 'react'
import styles from './index.module.css'
import PageSecondaryTitle from '../PageSecondaryTitle'
import { formatDate } from '../../utils/date'
import ShoppingCartReceipt from '../ShoppingCartReceipt'
import ProfileSidebarButton from '../ProfileSidebarButton'
import { getPurchaseHistoryDetails } from '../../services/user'
import ErrorContext from '../../contexts/ErrorContext'
import { useHistory } from 'react-router'

const ProfileHistory = () => {
    const [purchaseInfo, setPurchaseInfo] = useState(null)
    const [shownIndex, setShownIndex] = useState(0)
    const { addMessage } = useContext(ErrorContext)
    const history = useHistory()

    const fetchProductInfo = useCallback(async () => {
        const fullProducts = await getPurchaseHistoryDetails()
        if (fullProducts.error) {
            addMessage('Purchase History', 'An error occurred while trying to retrieve your purchase history')
            return history.back()
        }
        
        setPurchaseInfo(fullProducts)
        setShownIndex(fullProducts.length - 1)
    }, [addMessage, history])

    useEffect(() => {
        fetchProductInfo()
    }, [fetchProductInfo])

    return (
        <div className={styles.container}>
            { purchaseInfo && purchaseInfo.length > 0
                ?
                <>
                <PageSecondaryTitle title='purchase history' style={{ marginTop: '0', marginBottom: '10px' }} />
                <div className={styles['inner-container']}>
                    <div className={styles['receipt-current']}>
                        <ShoppingCartReceipt 
                            productsInCart={purchaseInfo[shownIndex].products} 
                            isCheckout={false} 
                        />
                    </div>
                    <div className={styles['receipt-buttons']}>
                        {purchaseInfo.map((purchase, index) => {
                            return (
                                <ProfileSidebarButton
                                    key={`${purchase._id}-${purchase.dateAdded}`}
                                    historyId={purchase._id}
                                    onClick={() => setShownIndex(index)}
                                    isSelected={shownIndex === index}
                                    text={formatDate(new Date(purchase.dateAdded), '%d.%m.%Y, %H:%M')}
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