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
  const [rangeFilters, setRangeFilters] = useState({})
  const [boolFilters, setBoolFilters] = useState([])

  const getProductPropsRange = useCallback(async () => {
    const productPropRanges = await getProductRanges()
    setProductProps(productPropRanges)
  }, [setProductProps])

  useEffect(() => {
    getProductPropsRange()
  }, [getProductPropsRange])

  const getCurrentProductsPage = useCallback(async (catFilters, rangeFilters, boolFilters, page) => {
    const productInfo = await getProductsPage(catFilters, rangeFilters, boolFilters, page)

    setProductPage(productInfo)
  }, [setProductPage])

  useEffect(() => {
    getCurrentProductsPage(categoricalFilters, rangeFilters, boolFilters, page)
  }, [getCurrentProductsPage, page, categoricalFilters, rangeFilters, boolFilters])

  const handleCatFilterChange = (propName, values) => {
    const newActiveFilters = {...categoricalFilters}

    if (values.length > 0) {
      newActiveFilters[propName] = values
    } else {
      delete newActiveFilters[propName]
    }

    setCategoricalFilters(newActiveFilters)
  }

  const handleRangeFilterChange = (propName, minValue, maxValue) => {
    const newActiveFilters = {...rangeFilters}

    newActiveFilters[propName] = {
      min: minValue,
      max: maxValue
    }

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