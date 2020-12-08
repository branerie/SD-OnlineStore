import React from 'react'
import styles from './index.module.css'
import logo from '../../images/logo.png'

import PageTitle from '../pageTitle'
import Navbar from '../navbar'
import { Link } from 'react-router-dom'

const Header = ({ clickedName }) => {
    return (
        <header>
            <PageTitle title="Find you here" />
            <Link to='/'>
                <img src={logo} className={styles.logo} />
            </Link>
            <Navbar clickedName={clickedName} />
        </header>
    )
}

export default Header