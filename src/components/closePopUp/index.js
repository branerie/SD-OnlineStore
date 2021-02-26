import { StylesProvider } from '@material-ui/core'
import React from 'react'
import styles from './index.module.css'

const ClosePopUp = ({ hideWindow }) => {
    return (
        <div 
            className={styles.container}
            onClick={hideWindow}>
                <span className={styles.bar}></span>
                <span className={styles.bar}></span>
        </div>
    )
}

export default ClosePopUp