import React from 'react'
import styles from './index.module.css'
import { useHistory } from 'react-router-dom'

const BackIconLink = () => {
    const history = useHistory()

    const backToPrevious = () => {
        history.goBack()
        // TODO:back to previous filters
    }
    return (
        <>
            <div className={styles['btn-back']} onClick={backToPrevious}>
                <svg xmlns="http://www.w3.org/2000/svg" width="83.07" height="22.111" viewBox="0 0 83.07 22.111">
                    <path id="Path_48" data-name="Path 48" d="M1148.5,2738s81.125,5.125,82-6.5c.241-3.208-17.5-4.5-80-8" transform="translate(-1148.43 -2718.02)" fill="none" stroke="#707070" stroke-width="2"/>
                    <path id="Path_49" data-name="Path 49" d="M1159,2730.333l-8.333-7,21.667-4.333" transform="translate(-1148.43 -2718.02)" fill="none" stroke="#707070" stroke-width="2"/>
                </svg>
                <div className={styles['btn-name']} >Back</div>
            </div>
        </>
    )
}

export default BackIconLink