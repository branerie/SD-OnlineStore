import React, { useContext } from 'react'
import {
    BrowserRouter,
    Switch,
    Route,
    Redirect
} from 'react-router-dom'
import UserContext from './Context'

import HomePage from './pages/home'
import AdminProductsPage from './pages/adminProducts'

const Navigation = () => {
    const { isAdmin } = useContext(UserContext)

    return (
        <BrowserRouter>
            <Switch>
            <Route exact path='/' component={HomePage} />
            <Route path='/admin/products'>
                {isAdmin ? (<AdminProductsPage />) : (<Redirect to='/login' />) }
            </Route>
            </Switch>
        </BrowserRouter>

    )
}

export default Navigation


