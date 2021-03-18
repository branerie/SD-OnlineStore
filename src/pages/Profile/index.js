import React, { useContext, useState } from 'react'
import styles from './index.module.css'
import { useHistory } from 'react-router-dom'
import Header from '../../components/Header'
import NavButtons from '../../components/NavButtons'
import PageWrapper from '../../components/PageWrapper'
import ProfileSettings from '../../components/ProfileSettings'
import UserContext from '../../contexts/UserContext'
import ProfileHistory from '../../components/ProfileHistory'
import ProfileSidebarButton from '../../components/ProfileSidebarButton'

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
                    <ProfileSidebarButton 
                        isSelected={activeMenu === 'settings'}
                        onClick={() => setActiveMenu('settings')}
                        text='Settings'
                    />
                    <ProfileSidebarButton 
                        isSelected={activeMenu === 'purchases'}
                        onClick={() => setActiveMenu('purchases')}
                        text='Purchase History'
                    />
                </aside>
                {activeMenu === 'settings'
                    ? <ProfileSettings />
                    : <ProfileHistory />
                }
            </main>
        </PageWrapper>
    )
}

export default ProfilePage