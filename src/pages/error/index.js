import React from 'react'
import HeaderHome from '../../components/headerHome'
import Footer from '../../components/footer'
import { useHistory } from 'react-router-dom'

const ErrorPage = ({ children }) => {
    const history = useHistory()
    if (document.location.href !== '/error') {
        history.push('/error')
    }

    return (
        <>
            <HeaderHome />
                {children}
            <Footer />
        </>
    )
}

export default ErrorPage