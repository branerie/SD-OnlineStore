import React from 'react'
import { render, cleanup, fireEvent } from '@testing-library/react'

import MockProductsContext from '../test/mockProductsContext'
import ProductsBoolFilter from './index'

describe('ProductsBoolFilter', () => {
    afterEach(cleanup)

    let queryByText, getByTestId
    beforeEach(() => {
        const renderResult = render(
            <MockProductsContext
                initialFilters={{ bool: ['discount'] }}
            >
                <ProductsBoolFilter
                    propName='discount'
                    title='Discount'
                />
                <ProductsBoolFilter
                    propName='male'
                    title='Male'
                />
            </MockProductsContext>
        )

        queryByText = renderResult.queryByText
        getByTestId = renderResult.getByTestId
    })

    it('should display correct title', () => {
        expect(queryByText('Discount')).not.toBeNull()
        expect(queryByText('Gender')).toBeNull()
    })

    it('should display checkbox tick when clicked and no tick otherwise', () => {
        const clickedCheckbox = getByTestId('bool-discount')
        const unclickedCheckbox = getByTestId('bool-male')

        expect(clickedCheckbox.checked).toEqual(true)
        expect(unclickedCheckbox.checked).toEqual(false)
    })

    it('should change checkbox state on click', () => {
        const clickedCheckbox = getByTestId('bool-discount')
        const unclickedCheckbox = getByTestId('bool-male')

        fireEvent.click(clickedCheckbox)
        fireEvent.click(unclickedCheckbox)

        expect(clickedCheckbox.checked).toEqual(false)
        expect(unclickedCheckbox.checked).toEqual(true)

        fireEvent.click(clickedCheckbox)
        expect(clickedCheckbox.checked).toEqual(true)
    })
})