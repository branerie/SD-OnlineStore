import React, { useCallback, useContext, useEffect } from 'react'
import { Redirect, useParams } from 'react-router-dom'
import UserContext from '../../contexts/UserContext'
import { confirmUser } from '../../services/user'
import ErrorPage from '../Error'

const INVALID_TOKEN_MESSAGE = 'Invalid user confirmation token'

const UserConfirmation = () => {
    const { confirmationToken } = useParams()
    const { setNewUser } = useContext(UserContext)

    const handleUserConfirmation = useCallback(async () => {
        if (!confirmationToken) {
            return (
                <ErrorPage message={INVALID_TOKEN_MESSAGE} status={400} />
            )
        }

        const result = await confirmUser(confirmationToken)
        if (result.error) {
            return (
                <ErrorPage message={INVALID_TOKEN_MESSAGE} status={400} />
            )
        }

        setNewUser(result)
    }, [setNewUser, confirmationToken])

    useEffect(() => {
        handleUserConfirmation()
    }, [handleUserConfirmation])

    //TODO: User that has not been confirmed yet should not be able to buy stuff 

    return (
        <Redirect to='/' />
    )
}

export default UserConfirmation