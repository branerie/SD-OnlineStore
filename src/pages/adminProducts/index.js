import React, { useCallback, useState } from 'react'
import styles from './index.module.css'

import AdminProductCardsList from '../../components/adminProductCardsList'
import ProductsFilter from '../../components/productsFilter'
import Pagination from '../../components/pagination'
import SortCriteria from '../../components/sortCriteria'
import ProductsContextInitializer from '../../ProductsContextInitializer'
import PageWrapper from '../../components/pageWrapper'
import Header from '../../components/header'
import SubmitButton from '../../components/submitButton'
import AddProductWindow from '../../components/addProductWindow'
import NavButtons from '../../components/navButtons'

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