import React, { useCallback, useEffect, useState } from 'react'
import styles from './index.module.css'
import AdminProductCardsList from '../../components/adminProductCardsList'
import ProductsFilter from '../../components/productsFilter'
import { getProductRanges, getProductsPage } from '../../utils/product'
import Pagination from '../../components/pagination'

const PAGE_LENGTH = 3

const AdminProductsPage = () => {
	const [productProps, setProductProps] = useState(null)
	const [productPage, setProductPage] = useState(null)
	const [page, setPage] = useState(0)
	const [totalCount, setTotalCount] = useState(0)
	const [categoricalFilters, setCategoricalFilters] = useState({})
	const [rangeFilters, setRangeFilters] = useState({})
	const [boolFilters, setBoolFilters] = useState([])

	const getProductPropsRange = useCallback(async () => {
		const productPropRanges = await getProductRanges()
		setProductProps(productPropRanges)
	}, [setProductProps])

	const getCurrentProductsPage = useCallback(async (catFilters, rangeFilters, boolFilters, page) => {
		const { total, productInfo } = await getProductsPage(
			catFilters,
			rangeFilters,
			boolFilters,
			page,
			PAGE_LENGTH)

		setProductPage(productInfo)
		setTotalCount(total)
	}, [setProductPage, setTotalCount])

	useEffect(() => {
		getProductPropsRange()
	}, [getProductPropsRange])

	useEffect(() => {
		getCurrentProductsPage(categoricalFilters, rangeFilters, boolFilters, page)
	}, [getCurrentProductsPage, page, categoricalFilters, rangeFilters, boolFilters])

	useEffect(() => setPage(0), [categoricalFilters, rangeFilters, boolFilters])

	const handleCatFilterChange = (propName, values) => {
		const newActiveFilters = { ...categoricalFilters }

		if (values.length > 0) {
			newActiveFilters[propName] = values
		} else {
			delete newActiveFilters[propName]
		}

		setCategoricalFilters(newActiveFilters)
	}

	const handleRangeFilterChange = (propName, newValue) => {
		const newActiveFilters = { ...rangeFilters }

		newActiveFilters[propName] = newValue

		setRangeFilters(newActiveFilters)
	}

	const handleBoolFilterChange = (propName, isActivated) => {
		let newActiveFilters = [...boolFilters]

		if (isActivated) {
			newActiveFilters.push(propName)
		} else {
			newActiveFilters = newActiveFilters.filter(pn => pn !== propName)
		}

		setBoolFilters(newActiveFilters)
	}

	const handlePageChange = (newPage) => {
		setPage(newPage)
	}

	console.log(3)

	return (
		<>
			<div className={styles.container}>
				<ProductsFilter
					productProps={productProps}
					onCatChange={handleCatFilterChange}
					onRangeChange={handleRangeFilterChange}
					onBoolChange={handleBoolFilterChange} />
				<main className={styles.cards}>
					<AdminProductCardsList page={page} productPage={productPage} />
					<Pagination
						page={page}
						totalCount={totalCount}
						pageLength={PAGE_LENGTH}
						onChange={handlePageChange} />
				</main>
			</div>
		</>
	)
}

export default AdminProductsPage