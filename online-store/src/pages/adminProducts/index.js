import React from 'react'
import styles from './index.module.css'

import AdminProductCardsList from '../../components/adminProductCardsList'
import ProductsFilter from '../../components/productsFilter'
import Pagination from '../../components/pagination'
import SortCriteria from '../../components/sortCriteria'
import ProductsContextInitializer from '../../ProductsContextInitializer'
import { Link } from 'react-router-dom'

const PAGE_LENGTH = 12

const AdminProductsPage = () => {
	console.log(3)

	return (
		<div className={styles.container}>
			<ProductsContextInitializer pageLength={PAGE_LENGTH}>
				<aside className={styles.filters}>
					<Link to="/admin/products/add"
						  className={styles['add-product']} >Add Product</Link>
					<SortCriteria />
					<ProductsFilter />
				</aside>
				<main className={styles.cards}>
					<Pagination pageLength={PAGE_LENGTH} >
						<AdminProductCardsList />
					</Pagination>
				</main>
			</ProductsContextInitializer>
		</div>
	)
}

export default AdminProductsPage