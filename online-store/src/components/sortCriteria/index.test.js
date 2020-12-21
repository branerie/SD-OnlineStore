import React from 'react'
import { render, cleanup, fireEvent } from '@testing-library/react'

import SortCriteria from './index'

describe('SortCriteria', () => {
    afterEach(cleanup)

    it('does not show options before click', () => {
        const { queryByText } = render(<SortCriteria />)

        expect(queryByText('Newest Arrivals')).toBeNull()
        expect(queryByText('Price: Low to High')).toBeNull()
        expect(queryByText('Price: High to Low')).toBeNull()
        expect(queryByText('Bigger Discount')).toBeNull()
    })

    it('shows options on click', () => {
        const { getByText, queryByText } = render(<SortCriteria />)

        const sortCriteriaButton = getByText('Sort by')
        fireEvent.click(sortCriteriaButton)

        expect(queryByText('Newest Arrivals')).not.toBeNull()
        expect(queryByText('Price: Low to High')).not.toBeNull()
        expect(queryByText('Price: High to Low')).not.toBeNull()
        expect(queryByText('Bigger Discount')).not.toBeNull()
    })
})