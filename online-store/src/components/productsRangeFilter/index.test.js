import React from 'react'
import { render, cleanup } from '@testing-library/react'

import ProductsContext from '../../ProductsContext'
import ProductsRangeFilter from './index'

describe('ProductsRangeFilter',  () => {
    afterEach(cleanup)

    let queryByText
    beforeEach(() => {
        const renderResult = render(
            <ProductsContext.Provider value={{
                filters: { range: { price: { min: 10, max: 100 }, age: { min: 18, max: 80 } } },
                filtersDispatch: () => {}
            }}>
                <ProductsRangeFilter min={10} max={100} propName='price' title='Price' />
            </ProductsContext.Provider>
        )

        queryByText = renderResult.queryByText
    })

    it('should display correct title', () => {
        expect(queryByText('Price')).not.toBeNull()
    })
})