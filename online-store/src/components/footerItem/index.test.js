import React from 'react'
import { render, cleanup } from '@testing-library/react'
import FooterItem from './index'

describe('FooterItem', () => {
    afterEach(cleanup)

    it('shows passed props', () => {
        const mockPropsText = 'Contact us'
        const mockChildText = 'About us'
        const { queryByText } = render(<FooterItem text={mockPropsText} >About us</FooterItem>)

        expect(queryByText('Contact us')).not.toEqual(null)
        expect(queryByText('About us')).toEqual(null)
    })

    it('shows paased child', () => {
        const mockChildText = 'About us'
        const { queryByText } = render(<FooterItem>About us</FooterItem>)
        
        expect(queryByText('About us')).not.toEqual(null)
        expect(queryByText('Contact us')).toEqual(null)
    })
})