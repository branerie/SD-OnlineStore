import React, { useContext } from 'react'
import styles from './index.module.css'
import ErrorMessage from '../errorMessage'
import Footer from '../footer'
import ErrorContext from '../../ErrorContext'

const PageWrapper = ({ children, maxWidth }) => {
    const { messages, closeMessage } = useContext(ErrorContext) 

    return (
        <div className={styles.container}>
            <div className={styles['inner-container']} style={maxWidth && { maxWidth }}>
                {children}
                { messages.length > 0 
                    ? 
                    <div className={styles['error-container']}>
                        { messages.slice(0, 2).map(msg => 
                            <ErrorMessage 
                                text={msg.text} 
                                handleClose={() => closeMessage(msg.name)} 
                            />)
                        }
                    </div>
                    : null
                }
                <Footer />
            </div>
        </div>
    )
}

export default PageWrapper