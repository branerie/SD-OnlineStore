import React from 'react'
import styles from './index.module.css'
import PageSecondaryTitle from '../pageSecondaryTitle'
import SubmitButton from '../submitButton'
import WindowContainer from '../windowContainer'

const ConfirmWindow = ({ hideWindow, handleConfirm, text, title }) => {
    return (
        <WindowContainer hideWindow={hideWindow}>
            <div className={styles.container}>
                <PageSecondaryTitle title={title} />
                <div className={styles.text}>
                    {text}
                </div>
                <SubmitButton text='Confirm' onClick={handleConfirm} />
            </div>
        </WindowContainer>
    )
}

export default ConfirmWindow