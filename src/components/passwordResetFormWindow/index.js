import React, { useState } from 'react'
import styles from './index.module.css'
import TextInput from '../inputFields/textInput'
import WindowContainer from '../windowContainer'
import { sendPasswordResetEmail } from '../../services/user'

const PasswordResetFormWindow = ({ hideWindow }) => {
    const [email, setEmail] = useState(null)
    const [isSent, setIsSent] = useState(false)

    const handleSubmit = async (event) => {
        event.stopPropagation()

        // const result = await sendPasswordResetEmail(email)
        // if (result.error) {
        //     //TODO: handle errors
        //     return
        // }
        
        setIsSent(true)
    }

    return (
        <WindowContainer hideWindow={hideWindow}>
            { isSent
                ?
                <>
                    <h3 className={styles.title}>success!</h3>
                    <div className={styles.message}>
                        An email has been sent to {email}. Please follow the link inside to
                        get to a password reset page.
                    </div>
                </>
                :
                <>
                    <h3 className={styles.title}>reset your password</h3>
                    <form onSubmit={handleSubmit} className={styles.form}>
                        <TextInput
                            name='email'
                            type='email'
                            value={email}
                            placeholder='Email:'
                            onChange={e => setEmail(e.target.value)}
                        />
                        <div className={styles['inner-container']}>
                            <div className={styles.message}>
                                Please enter your registered email address.
                            <br />
                            A link will be sent which will allow you to reset your password.
                        </div>
                            <button type='submit' className={styles['submit-btn']}>Send</button>
                        </div>
                    </form>
                </>
            }
        </WindowContainer>
    )
}

export default PasswordResetFormWindow