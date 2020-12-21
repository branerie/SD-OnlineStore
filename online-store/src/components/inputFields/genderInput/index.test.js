import React from 'react'
import { render, cleanup, fireEvent } from '@testing-library/react'
import GenderInput from './index'

describe('GenderInput', () => {
    afterEach(cleanup)

    const mokOnChange = jest.fn()
    let getByTestId,queryByText,queryByTestId
    beforeEach(() => {
        const mokCurrentGender = 'M'
        const renderResult = render(<GenderInput
                                        currentGender={mokCurrentGender}
                                        onChange={mokOnChange}
                                    />)
        getByTestId = renderResult.getByTestId
        queryByText = renderResult.queryByText
        queryByTestId = renderResult.queryByTestId
    })

    it('shoulde be render all 3 radio button', () => {
        expect(queryByText('Male')).not.toBeNull()
        expect(queryByText('Female')).not.toBeNull()
        expect(queryByText('Unspecified')).not.toBeNull()
    })

    it('correct checked radio button', () => {
        expect(getByTestId('gender-male')).toHaveProperty('checked', true)
    })

    it('radio button works', () => {
        const clickedButton = getByTestId('gender-female')
        fireEvent.click(clickedButton)

        expect(mokOnChange).toHaveBeenCalledTimes(1)
    })


})