import React from 'react'
import styles from './index.module.css'

import AdminProductCardsList from '../../components/adminProductCardsList'
import ProductsFilter from '../../components/productsFilter'
import Pagination from '../../components/pagination'
import SortCriteria from '../../components/sortCriteria'
import ProductsContextInitializer from '../../ProductsContextInitializer'
import { Link } from 'react-router-dom'
import PageWrapper from '../../components/pageWrapper'
import HeaderHome from '../../components/headerHome'

const AdminProductsPage = ({ pageLength }) => {
	return (
		<ProductsContextInitializer pageLength={pageLength}>
			<PageWrapper maxWidth='1600px'>
				<HeaderHome />
				<div className={styles.container}>
					<aside className={styles.filters}>
						<Link to="/admin/products/add"
							className={styles['add-product']} >Add Product</Link>
						<SortCriteria />
						<ProductsFilter />
					</aside>
					<main className={styles.cards}>
						<Pagination pageLength={pageLength} >
							<AdminProductCardsList />
						</Pagination>
					</main>
				</div>
			</PageWrapper>
		</ProductsContextInitializer>
	)
}

export default AdminProductsPage