import React from 'react'
import { render, cleanup } from '@testing-library/react'
import FooterItem from './index'

describe('FooterItem', () => {
    afterEach(cleanup)

    it('shows passed props', () => {
        const mockPropsText = 'Contact us'
        const mockChildText = 'About us'
        const { queryByText } = render(<FooterItem text={mockPropsText} >{mockChildText}</FooterItem>)

        expect(queryByText('Contact us')).not.toBeNull()
        expect(queryByText('About us')).toBeNull()
    })

    it('shows paased child', () => {
        const { queryByText } = render(<FooterItem>About us</FooterItem>)
        
        expect(queryByText('About us')).not.toBeNull()
        expect(queryByText('Contact us')).toBeNull()
    })
})