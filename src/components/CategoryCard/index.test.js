import React from 'react'
import { render, cleanup} from '@testing-library/react'
import CategoryCard from './index'
import { BrowserRouter } from 'react-router-dom'

describe('CategoryCard', () => {
    afterEach(cleanup)
    
    let queryByText, getByTestId
    beforeEach(() => {
        const src = 'Image'
        const name = 'Title'
        const href = '/product?id=123'
        const renderResult = render(<BrowserRouter>
                                            <CategoryCard src={src} name={name} href={href} />                                        
                                    </BrowserRouter>)

        queryByText = renderResult.queryByText
        getByTestId = renderResult.getByTestId
    })

    it('shows card src passed props', () => {
        expect(getByTestId('test-img')).toHaveAttribute('src', 'Image')        
    })

    it('shows card title passed props', () => {
       expect(queryByText('Title')).not.toBeNull()
    })

    it('shows card href passed props',() => {              
        expect(getByTestId('test-link')).toHaveAttribute('href', '/product?id=123')
    })
})