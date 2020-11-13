import React from 'react'

const ProductFilterContext = React.createContext({
    handleCatFilterChange: null,
    handleRangeFilterChange: null,
    handleBoolFilterChange: null
})

export default ProductFilterContext