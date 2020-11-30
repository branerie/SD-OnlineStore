import React, { useCallback, useEffect, useMemo, useState } from 'react'
import styles from './index.module.css'
import { getCategories } from '../../../services/product'

const CategoriesInput  = () => {
    const [categories, setCategories] = useState(null)

    const getAllCategories = useCallback(async () => {
        const result = await getCategories()
        setCategories(result.categories)
    })

    useEffect(() => {
        getAllCategories()
    }, [])

    return (
        <select>
            {categories && categories.map(cat => {
                return <option key={cat}>{cat}</option>
            })}
        </select>
    )
}

export default CategoriesInput