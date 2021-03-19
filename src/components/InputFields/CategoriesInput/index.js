import React, { useMemo, useState } from 'react'
import styles from './index.module.css'

const INITIAL_TEXT = '--- Add categories ---'

const CategoriesInput = ({ handleAdd, handleRemove, addedCategories, allCategories }) => {
    const [categories, setCategories] = useState(allCategories.filter(c => !addedCategories.includes(c)))

    const sortedCategories = useMemo(() => {
        if (categories) {
            return categories.sort((c1, c2) => {
                if (c1 === INITIAL_TEXT) {
                    return -1
                } 
                
                if (c2 === INITIAL_TEXT) {
                    return 1
                }

                return c1.localeCompare(c2)
            })
        }
    }, [categories])

    const handleCategoryAdd = category => {
        if (category === INITIAL_TEXT) {
            return
        }

        setCategories(categories.filter(cat => cat !== category))
        handleAdd(category)
    }

    const handleCategoryRemove = category => {
        setCategories([...categories, category])
        handleRemove(category)
    }

    return (
        <div className={styles.container}>
            <select
                className={styles.select}
                onClick={e => handleCategoryAdd(e.target.value)}>
                {categories && sortedCategories.map(cat => {
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
                            onClick={() => handleCategoryRemove(cat)}
                        >
                            {cat}
                        </span>
                    )
                })}
            </div>}
        </div>
    )
}

export default CategoriesInput