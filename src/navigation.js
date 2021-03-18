import React, { useContext } from 'react'
import {
    BrowserRouter,
    Switch,
    Route,
    Redirect
} from 'react-router-dom'
import UserContext from './contexts/UserContext'
import HomePage from './pages/Home'
import AdminProductsPage from './pages/AdminProducts'
import ProductPage from './pages/Product'
import MensPage from './pages/Men'
import WomensPage from './pages/Women'
import PromotionsPage from './pages/Promotions'
import UserConfirmationPage from './pages/UserConfirmation'
import PasswordResetPage from './pages/PasswordReset'
import ShoppingCartPage from './pages/ShoppingCart'
import ProductDetailsPage from './pages/ProductDetails'
import FavoritesPage from './pages/Favorites'
import ErrorBoundary from './ErrorBoundary'
import ErrorPage from './pages/Error'
import ProfilePage from './pages/Profile'

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
                    <Route path='/user/profile' component={ProfilePage} />
                    <Route>
                        <ErrorPage status={404} message='The requested page does not exist' />
                    </Route>
                </Switch>
            </ErrorBoundary>
        </BrowserRouter>
    )
}

export default Navigation


