import React from 'react'
import { render, cleanup } from '@testing-library/react'
import FooterTitle from './index'

describe('FooterTitle', () => {
    afterEach(cleanup)

    it('shows footer title passed props', () => {
        const mockTitle = 'Hello title'
        const { queryByText } = render(<FooterTitle title={mockTitle} />)

        expect(queryByText('Hello title')).not.toBeNull()
    })
})