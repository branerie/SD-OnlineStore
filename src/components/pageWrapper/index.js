import React from 'react'
import styles from './index.module.css'
import Header from '../header'
import HeaderHome from '../headerHome'
import ErrorMessage from '../errorMessage'
import Footer from '../footer'

const PageWrapper = ({ children, maxWidth = '1120px' }) => {
    return (
        <div className={styles.container}>
            <div className={styles['inner-container']} style={{ maxWidth }}>
                {children}
                <ErrorMessage />
                <Footer />
            </div>
        </div>
    )
}

export default PageWrapper