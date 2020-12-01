import React, { useCallback, useEffect, useReducer, useState } from 'react'
import ProductsContext from './ProductsContext'
import { getProductRanges, getProductsPage } from './services/product'
import { getProductsQueryString } from './utils/product'

const ProductsContextInitializer = ({ children, pageLength, initialFilters, initialPage }) => {
    const [productProps, setProductProps] = useState(null)
    const [productPage, setProductPage] = useState(null)
    const [page, setPage] = useState(initialPage || 0)
    const [totalCount, setTotalCount] = useState(0)
    
    const filtersState = initialFilters || {
        cat: {},
        range: {},
        bool: [],
        sort: ['addDate', 'desc']
    }

    const [filters, filtersDispatch] = useReducer(filtersReducer, filtersState)

    const getProductPropsRange = useCallback(async () => {
		const productPropRanges = await getProductRanges()
		setProductProps(productPropRanges)
	}, [setProductProps])

	const getCurrentProductsPage = useCallback(async () => {
        const queryString = getProductsQueryString(
			filters.cat,
			filters.range,
            filters.bool,
            filters.sort,
            page,
            pageLength) 

		const { total, productInfo } = await getProductsPage(queryString) 
        
        window.history.pushState({}, null, `${window.location.pathname}?${queryString}`)
		setProductPage(productInfo)
        setTotalCount(total)
    }, [setProductPage, setTotalCount, pageLength, filters, page])

	useEffect(() => {
		getProductPropsRange()
    }, [getProductPropsRange, setProductPage])

	useEffect(() => {
		getCurrentProductsPage()
	}, [getCurrentProductsPage, page, filters])

    useEffect(() => setPage(0), [filters])

    function filtersReducer(state, action) {
        const propName = action.propName
        
        switch (action.type) {
            case 'cat':
                const newCategoricalFilters = { ...state.cat }

                if (action.values.length > 0) {
                    newCategoricalFilters[propName] = action.values
                } else {
                    delete newCategoricalFilters[propName]
                }

                return {...state, cat: newCategoricalFilters }
            case 'range':
                const newRangeFilters = { ...state.range }
                newRangeFilters[propName] = action.value

                return {...state, range: newRangeFilters}
            case 'bool':
                let newBoolFilters = [...state.bool]

                if (action.isActivated) {
                    newBoolFilters.push(propName)
                } else {
                    newBoolFilters = newBoolFilters.filter(pn => pn !== propName)
                }

                return {...state, bool: newBoolFilters}
            case 'sort':
                return {...state, sort: [action.property , action.direction]}
            case 'reset':
                return action.resetValue
            default:
                return state
        }
    }

    const handlePageChange = (newPage) => {
        setPage(newPage)
    }

    const handleProductDelete = (productId) => {
        const newProductsList = productPage.filter(p => p.id !== productId)
        setProductPage(newProductsList)
    }

    return (
        <ProductsContext.Provider value={{
            productProps,
            productPage,
            page,
            totalCount,
            filters,
            filtersDispatch,
            handlePageChange,
            handleProductDelete,
            updateFilters: getProductPropsRange,
            updateProductsPage: getCurrentProductsPage
        }}>
            {children}
        </ProductsContext.Provider>
    )
}

export default ProductsContextInitializer