import React from 'react'
import styles from './index.module.css'
import logo from '../../images/logo.png'

import PageTitle from '../PageTitle'
import Navbar from '../Navbar'
import { Link } from 'react-router-dom'

const Header = ({ clickedName }) => {
    return (
        <header>
            <PageTitle title="Find you here" />
            <Link to='/'>
                <img src={logo} className={styles.logo} alt='Company Logo' />
            </Link>
            <Navbar clickedName={clickedName} />
        </header>
    )
}

export default Header