import React from 'react'
import styles from './index.module.css'
import PageSecondaryTitle from '../PageSecondaryTitle'
import SubmitButton from '../SubmitButton'
import WindowContainer from '../WindowContainer'

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