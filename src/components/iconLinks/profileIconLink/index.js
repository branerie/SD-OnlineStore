import React, { useState, useMemo, useContext, useCallback, useEffect } from 'react'
import styles from '../index.module.css'
import { logOut } from '../../../services/user'
import UserContext from '../../../Context'
import LoginWindow from '../../loginWindow'
import RegisterWindow from '../../registerWindow'
import PasswordResetFormWindow from '../../passwordResetFormWindow'

const ProfileIconLink = () => {
    const [isFilled, setIsFilled] = useState(false)
    const [shownWindow, setShownWindow] = useState('')
    


    const { user, setUser } = useContext(UserContext)

    const fillColor = useMemo(() => {
        return isFilled
            ? '#40e5eb'
            : 'none'
    }, [isFilled])

    const checkUserId = async () => {
        if (!user.id) {
            setShownWindow('login')
            return
        }
        
        const result = await logOut()

        if (result.error ) {
            //TODO: handle error
            return
        }

        setUser({
            userId: null,
            isAdmin: false,
            favorites: []
        })
    }

    const handleWindowChange = (windowName) => {
        if (user.userId) {
            //TODO: Maybe display a message to user if already logged in?
            return
        }

        setShownWindow(windowName)
    }

    const hideWindow = useCallback(() => setShownWindow(''), [])
    const registerWindowPopup = useCallback(() => handleWindowChange('register'), [])
    const passwordResetPopup = useCallback(() => handleWindowChange('passwordResetForm'), [])
    const loginWindowPopup = useCallback(() => handleWindowChange('login'),[])

    return (
        <>
            <div
                className={styles.container}
                onMouseEnter={() => setIsFilled(true)}
                onMouseLeave={() => setIsFilled(false)}
                onClick={checkUserId}
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