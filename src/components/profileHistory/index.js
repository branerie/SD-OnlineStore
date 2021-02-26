import React, { useContext, useEffect } from 'react'
import UserContext from '../../UserContext'
import styles from './index.module.css'
import { getPurchaseHistory } from '../../services/user'

const ProfileHistory = () => {
    const { user, setNewUser } = useContext(UserContext)

    useEffect(() => {
        if (!user.purchaseHistory) {
            const purchaseHistory = await getPurchaseHistory()
            if (purchaseHistory.error) {

            }

            setNewUser({ ...user, purchaseHistory })
        }
    }, [])

    if (!user.purchaseHistory) {
        return null
    }

    return (
        <div>
            
        </div>
    )
}

export default ProfileHistory