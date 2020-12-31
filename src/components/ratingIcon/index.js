import React, { useMemo } from 'react'
import StarIcon from '../starIcon'
import styles from './index.module.css'

const FILL_STAR = "#ef696e"
const EMPTY_STAR = 'none'

const RatingIcon = (props) => {
    const {
        indexOfStar,
        onHover,
        onMouseEnter,
        onMouseLeave,
        onSave,
        ratingStars
    } = props

    const fill = useMemo(() => {
        if (onHover >= indexOfStar) {
            return FILL_STAR
        } else if (!onHover && ratingStars >=indexOfStar) {
            return FILL_STAR
        }

        return EMPTY_STAR
    },[indexOfStar, ratingStars , onHover])

    return (
        <div className={styles.container}
            onClick={() => onSave(indexOfStar)}
            onMouseEnter={() => onMouseEnter(indexOfStar)}
            onMouseLeave={() => onMouseLeave()}
        >
            <StarIcon fill={fill} />            
        </div>
    )
}

export default RatingIcon