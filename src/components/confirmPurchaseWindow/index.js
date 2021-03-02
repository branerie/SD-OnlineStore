import React from 'react'
import styles from './index.module.css'
import ClosePopUp from '../closePopUp'
import PageSecondaryTitle from '../pageSecondaryTitle'
import SubmitButton from '../submitButton'
import WindowContainer from '../windowContainer'

const ConfirmPurchaseWindow = ({ hideWindow, handlePurchase }) => {
    const handleConfirm = () => {
        handlePurchase()
        hideWindow()
    }

    return (
        <WindowContainer hideWindow={hideWindow}>
            <ClosePopUp hideWindow={hideWindow} />
            <div className={styles.container}>
                <PageSecondaryTitle title='Confirm Purchase' />
                <div className={styles.text}>
                    Are you sure you want to purchase the items in your cart?
                </div>
                <SubmitButton text='Confirm' onClick={handleConfirm} />
            </div>
        </WindowContainer>
    )
}

export default ConfirmPurchaseWindow