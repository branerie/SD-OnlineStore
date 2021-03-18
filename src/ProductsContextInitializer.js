import React, { useCallback, useEffect, useReducer, useState } from 'react'
import ProductsContext from './ProductsContext'
import { getProductRanges, getProductsPage } from './services/product'
import { getProductsQueryString, filtersReducer, getInitialFilterValues } from './utils/product'
import { useAsyncError } from './hooks'

const ProductsContextInitializer = ({ children, pageLength }) => {
    const [productProps, setProductProps] = useState(null)
    const [productPage, setProductPage] = useState(null)
    const [totalCount, setTotalCount] = useState(0)
    const throwInternalError = useAsyncError()

    const [filters, filtersDispatch] = useReducer(filtersReducer, getInitialFilterValues())

    const getProductPropsRange = useCallback(async () => {
        const productPropRanges = await getProductRanges()
        if (productPropRanges.error) {
            throwInternalError()
        }

		setProductProps(productPropRanges)
	}, [setProductProps, throwInternalError])

	const getCurrentProductsPage = useCallback(async () => {
        const queryString = getProductsQueryString(filters)

        window.history.replaceState({}, null, `${window.location.pathname}?${queryString}`)

        const result = await getProductsPage(queryString, pageLength) 
        if (result.error) {
            throwInternalError()
        }

        const { total, productInfo } = result
        
		setProductPage(productInfo)
        setTotalCount(total)
    }, [setProductPage, setTotalCount, pageLength, filters, throwInternalError])

    useEffect(() => {
		getProductPropsRange()
    }, [getProductPropsRange])

	useEffect(() => {
		getCurrentProductsPage()
    }, [getCurrentProductsPage])

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