import React from 'react'
import styles from './index.module.css'
import logo from '../../images/logo.png'

import PageTitle from '../PageTitle'
import NavbarHome from '../NavbarHome'
import { Link } from 'react-router-dom'

const HeaderHome = () => {
    return (
        <header>
            <PageTitle title="Find you here" />
            <Link to='/'>
                <img src={logo} className={styles.logo} alt='Company Logo' />
            </Link>
            <NavbarHome />
        </header>
    )
}

export default HeaderHome