import React from 'react'
import { render, cleanup } from '@testing-library/react'

import ProductsContext from '../../ProductsContext'
import ProductsRatingFilters from './index'

describe('ProductsRatingFilters',  () => {
    afterEach(cleanup)

    let queryByText, getByTestId
    beforeEach(() => {
        const renderResult = render(
            <ProductsContext.Provider value={{
                filters: { cat: { rating: [4, 5] } },
                filtersDispatch: () => {}
            }}>
                <ProductsRatingFilters propName='rating' />
            </ProductsContext.Provider>
        )

        queryByText = renderResult.queryByText
        getByTestId = renderResult.getByTestId
    })

    it('should display selected and unselected rating filters correctly', () => {
        for (let ratingStar of [4, 5]) {
            const ratingInput = getByTestId(`rating-${ratingStar}`)

            expect(ratingInput.checked).toEqual(true)
        }

        for (let ratingStar of [1, 2, 3]) {
            const ratingInput = getByTestId(`rating-${ratingStar}`)

            expect(ratingInput.checked).toEqual(false)
        }
    })
})