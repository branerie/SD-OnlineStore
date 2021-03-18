import React from 'react'
import { render, cleanup, fireEvent } from '@testing-library/react'

import Pagination from './index'
import MockProductsContext from '../Test/MockProductsContext'

describe('Pagination', () => {
    afterEach(cleanup)

    const mockFiltersDispatch = jest.fn()

    const renderPagination = (currentPage) => {
        return render(
            <MockProductsContext
                initialFilters={{ page: currentPage}}
                initialFiltersDispatch={mockFiltersDispatch}
                totalCount={20} 
            >
                <Pagination pageLength={3}>
                    <div>Something</div>
                </Pagination>
            </MockProductsContext>
        )
    }

    it('should display current page number correctly', () => {
        const currentPage = 3
        const { getByTestId } = renderPagination(currentPage)

        expect(getByTestId(`pagination-pageNumber`).textContent).toEqual(`page ${currentPage + 1}`)
    })

    it('should not display link to previous page if on first page', () => {
        const currentPage = 0
        const { getByTestId } = renderPagination(currentPage)

        expect(getByTestId('pagination-previous').className).toEqual('hidden')
    })

    it('should not display link to next page if on last page', () => {
        const currentPage = 6
        const { getByTestId } = renderPagination(currentPage)

        expect(getByTestId('pagination-next').className).toEqual('hidden')
    })

    it('should have valid links for previous and next page', () => {
        const currentPage = 3
        const { getByTestId } = renderPagination(currentPage)

        const previousLink = getByTestId('pagination-previous')
        const nextLink = getByTestId('pagination-next')

        fireEvent.click(previousLink)
        fireEvent.click(nextLink)

        expect(mockFiltersDispatch).toHaveBeenCalledTimes(2)
    })
})