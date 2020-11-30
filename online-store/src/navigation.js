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
import AddProductPage from './pages/addProduct'
import RegisterPage from './pages/register'
import LoginPage from './pages/login'

const Navigation = () => {
    const { user: { isAdmin, userId }} = useContext(UserContext)

    return (
        <BrowserRouter>
            <Switch>
            <Route exact path='/' component={HomePage} />
            <Route path='/register'>
                {userId ? (<Redirect to='/' />) : (<RegisterPage />) }
            </Route>
            <Route path='/login'>
                {userId ? (<Redirect to='/' />) : (<LoginPage />)}
            </Route>
            <Route path='/admin/products/add'>
                {isAdmin ? (<AddProductPage />) : (<Redirect to='/login' />) }
            </Route>
            <Route path='/admin/products'>
                {isAdmin ? (<AdminProductsPage />) : (<Redirect to='/login' />) }
            </Route>            
            </Switch>
        </BrowserRouter>

    )
}

export default Navigation


