import React from 'react'
import { useHistory } from 'react-router-dom'
import HeaderHome from '../../components/headerHome'
import Footer from '../../components/footer'
import ErrorBody from '../../components/errorBody'

const ErrorPage = ({ status, message }) => {
    const history = useHistory()
    
    if (history && history.location.pathname !== '/error') {
        history.push('/error')
    }

    if (!history) {
        return (
            <ErrorBody status={status} message={message} />
        )
    }

    return (
        <>
            <HeaderHome />
            <ErrorBody status={status} message={message} />
            <Footer />
        </>
    )
}

export default ErrorPage