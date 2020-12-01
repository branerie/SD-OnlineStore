import React, { useCallback, useEffect, useState } from 'react'
import styles from './index.module.css'
import { getCategories } from '../../../services/product'

const CategoriesInput = ({ handleAdd, handleRemove, addedCategories }) => {
    const [categories, setCategories] = useState(null)

    const getAllCategories = useCallback(async () => {
        const result = await getCategories()
        setCategories(result.categories)
    })

    useEffect(() => {
        getAllCategories()
    }, [])

    useEffect(() => {
        if (categories) {
            setCategories(categories.sort((c1, c2) => c1.localeCompare(c2)))
        }
    }, [categories])

    const handleCategoryAdd = useCallback(category => {

        setCategories(categories.filter(cat => cat !== category))
        handleAdd(category)
    })

    const handleCategoryRemove = useCallback(category => {
        setCategories([...categories, category])
        handleRemove(category)
    })

    return (
        <div className={styles.container}>
            <select className={styles.select}>
                {categories && categories.sort((c1, c2) => c1.localeCompare(c2)).map(cat => {
                    return (
                        <option key={cat} value={cat} onClick={e => handleCategoryAdd(e.target.value)}>
                            {cat}
                        </option>
                    )
                })}
            </select>
            {<div className={styles['cat-container']}>
                {addedCategories.map(cat => {
                    return (
                        <span className={styles.category} onClick={() => handleCategoryRemove(cat)}>{cat}</span>
                    )
                })}
            </div>}
        </div>
    )
}

export default CategoriesInput