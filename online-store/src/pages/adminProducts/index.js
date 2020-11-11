import React, { useCallback, useEffect, useState } from 'react'
import styles from './index.module.css'
import AdminProductCardsList from '../../components/adminProductCardsList'
import ProductsFilter from '../../components/productsFilter'
import { getProductRanges, getProductsPage } from '../../utils/product'

const AdminProductsPage = () => {
  const [productProps, setProductProps] = useState(null)
  const [productPage, setProductPage] = useState(null)
  const [page, setPage] = useState(0)
  const [categoricalFilters, setCategoricalFilters] = useState({})
  const [rangeFilters, setRangelFilters] = useState({})
  const [boolFilters, setBoolFilters] = useState({})

  const getProductPropsRange = useCallback(async () => {
    const productPropRanges = await getProductRanges()
    setProductProps(productPropRanges)
  }, [setProductProps])

  useEffect(() => {
    getProductPropsRange()
  }, [getProductPropsRange])

  const currentProductDb = useCallback(async (filters, page) => {
    const productInfo = await getProductsPage(filters, page)

    setProductPage(productInfo)
  }, [setProductPage])

  useEffect(() => {
    currentProductDb(categoricalFilters, rangeFilters, boolFilters, page)
  }, [currentProductDb, page, categoricalFilters, rangeFilters, boolFilters])

  const handleCatFilterChange = (event) => {
    const propName = event.target.attributes['data-prop-name'].value
    const propValue = event.target.value
    const isChecked = event.target.checked

    const newActiveFilters = {...categoricalFilters}

    const propFilters = newActiveFilters[propName]
    if (isChecked) {
      if (!propFilters) {
        newActiveFilters[propName] = [ propValue ]
      } else {
        propFilters.push(propValue)
      }
    } else {
      if (propFilters) {
        newActiveFilters[propName] = propFilters.filter(f => f !== propValue)

        if (propFilters.length === 0) {
          newActiveFilters[propName] = null
        }
      }
    }

    setCategoricalFilters(newActiveFilters)
  }

  const handleRangeFilterChange = (event) => {

  }

  const handleBoolFilterChange = (event) => {
    
  }

  const handleProductCardsChange = (event) => {

  }

  return (
    <div className={styles.container}>
      <ProductsFilter
          productProps={productProps}
          onCatChange={handleCatFilterChange}
          onRangeChange={handleRangeFilterChange}
          onBoolChange={handleBoolFilterChange} />
      <AdminProductCardsList page={page} productPage={productPage} onChange={handleProductCardsChange} />
    </div>
  )

}

export default AdminProductsPage