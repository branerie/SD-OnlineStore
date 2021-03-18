import React, { useContext, useState } from 'react'
import styles from './index.module.css'

import StarIcon from '../StarIcon'
import ProductsContext from '../../contexts/ProductsContext'

const RATING_STARS_LIMIT = [6, 5, 4, 3, 2, 1]
const STAR_NUMBERS = [1, 2, 3, 4, 5]
const FILL_STAR = "#ef696e"
const EMPTY_STAR = 'none'

const ProductsRatingFilters = ({ propName }) => {
    const { filters, filtersDispatch } = useContext(ProductsContext)
    const [currValues, setCurrValues] = useState(fillInitialFilters())

    const handleChange = (event) => {
        const propValue = Number(event.target.value)
        const isChecked = event.target.checked

        const newValues = isChecked
            ? [...currValues, propValue]
            : currValues.filter(v => v !== propValue)

        filtersDispatch({ type: 'cat', propName: propName, values: newValues })
        setCurrValues(newValues)
    }

    function fillInitialFilters() {
        const propValues = filters.cat[propName]
        if (propValues) {
            return propValues.map(Number)
        }

        return []
    }

    return (
        <div className={styles['check-box']}> {
            RATING_STARS_LIMIT.map(ratingStarLimit => {
                const ratingStar = ratingStarLimit - 1

                return (
                    <label className={styles.container} key={`rating-${ratingStar}`}>
                        {STAR_NUMBERS.map(starNumber => {
                            const shouldFill = starNumber < ratingStarLimit

                            return shouldFill
                                ? <StarIcon fill={FILL_STAR} key={starNumber} />
                                : <StarIcon fill={EMPTY_STAR} key={starNumber} />
                        })}
                        <input
                            type='checkbox'
                            value={ratingStar}
                            name={`rating-${ratingStar}`}
                            checked={currValues.includes(ratingStar)}
                            onChange={handleChange}
                            data-testid={`rating-${ratingStar}`}
                        />
                        <span className={styles.checkmark}></span>
                    </label>
                )
            })
        }</div>
    )
}

export default ProductsRatingFilters