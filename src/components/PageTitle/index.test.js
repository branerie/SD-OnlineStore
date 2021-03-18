import React from 'react'
import { render, cleanup } from '@testing-library/react'

import PageTitle from './index'

describe('PageTitle', () => {
    it('should display passed title', () => {
        const { queryByText } = render(
            <PageTitle title='Some title' />
        )

        expect(queryByText('Some title')).not.toBeNull()

        cleanup()
    })
})