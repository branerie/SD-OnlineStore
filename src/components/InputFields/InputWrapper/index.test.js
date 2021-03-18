import React from 'react'
import { render, cleanup } from '@testing-library/react'
import InputWrapper from './index'

describe('InputWrapper', () => {
    afterEach(cleanup)
    
    it('placeholder should be appear && should be passed props', () => {
        const mokChildren = <div>Hello</div>
        const mokIsVisible = true
        const mokPlaceholder = 'Description'
        const { queryByText } = render(<InputWrapper
                                        children={mokChildren}
                                        isVisible={mokIsVisible}
                                        placeholder={mokPlaceholder}
                                    />)
        expect(queryByText('Description')).not.toBeNull()
    })
})