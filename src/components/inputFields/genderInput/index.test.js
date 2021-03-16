import React from 'react'
import { render, cleanup, fireEvent } from '@testing-library/react'
import GenderInput from './index'

describe('GenderInput', () => {
    afterEach(cleanup)

    const mockOnChange = jest.fn()
    let getByTestId,queryByText,queryByTestId
    beforeEach(() => {
        const mockCurrentGender = 'M'
        const renderResult = render(<GenderInput
                                        currentGender={mockCurrentGender}
                                        onChange={mockOnChange}
                                    />)
        getByTestId = renderResult.getByTestId
        queryByText = renderResult.queryByText
        queryByTestId = renderResult.queryByTestId
    })

    it('shoulde render all 2 radio buttons', () => {
        expect(queryByText('Male')).not.toBeNull()
        expect(queryByText('Female')).not.toBeNull()
    })

    it('correct checked radio button', () => {
        expect(getByTestId('gender-male')).toHaveProperty('checked', true)
    })

    it('radio button works', () => {
        const clickedButton = getByTestId('gender-female')
        fireEvent.click(clickedButton)

        expect(mockOnChange).toHaveBeenCalledTimes(1)
    })


})