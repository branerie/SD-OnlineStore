import React from 'react'

const ProductsContext = React.createContext({
    productProps: null,
    productPage: null,
    page: 0,
    totalCount: 0,
    filters: null,
    filtersDispatch: () => {},
    handlePageChange: () => {},
    handleProductDelete: () => {}
})

export default ProductsContext