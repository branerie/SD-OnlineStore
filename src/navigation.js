import React, { useContext } from 'react'
import {
    BrowserRouter,
    Switch,
    Route,
    Redirect
} from 'react-router-dom'
import UserContext from './UserContext'
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
import ProductDetailsPage from './pages/productDetails'
import FavoritesPage from './pages/favorites'
import ErrorBoundary from './ErrorBoundary'
import ErrorPage from './pages/error'

const PAGE_LENGTH = 6

const Navigation = () => {
    const { user } = useContext(UserContext)

    return (
        <BrowserRouter>
            <ErrorBoundary>
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
                    <Route path='/product/details/:id' >
                        <ProductDetailsPage />
                    </Route>
                    <Route path='/admin/products/add'>
                        {user && user.isAdmin ? (<AddProductPage />) : (<Redirect to='/' />)}
                    </Route>
                    <Route path='/admin/products'>
                        {user && user.isAdmin
                            ? <AdminProductsPage pageLength={PAGE_LENGTH} />
                            : <Redirect to='/' />
                        }
                    </Route>
                    <Route path='/user/confirm/:confirmationToken' component={UserConfirmationPage} />
                    <Route path='/user/password/reset/:resetToken' component={PasswordResetPage} />
                    <Route path='/user/cart' component={ShoppingCartPage} />
                    <Route path='/user/favorites' component={FavoritesPage} />
                    <Route>
                        <ErrorPage status={404} message='The requested page does not exist' />
                    </Route>
                </Switch>
            </ErrorBoundary>
        </BrowserRouter>
    )
}

export default Navigation


