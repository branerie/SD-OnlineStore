import React, { useContext } from 'react'
import styles from './index.module.css'
import ErrorMessage from '../ErrorMessage'
import Footer from '../Footer'
import ErrorContext from '../../contexts/ErrorContext'

const PageWrapper = ({ children, maxWidth }) => {
    const { messages, closeMessage } = useContext(ErrorContext) 

    return (
        <div className={styles.container}>
            <div className={styles['inner-container']} style={maxWidth && { maxWidth }}>
                <main>
                {children}
                { messages.length > 0 
                    ? 
                    <div className={styles['error-container']}>
                        { messages.slice(0, 2).map(msg => 
                            <ErrorMessage 
                                key={`${msg.text}_${msg.name}`}
                                text={msg.text} 
                                handleClose={() => closeMessage(msg.name)} 
                            />)
                        }
                    </div>
                    : null
                }
                </main>
                <Footer />
            </div>
        </div>
    )
}

export default PageWrapper