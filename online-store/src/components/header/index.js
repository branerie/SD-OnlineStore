import React from 'react'
import styles from './index.module.css'
import logo from '../../images/logo.svg'

import PageTitle from '../../components/pageTitle'
import Navbar from '../../components/navbar'
import { Link } from 'react-router-dom'

const Header = () => {
    return (
        <header>
            <PageTitle title="Find you here" />
            <Link to='/'>
                <img src={logo} className={styles.logo} />
            </Link>
            <Navbar />
        </header>
    )
}

export default Header