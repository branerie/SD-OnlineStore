import React, { useCallback, useContext, useEffect } from 'react'
import { Redirect, useParams } from 'react-router-dom'
import UserContext from '../../Context'
import { confirmUser } from '../../services/user'
import ErrorPage from '../error'

const INVALID_TOKEN_MESSAGE = 'Invalid user confirmation token'

const UserConfirmation = () => {
    const { confirmationToken } = useParams()
    const { setUser } = useContext(UserContext)

    const handleUserConfirmation = useCallback(async () => {
        if (!confirmationToken) {
            return (
                <ErrorPage>
                    {INVALID_TOKEN_MESSAGE}
                </ErrorPage>
            )
        }

        const result = await confirmUser(confirmationToken)
        if (result.error) {
            return (
                <ErrorPage>
                    {INVALID_TOKEN_MESSAGE}
                </ErrorPage>
            )
        }

        setUser({ id: result.userId, isAdmin: false, favorites: [] })
    }, [setUser, confirmationToken])

    useEffect(() => {
        handleUserConfirmation()
    }, [handleUserConfirmation])

    //TODO: User that has not been confirmed yet should not be able to buy stuff 

    return (
        <Redirect to='/' />
    )
}

export default UserConfirmation