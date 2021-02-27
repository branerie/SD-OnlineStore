import React, { useCallback, useEffect, useState } from 'react'
import { getCategories } from '../../../services/product'
import CategoriesInput from '../categoriesInput'

const INITIAL_TEXT = '--- Add categories ---'

const CategoriesInputWrapper = ({ handleAdd, handleRemove, addedCategories }) => {
    const [allCategories , setAllCategories] = useState(null)

    const getAllCategories = useCallback(async () => {
        const result = await getCategories()
        setAllCategories([INITIAL_TEXT, ...result.categories])
    }, [])

    useEffect(() => {
        getAllCategories()
    }, [getAllCategories])

    if(!allCategories) {
        return <></>
    }

    return(
        <>
            <CategoriesInput
                handleAdd={handleAdd}
                handleRemove={handleRemove}
                addedCategories={addedCategories}
                allCategories={allCategories}
            />
        </>
    )
}

export default CategoriesInputWrapper