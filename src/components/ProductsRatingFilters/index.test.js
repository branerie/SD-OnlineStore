import React from 'react'
import { render, cleanup, fireEvent } from '@testing-library/react'

import MockProductsContext from '../Test/MockProductsContext'
import ProductsRatingFilters from './index'

describe('ProductsRatingFilters',  () => {
    afterEach(cleanup)

    let queryByText, getByTestId
    beforeEach(() => {
        const renderResult = render(
            <MockProductsContext
                initialFilters={{ cat: { rating: [4, 5] } }}
            >
                <ProductsRatingFilters propName='rating' />
            </MockProductsContext>
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

    it('should change checkbox state when clicked', () => {
        const clickedCheckbox = getByTestId('rating-5')
        const unclickedCheckbox = getByTestId('rating-1')

        fireEvent.click(clickedCheckbox)
        fireEvent.click(unclickedCheckbox)

        expect(clickedCheckbox.checked).toEqual(false)
        expect(unclickedCheckbox.checked).toEqual(true)
    })
})