import React, { useState, useMemo, useContext, useCallback } from 'react'
import { useHistory } from 'react-router-dom'
import styles from './index.module.css'
import { logOut } from '../../../services/user'
import LoginWindow from '../../LoginWindow'
import RegisterWindow from '../../RegisterWindow'
import PasswordResetFormWindow from '../../PasswordResetFormWindow'
import { useVisible } from '../../../hooks'
import UserContext from '../../../contexts/UserContext'

const ProfileIconLink = () => {
    const [isFilled, setIsFilled] = useState(false)
    const { ref, isVisible, setIsVisible } = useVisible(false)
    const [shownWindow, setShownWindow] = useState('')
    const { user, setNewUser } = useContext(UserContext)
    const history = useHistory()

    const fillColor = useMemo(() => {
        return isFilled
            ? '#40e5eb'
            : 'none'
    }, [isFilled])

    const logOutUser = async () => {
        const result = await logOut()
    
        if (result.error ) {
            // TODO: Decide whether to show error to user if something went wrong
            // otherwise, can be used as a place to log errors in the future
        }

        setIsVisible(false)
        setNewUser()
    }

    const hideWindow = useCallback(() => setShownWindow(''), [])
    const registerWindowPopup = useCallback(() => setShownWindow('register'), [])
    const passwordResetPopup = useCallback(() => setShownWindow('passwordResetForm'), [])
    const loginWindowPopup = useCallback(() => setShownWindow('login'), [])

    const toggleVisible = () => {
        setIsVisible(!isVisible)
    }

    return (
        <>
            <div
                className={styles.container}
                onMouseEnter={() => setIsFilled(true)}
                onMouseLeave={() => setIsFilled(false)}
                onClick={toggleVisible}
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 52.844 49.636">
                    <g id="Group_3" data-name="Group 3" transform="translate(-1814.241 -103.364)">
                        <g id="Ellipse_3" data-name="Ellipse 3" transform="translate(1831 118)" fill={fillColor} stroke="#707070" strokeWidth="1.5">
                            <circle cx="9" cy="9" r="9" stroke="none" />
                            <circle cx="9" cy="9" r="8.25" fill="none" />
                        </g>
                        <path id="Path_40" data-name="Path 40" d="M1865.171,1120c-83.069,51.771,19.546,40,19.546,40" transform="translate(-17.717 -1016)" fill="none" stroke="#707070" strokeWidth="1.5" />
                        <g id="Polygon_3" data-name="Polygon 3" transform="translate(1828 137)" fill={fillColor}>
                            <path d="M 23.46231651306152 15.25 L 1.537684082984924 15.25 L 12.5 1.218235611915588 L 23.46231651306152 15.25 Z" stroke="none" />
                            <path d="M 12.5 2.436481475830078 L 3.075376510620117 14.5 L 21.92462348937988 14.5 L 12.5 2.436481475830078 M 12.5 0 L 25 16 L 0 16 L 12.5 0 Z" stroke="none" fill="#707070" />
                        </g>
                    </g>
                </svg>
            { isVisible && !user.userId     // user is not logged in
                ? (
                    <div className={styles.list} ref={ref}>
                        <div className={styles.criteria}
                            onClick={() => setShownWindow('login')}>
                            Log In
                        </div>
                        <div className={styles.criteria}
                            onClick={() => setShownWindow('register')}>
                            Sign Up
                        </div>
                    </div>
                )
                : null
            }
            { isVisible && user.userId      // user is logged in
                ? (
                    <div className={styles.list} ref={ref}>
                        <div className={styles.criteria} onClick={() => history.push('/user/profile')}>Profile</div>
                        <div className={styles.criteria}
                            onClick={logOutUser}>
                            Logout
                        </div>
                    </div>
                )
                :null
            }
            </div>
            { shownWindow === 'login'
                ?
                <LoginWindow
                    hideWindow={hideWindow}
                    registerWindowPopup={registerWindowPopup}
                    passwordResetPopup={passwordResetPopup}
                />
                : null
            }
            { shownWindow === 'register'
                ? 
                <RegisterWindow
                    hideWindow={hideWindow}
                    loginWindowPopup={loginWindowPopup}
                />
                : null
            }
            { shownWindow === 'passwordResetForm'
                ?
                <PasswordResetFormWindow hideWindow={hideWindow} /> 
                : null
            }
        </>
    )
}

export default ProfileIconLink