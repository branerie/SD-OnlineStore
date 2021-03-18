import React from 'react'
import { render, cleanup } from '@testing-library/react'

import RatingStar from './index'

describe('RatingStar', () => {
    afterEach(cleanup)

    it('shows rating star counter correctly', () => {
        const mockRatingCounter = 5
        const { getByTestId } = render(<RatingStar ratingCounter={mockRatingCounter} />)

        const counterQuery = getByTestId('counter')
        expect(counterQuery.innerHTML).toEqual(`(${mockRatingCounter})`)
    })
})