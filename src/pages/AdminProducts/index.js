import React, { useCallback, useState } from 'react'
import styles from './index.module.css'

import AdminProductCardsList from '../../components/AdminProductCardsList'
import ProductsFilter from '../../components/ProductsFilter'
import Pagination from '../../components/Pagination'
import SortCriteria from '../../components/SortCriteria'
import ProductsContextInitializer from '../../contexts/ProductsContextInitializer'
import PageWrapper from '../../components/PageWrapper'
import Header from '../../components/Header'
import SubmitButton from '../../components/SubmitButton'
import AddProductWindow from '../../components/AddProductWindow'
import NavButtons from '../../components/NavButtons'

const AdminProductsPage = ({ pageLength }) => {
	const [shownWindow, setShownWindow] = useState(null)

	const hideWindow = useCallback(() => setShownWindow(null), [])

	return (
		<ProductsContextInitializer pageLength={pageLength}>
			<PageWrapper maxWidth='1600px'>
				<Header />
				<div className={styles.container}>
					<aside className={styles.filters}>
						<ProductsFilter />
					</aside>
					<main className={styles.cards}>
						<div className={styles.nav}>
							<SubmitButton text='Add Product' onClick={() => setShownWindow('add')} />
							<NavButtons />
						</div>
						<Pagination pageLength={pageLength} >
							<div className={styles['sort-position']}>
								<SortCriteria />
							</div>
							<AdminProductCardsList />
						</Pagination>
					</main>
				</div>
			</PageWrapper>
			{ shownWindow === 'add' && <AddProductWindow hideWindow={hideWindow} /> }
		</ProductsContextInitializer>
	)
}

export default AdminProductsPage