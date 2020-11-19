import React from 'react'
import styles from './index.module.css'

import AdminProductCardsList from '../../components/adminProductCardsList'
import ProductsFilter from '../../components/productsFilter'
import Pagination from '../../components/pagination'
import ProductsContextInitializer from '../../ProductsContextInitializer'

const PAGE_LENGTH = 3

const AdminProductsPage = () => {
	console.log(3)

	return (
		<div className={styles.container}>
			<ProductsContextInitializer pageLength={PAGE_LENGTH}>
				<ProductsFilter />
				<main className={styles.cards}>
					<AdminProductCardsList />
					<Pagination pageLength={PAGE_LENGTH} />
				</main>
			</ProductsContextInitializer>
		</div>
	)
}

export default AdminProductsPage