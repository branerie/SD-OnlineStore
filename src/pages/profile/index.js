import React, { useContext, useState } from 'react'
import styles from './index.module.css'
import { useHistory } from 'react-router-dom'
import Header from '../../components/header'
import NavButtons from '../../components/navButtons'
import PageWrapper from '../../components/pageWrapper'
import ProfileSettings from '../../components/profileSettings'
import UserContext from '../../UserContext'

const ProfilePage = () => {
    const [activeMenu, setActiveMenu] = useState('settings')
    const { user } = useContext(UserContext)
    const history = useHistory()

    if (!user.userId) {
        history.push('/')
    }

    return (
        <PageWrapper maxWidth='1280px'>
            <Header />
            <NavButtons />
            <main className={styles.container}>
                <aside className={styles.sidebar}>
                    <button 
                        className={`${styles['btn-sidebar']} ${(activeMenu === 'settings') && styles.selected}`}
                        onClick={() => setActiveMenu('settings')}
                        disabled={activeMenu === 'settings'}
                    >
                        Settings
                    </button>
                    <button 
                        className={`${styles['btn-sidebar']} ${(activeMenu === 'purchases') && styles.selected}`}
                        onClick={() => setActiveMenu('purchases')}
                        disabled={activeMenu === 'purchases'}
                    >
                        Purchase History
                    </button>
                </aside>
                {activeMenu === 'settings'
                    ? <ProfileSettings />
                    : null
                }
            </main>
        </PageWrapper>
    )
}

export default ProfilePage