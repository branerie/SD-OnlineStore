import React from 'react'
import { render, cleanup, fireEvent } from '@testing-library/react'

import MockProductsContext from '../test/mockProductsContext'
import ProductsCheckboxFilter from './index'

describe('ProductsChechboxFilter', () => {
    afterEach(cleanup)

    let queryByText, getByTestId
    beforeEach(() => {
        const renderResult = render(
            <MockProductsContext
                initialFilters={{ cat: { brand: ['Armani', 'Gucci'], categories: ['Shoes'] } }}
            >
                <ProductsCheckboxFilter
                    propName='brand'
                    title='Brand'
                    values={['Armani', 'D&G', 'Gucci', 'Louis Vitton']}
                />
            </MockProductsContext>
        )

        queryByText = renderResult.queryByText
        getByTestId = renderResult.getByTestId
    })

    it('should display correct title', () => {
        expect(queryByText('Brand')).not.toBeNull()
        expect(queryByText('Categories')).toBeNull()
    })

    it('should display correct options', () => {
        expect(queryByText('Armani')).not.toBeNull()
        expect(queryByText('D&G')).not.toBeNull()
        expect(queryByText('Gucci')).not.toBeNull()
        expect(queryByText('Louis Vitton')).not.toBeNull()
        expect(queryByText('Shoes')).toBeNull()
    })

    it('should display checkbox tick when clicked and no tick otherwise', () => {
        for (let brand of ['armani', 'gucci']) {
            const brandCheckbox = getByTestId(`brand-${brand}`)
            
            expect(brandCheckbox.checked).toEqual(true)
        }

        for (let brand of ['d&g', 'louis_vitton']) {
            const brandCheckbox = getByTestId(`brand-${brand}`)

            expect(brandCheckbox.checked).toEqual(false)
        }
    })

    it('should change checkbox state on click', () => {
        const clickedCheckbox = getByTestId('brand-armani')
        const unclickedCheckbox = getByTestId('brand-louis_vitton')

        fireEvent.click(clickedCheckbox)
        fireEvent.click(unclickedCheckbox)

        expect(clickedCheckbox.checked).toEqual(false)
        expect(unclickedCheckbox.checked).toEqual(true)

        fireEvent.click(clickedCheckbox)
        expect(clickedCheckbox.checked).toEqual(true)
    })
})