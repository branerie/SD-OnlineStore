import React, { useContext, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import ProductsContext from '../../ProductsContext'
import { parseQueryString } from '../../utils/url'

const ProductsPageWrapper = ({ children }) => {
    const { search } = useLocation()
    const { filtersDispatch } = useContext(ProductsContext)

    useEffect(() => {
        const query = parseQueryString(search)
        const filters = {
            cat: query.cat || {},
            range: query.range || {},
            bool: query.bool || [],
            sort: ['addDate', 'desc']
        }

        filtersDispatch({ type: 'reset', resetValue: filters })
    }, [search, filtersDispatch])

    return <>{children}</>
}

export default ProductsPageWrapper