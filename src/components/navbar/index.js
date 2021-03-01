import React, { useContext, useReducer } from 'react'
import styles from './index.module.css'
import UserContext from '../../UserContext'
import NavbarLink from '../navbarLink'

import NavbarImageLink from '../navbarImageLink'

const Navbar = ({ clickedName }) => {
    const { user: { isAdmin } } = useContext(UserContext)

    const linkData = {
        links: {
            men: {
                name: 'Men',
                path: '/products/men',
                imageName: 'menLink.png',
                clicked: clickedName === 'Men',
                normalOrder: 1,
                clickedOrder: 4
            },
            women: {
                name: 'Women',
                path: '/products/women',
                imageName: 'womenLink.png',
                clicked: clickedName === 'Women',
                normalOrder: 3,
                clickedOrder: 3
            },
            promotions: {
                name: 'Promotions',
                path: '/products/promotions',
                imageName: 'promotionsLink.png',
                clicked: clickedName === 'Promotions',
                normalOrder: 5,
                clickedOrder: 2
            }
        },
        currentClicked: null
    }

    const [state, stateDispatch] = useReducer(linksReducer, linkData)

    function linksReducer(state, action) {
        const { name, type } = action
        const linkKey = name.toLowerCase()
        const link = state.links[linkKey]

        switch(type) {
            case 'click':
                const oldClicked = state.currentClicked
                if (oldClicked) {
                    state.links[oldClicked.toLowerCase()].clicked = false
                }

                const newClicked = { ...link, clicked: true }

                return {
                    links: { ...state.links, [linkKey]: newClicked },
                    currentClicked: name 
                }
            default:
                return state
        }
    }

    return (
        <nav className={styles.container}>
            <ul className={styles['navbar-links']}>
                { Object.values(state.links).map(link => {
                    return <NavbarImageLink
                                key={link.name}
                                linkKey={link.name}
                                name={link.name}
                                path={link.path}
                                imageName={link.imageName}
                                clicked={link.clicked}
                                handleClick={() => stateDispatch({ type: 'click', name: link.name })}
                                order={link.clicked 
                                            ? link.clickedOrder 
                                            : link.normalOrder}
                            />
                })}

                {isAdmin &&
                    <div 
                        style={{ order: 10 }} 
                        className={window.location.pathname.startsWith('/admin') && styles.selected}
                    >
                        <NavbarLink name='Admin' path='/admin/products' />
                    </div>
                }
            </ul>
        </nav>
    )
}

export default Navbar