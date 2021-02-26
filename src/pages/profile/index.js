import React, { useContext, useState } from 'react'
import styles from './index.module.css'
import { useHistory } from 'react-router-dom'
import Header from '../../components/header'
import NavButtons from '../../components/navButtons'
import PageWrapper from '../../components/pageWrapper'
import ProfileSettings from '../../components/profileSettings'
import UserContext from '../../UserContext'
import ProfileHistory from '../../components/profileHistory'
import ProfileSidebarButton from '../../components/profileSidebarButton'

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