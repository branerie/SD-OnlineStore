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
import AddProductCard from './pages/addProduct'
import RegisterPage from './pages/register'

const Navigation = () => {
    const { isAdmin } = useContext(UserContext)

    return (
        <BrowserRouter>
            <Switch>
            <Route exact path='/' component={HomePage} />
            <Route path='/register' component={RegisterPage} />
            <Route path='/admin/products/add'>
                {isAdmin ? (<AddProductCard />) : (<Redirect to='/login' />) }
            </Route>
            <Route path='/admin/products'>
                {isAdmin ? (<AdminProductsPage />) : (<Redirect to='/login' />) }
            </Route>            
            </Switch>
        </BrowserRouter>

    )
}

export default Navigation


