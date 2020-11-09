import React from 'react'
import styles from './index.module.css'
import AdminAside from '../../components/asideProductsFilter'
import ProductCardsList from '../../components/productCardsList'

const AdminProductsPage = () => {
  return (
    <div className={styles.container}>
      <AdminAside />
      <ProductCardsList />
    </div>
  )
  
}

export default AdminProductsPage