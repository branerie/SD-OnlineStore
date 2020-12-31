import React from 'react'
import { render, cleanup } from '@testing-library/react'

import MockUserContext from '../test/mockUserContext'
import ProductCard from './index'
import { MemoryRouter } from 'react-router-dom'

describe('ProductCard', () => {
    afterEach(cleanup)

    const discountPercent = 10
    const discountCurrency = 'EUR'
    const discountPrice = 54

    let queryByText, getByTestId
    beforeEach(() => {
        const renderResult = render(
            <MockUserContext initialUser={{
                favorites: ['1', '3']
            }}>
                <MemoryRouter>
                        <ProductCard
                            id='1'
                            brand='Armani'
                            price={50}
                            ratingStars={3}
                            ratingCount={2}
                        />
                        <ProductCard
                            id='2'
                            brand='Gucci'
                            price={60}
                            ratingStars={4}
                            ratingCount={8}
                            discount={{
                                percent: discountPercent
                            }}
                            discountPrice={discountPrice}
                            currency={discountCurrency}
                        />
                </MemoryRouter>
            </MockUserContext>
        )

        queryByText = renderResult.queryByText
        getByTestId = renderResult.getByTestId
    })

    it('should display price correctly', () => {
        expect(queryByText('50$')).not.toBeNull()
        expect(queryByText('60EUR')).not.toBeNull()
    })

    it('should display discount only if available', () => {
        expect(getByTestId('discount-1').innerHTML).toEqual('')
        expect(getByTestId('discount-2').innerHTML)
            .toMatch(new RegExp(`${discountPercent}%.+${discountPrice.toFixed(2)}${discountCurrency}`))
    })
})