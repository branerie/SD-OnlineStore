import React from 'react'
import { render, cleanup, fireEvent } from '@testing-library/react'
import CategoriesInput from './index'


describe('CategoriesInput', () => {
    afterEach(cleanup)
    
    const mokHandleAdd = jest.fn()
    const mokHandleRemove = jest.fn()
    let queryByText, getByText, result
    beforeEach(() => {
        const mokAddedCategories = ['one', 'two', 'three', 'four']
        const mokAllCategories = ['T-shirt', 'Bags', 'Shoes']
        const renderResult = render(<CategoriesInput
                                        addedCategories={mokAddedCategories}
                                        handleAdd={mokHandleAdd}
                                        handleRemove={mokHandleRemove}
                                        allCategories={mokAllCategories}
                                    />)

        queryByText = renderResult.queryByText
        getByText = renderResult.getByText
        result = renderResult.container
    })

    it('should be rendered selected categories', () => {
        expect(queryByText('one')).not.toBeNull()
        expect(queryByText('two')).not.toBeNull()
        expect(queryByText('three')).not.toBeNull()
        expect(queryByText('four')).not.toBeNull()
    })

    it('should be remove category', () => {
        const element = getByText('one')
        fireEvent.click(element)

        expect(mokHandleRemove).toHaveBeenCalledTimes(1)
    })

    it('should be added category', () => {
        const element = getByText('Bags')
        fireEvent.click(element)
        const elementToPress = getByText('Shoes')
        fireEvent.click(elementToPress)

        expect(mokHandleAdd).toHaveBeenCalledTimes(2)
    })

    it('should be arrange A-Z', () => {
        const optionArray = result.getElementsByTagName('option')
        
        expect(optionArray[0]).toHaveAttribute('value', 'Bags')
        expect(optionArray[1]).toHaveAttribute('value', 'Shoes')
        expect(optionArray[2]).toHaveAttribute('value', 'T-shirt')
    })
})