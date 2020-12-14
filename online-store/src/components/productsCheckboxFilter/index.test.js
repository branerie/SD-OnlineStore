import React from 'react'
import { render, cleanup } from '@testing-library/react'

import ProductsContext from '../../ProductsContext'
import ProductsCheckboxFilter from './index'

describe('ProductsChechboxFilter', () => {
    afterEach(cleanup)

    let queryByText, getByTestId
    beforeEach(() => {
        const renderResult = render(
            <ProductsContext.Provider value={{ 
                filters: { cat: { brand: ['Armani', 'Gucci'], categories: ['Shoes'] } },
                filtersDispatch: () => {}
            }}>
                <ProductsCheckboxFilter
                    propName='brand'
                    title='Brand'
                    values={['Armani', 'D&G', 'Gucci', 'Louis Vitton']}
                />
            </ProductsContext.Provider>
        )

        queryByText = renderResult.queryByText
        getByTestId = renderResult.getByTestId
    })

    it('should display correct title', () => {
        expect(queryByText('Brand')).not.toEqual(null)
        expect(queryByText('Categories')).toEqual(null)
    })

    it('should display correct options', () => {
        expect(queryByText('Armani')).not.toEqual(null)
        expect(queryByText('D&G')).not.toEqual(null)
        expect(queryByText('Gucci')).not.toEqual(null)
        expect(queryByText('Louis Vitton')).not.toEqual(null)
        expect(queryByText('Shoes')).toEqual(null)
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
})