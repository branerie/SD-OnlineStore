import React from 'react'
import styles from './index.module.css'
import logo from '../../images/logo.svg'

import PageTitle from '../pageTitle'
import NavbarHome from '../navbarHome'
import { Link } from 'react-router-dom'

const HeaderHome = () => {
    return (
        <header>
            <PageTitle title="Find you here" />
            <Link to='/'>
                <img src={logo} className={styles.logo} />
            </Link>
            <NavbarHome />
        </header>
    )
}

export default HeaderHome