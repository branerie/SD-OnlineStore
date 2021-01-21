import React, { useContext, useState } from 'react'
import styles from './index.module.css'
import ProductsContext from '../../ProductsContext'
import ErrorContext from '../../ErrorContext'
import Input from '../input'

import { updateProductCategories } from '../../services/adminProduct'

const AdminCategories = (props) => {
    const [categories, setCategories] = useState(props.categories)
    const [category, setCategory] = useState('')
    const [categoryChanges, setCategoryChanges] = useState([])
    const productsContext = useContext(ProductsContext)
    const { addMessage } = useContext(ErrorContext)

    const editCategories = async (event, action) => {
        event.preventDefault()

        if (action === 'add') {
            setCategories([...categories, category])
        } else {
            setCategories(categories.filter(cat => cat !== category))
        }

        setCategoryChanges([
            ...categoryChanges,
            { action: action, value: category }
        ])
    }

    const handleSubmit = async (event) => {
        event.preventDefault()

        if (categoryChanges.length === 0) {
            return
        }

        const productId = props.id
        const updatedCategories = await updateProductCategories(productId, categoryChanges)
        if (updatedCategories.error) {
            addMessage(
                'Product Categories Update',
                'An error occurred while trying to update product categories.'
            )

            return
        }

        setCategoryChanges([])
        productsContext.updateFilters()
    }

    return (
        <form className={styles.container} onSubmit={handleSubmit}>
            <div>
                <span className={styles.title}>Product categories:</span>
                <span>
                    {categories.map(cat => `${cat}`).join(', ')}
                </span>
            </div>
            <Input
                type='text'
                label='Edit categories field'
                id='categories'
                placeholder='Shoes, Bags, T-shirts, Bathing suits, Dresses'
                onChange={e => setCategory(e.target.value)}
                maxLength='20'
                size='35'
            />
            <button
                className={styles.button}
                onClick={e => editCategories(e, 'add')}>
                    Add category
            </button>
            <button
                className={styles.button}
                onClick={(e) => editCategories(e, 'delete')}>
                    Remove category
            </button>
            <button type="submit">SAVE</button>
        </form>
    )
}

export default AdminCategories