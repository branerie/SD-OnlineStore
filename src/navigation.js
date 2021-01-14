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
import ProductPage from './pages/product'
import MensPage from './pages/men'
import WomensPage from './pages/women'
import PromotionsPage from './pages/promotions'
import UserConfirmationPage from './pages/userConfirmation'
import PasswordResetPage from './pages/passwordReset'
import ShoppingCartPage from './pages/shoppingCart'

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
                <Route path='/admin/products/add'>
                    {isAdmin ? (<AddProductPage />) : (<Redirect to='/login' />) }
                </Route>
                <Route path='/admin/products'>
                    { isAdmin 
                        ? <AdminProductsPage pageLength={PAGE_LENGTH} /> 
                        : <Redirect to='/login' />
                    }
                </Route>
                <Route path='/user/confirm/:confirmationToken' component={UserConfirmationPage} /> 
                <Route path='/user/password/reset/:resetToken' component={PasswordResetPage} /> 
                <Route path='/user/cart' component={ShoppingCartPage} />     
            </Switch>
        </BrowserRouter>

    )
}

export default Navigation


