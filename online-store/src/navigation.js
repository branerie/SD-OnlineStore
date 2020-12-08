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
import ProductPage from './pages/product'
import MensPage from './pages/men'
import WomensPage from './pages/women'
import PromotionsPage from './pages/promotions'

const PAGE_LENGTH = 3

const Navigation = () => {
    const { user: { isAdmin, userId }} = useContext(UserContext)

    return (
        <BrowserRouter>
            <Switch>
            <Route exact path='/' component={HomePage} />
            <Route path='/products/men'>
                <MensPage pageLength={PAGE_LENGTH} />
            </Route>
            <Route path='/products/women'>
                <WomensPage pageLength={PAGE_LENGTH} />
            </Route>
            <Route path='/products/promotions'>
                <PromotionsPage pageLength={PAGE_LENGTH} />
            </Route>
            <Route path='/products'>
                <ProductPage pageLength={PAGE_LENGTH} />
            </Route>
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
                { isAdmin 
                    ? <AdminProductsPage pageLength={PAGE_LENGTH} /> 
                    : <Redirect to='/login' />
                }
            </Route>            
            </Switch>
        </BrowserRouter>

    )
}

export default Navigation


