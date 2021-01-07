import React from 'react'
import { render, cleanup } from '@testing-library/react'

import NavbarLink from './index'
import { MemoryRouter } from 'react-router-dom'

describe('NavbarLink', () => {
    afterEach(cleanup)

    it('should display link correctly', () => {
        const { queryByText } = render(
            <MemoryRouter>
                <NavbarLink path='/products/new' name='Products' />
            </MemoryRouter>
        )

        expect(queryByText('Products')).not.toBeNull()

        const aTag = document.getElementsByTagName('a')[0]
        if (!aTag) {
            throw new Error()
        }

        const fullExpectedHref = document.location.origin + '/products/new'
        expect(aTag.href).toEqual(fullExpectedHref)
    })
})