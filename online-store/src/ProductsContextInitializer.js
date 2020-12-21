import React, { useCallback, useEffect, useReducer, useState } from 'react'
import ProductsContext from './ProductsContext'
import { getProductRanges, getProductsPage } from './services/product'
import { parseQueryString, getProductsQueryString, filtersReducer } from './utils/product'

const ProductsContextInitializer = ({ children, pageLength }) => {
    const [productProps, setProductProps] = useState(null)
    const [productPage, setProductPage] = useState(null)
    const [totalCount, setTotalCount] = useState(0)

    const [filters, filtersDispatch] = useReducer(filtersReducer, getFiltersFromQuery())

    const getProductPropsRange = useCallback(async () => {
        const productPropRanges = await getProductRanges()
        if (productPropRanges.error) {
            //TODO: Handle errors
        }

		setProductProps(productPropRanges)
	}, [setProductProps])

	const getCurrentProductsPage = useCallback(async () => {
        const queryString = getProductsQueryString(filters)

        window.history.replaceState({}, null, `${window.location.pathname}?${queryString}`)

        const result = await getProductsPage(queryString, pageLength) 
        if (result.error) {
            //TODO: Handle errors
        }

        const { total, productInfo } = result
        
		setProductPage(productInfo)
        setTotalCount(total)
    }, [setProductPage, setTotalCount, pageLength, filters])

    useEffect(() => {
		getProductPropsRange()
    }, [getProductPropsRange])

	useEffect(() => {
		getCurrentProductsPage()
    }, [getCurrentProductsPage, filters])

    function getFiltersFromQuery() {
        const parsedQuery = parseQueryString(window.location.search)
        const { bool, cat, rng: range, searchTerm, sort, page } = parsedQuery

        return {
            bool: bool || [],
            cat: cat || {},
            range: range || {},
            search: searchTerm || '',
            page: parseInt(page) || 0,
            sort: (sort && sort.split(',')) || ['addDate', 'desc']
        }
    }

    const handleProductDelete = (productId) => {
        const newProductsList = productPage.filter(p => p.id !== productId)
        setProductPage(newProductsList)
    }

    return (
        <ProductsContext.Provider value={{
            productProps,
            productPage,
            totalCount,
            filters,
            filtersDispatch,
            handleProductDelete,
            updateFilters: getProductPropsRange,
            updateProductsPage: getCurrentProductsPage,
        }}>
            {children}
        </ProductsContext.Provider>
    )
}

export default ProductsContextInitializer