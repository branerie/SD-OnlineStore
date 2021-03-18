import React from 'react'
import { useHistory } from 'react-router-dom'
import Header from '../../components/Header'
import ErrorBody from '../../components/ErrorBody'
import PageWrapper from '../../components/PageWrapper'
import NavButtons from '../../components/NavButtons'

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
        <PageWrapper>
            <Header />
            <NavButtons />
            <ErrorBody status={status} message={message} />
        </PageWrapper>
    )
}

export default ErrorPage