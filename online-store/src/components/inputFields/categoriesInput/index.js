import React, { useCallback, useEffect, useState } from 'react'
import styles from './index.module.css'
import { getCategories } from '../../../services/product'

const INITIAL_TEXT = '--- Add categories ---'

const CategoriesInput = ({ handleAdd, handleRemove, addedCategories }) => {
    const [categories, setCategories] = useState(null)

    const getAllCategories = useCallback(async () => {
        const result = await getCategories()
        setCategories([INITIAL_TEXT, ...result.categories])
    }, [])

    useEffect(() => {
        getAllCategories()
    }, [getAllCategories])

    const getSortedCategories = useCallback(() => {
        if (categories) {
            return categories.sort((c1, c2) => {
                if (c1 === INITIAL_TEXT) {
                    return -1
                } else if (c2 === INITIAL_TEXT) {
                    return 1
                }

                return c1.localeCompare(c2)
            })
        }
    }, [categories])

    const handleCategoryAdd = useCallback(category => {
        if (category === INITIAL_TEXT) {
            return
        }

        setCategories(categories.filter(cat => cat !== category))
        handleAdd(category)
    }, [handleAdd, categories])

    const handleCategoryRemove = useCallback(category => {
        setCategories([...categories, category])
        handleRemove(category)
    }, [handleRemove, categories])

    return (
        <div className={styles.container}>
            <select
                className={styles.select}
                onClick={e => handleCategoryAdd(e.target.value)}>
                {categories && getSortedCategories().map(cat => {
                    return (
                        <option key={cat} value={cat}>
                            {cat}
                        </option>
                    )
                })}
            </select>
            {<div className={styles['cat-container']}>
                {addedCategories.map(cat => {
                    return (
                        <span
                            key={cat}
                            className={styles.category} 
                            onClick={() => handleCategoryRemove(cat)}>{cat}</span>
                    )
                })}
            </div>}
        </div>
    )
}

export default CategoriesInput