import React, { useState } from 'react'
import ProductsContext from '../../contexts/ProductsContext'
import { filtersReducer } from '../../utils/product'

const MockProductsContext = ({ initialFilters, initialFiltersDispatch, totalCount, children }) => {
    const [filters, setFilters] = useState({...initialFilters})

    const filtersDispatch = initialFiltersDispatch 
        ? initialFiltersDispatch
        : (action) => { setFilters(filtersReducer(filters, action)) }

    return (
        <ProductsContext.Provider value={{
            filters,
            filtersDispatch,
            totalCount
        }}>
            {children}
        </ProductsContext.Provider>
    )
}

export default MockProductsContext