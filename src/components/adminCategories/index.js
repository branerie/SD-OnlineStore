import React, { useCallback, useContext, useState } from 'react'
import styles from './index.module.css'
import ProductsContext from '../../ProductsContext'
import ErrorContext from '../../ErrorContext'

import { updateProductCategories } from '../../services/adminProduct'
import CategoriesInputWrapper from '../inputFields/categoriesInputWrapper'
import SubmitButton from '../submitButton'

const AdminCategories = ({ initialCategories, productId }) => {
    const [categories, setCategories] = useState(initialCategories)
    const [categoryChanges, setCategoryChanges] = useState([])
    const { updateFilters } = useContext(ProductsContext)
    const { addMessage } = useContext(ErrorContext)

    const handleAdd = useCallback(category => {
        setCategories([...categories, category])

        if (categoryChanges.find(ch => ch.value === category)) {
            // category was previously removed, so if we're adding it, we can simply remove the change
            return setCategoryChanges(categoryChanges.filter(c => c.value !== category))
        }

        setCategoryChanges([ ...categoryChanges, { action: 'add', value: category } ])
    }, [categories, categoryChanges])

    const handleRemove = useCallback(category => {
        setCategories(categories.filter(c => c !== category))

        if (categoryChanges.find(ch => ch.value === category)) {
            // category was previously added, so if we're removing it, we can simply remove the change
            return setCategoryChanges(categoryChanges.filter(c => c.value !== category))
        }

        setCategoryChanges([ ...categoryChanges, { action: 'delete', value: category } ])
    }, [categories, categoryChanges])

    const handleSubmit = useCallback(async (event) => {
        event.preventDefault()

        if (categoryChanges.length === 0) {
            return
        }

        if (categories.length === 0) {
            return addMessage(
                'Product Categories Empty Update',
                'Products must have at least one category'
            )
        }

        const updatedCategories = await updateProductCategories(productId, categoryChanges)
        if (updatedCategories.error) {
            addMessage(
                'Product Categories Update',
                'An error occurred while trying to update product categories.'
            )

            return
        }

        setCategoryChanges([])
        updateFilters()
    }, [updateFilters, categoryChanges, categories])

    return (
        <>
        <CategoriesInputWrapper
            addedCategories={categories}
            handleAdd={handleAdd}
            handleRemove={handleRemove}
        />
        <SubmitButton text='SAVE SIZES' onClick={handleSubmit} disabled={categoryChanges.length === 0} />
        </>
    )
}

export default AdminCategories