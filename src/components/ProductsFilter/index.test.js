import React from 'react'
import { render, cleanup } from '@testing-library/react'

import ProductsFilter from './index'
import ProductsContext from '../../ProductsContext'

describe('ProductsFilter', () => {
    afterEach(cleanup)

    let totalCount = 20
    let queryByText, productPage
    beforeEach(() => {
        productPage = [
            { brand: 'Armani' },
            { brand: 'Gucci' },
            { brand: 'Gucci' },
            { brand: 'Gucci' },
        ]

        const renderResult = render(
            <ProductsContext.Provider
                value={{ 
                    filters: {
                        cat: {
                            brand: 'Armani'
                        },
                        range: {
                            price: {
                                min: 10,
                                max: 100
                            }
                        }
                    },
                    productProps: {
                        categories: ['Shoes', 'Dresses'],
                        brand: ['Armani', 'Gucci'],
                        sizes: ['M', 'L', 'XL'],
                        minPrice: 10,
                        maxPrice: 100
                    },
                    productPage: productPage,
                    totalCount: totalCount
                }}
            >
                <ProductsFilter />
            </ProductsContext.Provider>
        )

        queryByText = renderResult.queryByText
    })

    it('should display correct product count message', () => {
        expect(queryByText(`Showing ${productPage.length} of ${totalCount} results`)).not.toBeNull()
    })
})