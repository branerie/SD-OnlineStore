import React from 'react'
import { render, cleanup, fireEvent } from '@testing-library/react'

import SortCriteria from './index'

describe('SortCriteria', () => {
    afterEach(cleanup)

    it('does not show options before click', () => {
        const { queryByText } = render(<SortCriteria />)

        expect(queryByText('Newest Arrivals')).toEqual(null)
        expect(queryByText('Price: Low to High')).toEqual(null)
        expect(queryByText('Price: High to Low')).toEqual(null)
        expect(queryByText('Bigger Discount')).toEqual(null)
    })

    it('shows options on click', () => {
        const { getByText, queryByText } = render(<SortCriteria />)

        const sortCriteriaButton = getByText('Sort by')
        fireEvent.click(sortCriteriaButton)

        expect(queryByText('Newest Arrivals')).not.toEqual(null)
        expect(queryByText('Price: Low to High')).not.toEqual(null)
        expect(queryByText('Price: High to Low')).not.toEqual(null)
        expect(queryByText('Bigger Discount')).not.toEqual(null)
    })
})