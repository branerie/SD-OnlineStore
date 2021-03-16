import React, { useContext, useState } from 'react'
import styles from './index.module.css'
import TextInput from '../inputFields/textInput'
import WindowContainer from '../windowContainer'
import { sendPasswordResetEmail } from '../../services/user'
import SectionTitle from '../sectionTitle'
import SubmitButton from '../submitButton'
import ErrorContext from '../../ErrorContext'

const PasswordResetFormWindow = ({ hideWindow }) => {
    const [email, setEmail] = useState(null)
    const [isSent, setIsSent] = useState(false)
    const { addMessage } = useContext(ErrorContext)

    const handleSubmit = async (event) => {
        event.preventDefault()

        const result = await sendPasswordResetEmail(email)
        if (result.error) {
            addMessage(
                'Password Reset Email', 
                'Something went wrong when trying to send you a password reset email. Please be patient as we try to sort out the issue.'
            )
            
            return
        }
        
        setIsSent(true)
    }

    return (
        <WindowContainer hideWindow={hideWindow}>
            { isSent
                ?
                <>
                    <SectionTitle title='SUCCESS!' />
                    <div className={styles.message}>
                        An email has been sent to {email}. Please follow the link inside to
                        get to a password reset page.
                    </div>
                </>
                :
                <>
                    <SectionTitle title='RESET YOUR PASSWORD' />
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
                            <SubmitButton text='Send' />
                        </div>
                    </form>
                </>
            }
        </WindowContainer>
    )
}

export default PasswordResetFormWindow