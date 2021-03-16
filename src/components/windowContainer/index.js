import React from 'react'
import styles from './index.module.css'

const WindowContainer = ({ children, hideWindow }) => {
    return (
        <div className={styles.container} onClick={hideWindow}>
            <div className={styles['inner-container']} onClick={e => e.stopPropagation()}>
                <div className={styles.close} onClick={hideWindow}>
                    <span className={styles.bar}></span>
                    <span className={styles.bar}></span>
                </div>
                {children}
            </div>
        </div>
    )
}

export default WindowContainer