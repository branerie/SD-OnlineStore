import React from 'react'
import { render, cleanup, fireEvent } from '@testing-library/react'

import PaginationElement from './index'
import MockProductsContext from '../Test/MockProductsContext'

describe('PaginationElement', () => {
    afterEach(cleanup)

    it('should display page number correctly', () => {
        const { queryByText } = render(
            <MockProductsContext initialFilters={{ page: 2 }}>
                <PaginationElement pageNumber={36} />
            </MockProductsContext>
        )

        expect(queryByText('37')).not.toBeNull()
    })

    it('should be a link if a valid page which is not the current page', () => {
        const mockFiltersDispatch = jest.fn()
        const pageNumber = 36 

        const { getByTestId } = render(
            <MockProductsContext
                    initialFilters={{ page: 2 }}
                    initialFiltersDispatch={mockFiltersDispatch}
            >
                <PaginationElement pageNumber={pageNumber} />
            </MockProductsContext>
        )

        const element = getByTestId(`paginationElement-${pageNumber}`)
        fireEvent.click(element)

        expect(mockFiltersDispatch).toHaveBeenCalledTimes(1)
    })

    it('should not be a link if not a valid page or if it\'s the current page', () => {
        const mockFiltersDispatch = jest.fn()
        const pageNumber = 2
        const invalidPageNumber = '...'

        const { getByTestId } = render(
            <MockProductsContext
                    initialFilters={{ page: 2 }}
                    initialFiltersDispatch={mockFiltersDispatch}
            >
                <PaginationElement pageNumber={pageNumber} />
                <PaginationElement pageNumber={invalidPageNumber} />
            </MockProductsContext>
        )

        const pageElement = getByTestId(`paginationElement-${pageNumber}`)
        fireEvent.click(pageElement)

        const invalidPageElement = getByTestId(`paginationElement-${invalidPageNumber}`)
        fireEvent.click(invalidPageElement)

        expect(mockFiltersDispatch).not.toHaveBeenCalled()
    })
})