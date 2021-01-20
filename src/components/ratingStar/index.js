import React, { useContext, useState } from 'react'
import styles from './index.module.css'
import ErrorContext from '../../ErrorContext'
import RatingIcon from '../ratingIcon'
import { setRating } from '../../services/product'

const NUM_INDEX_STARS = [1, 2, 3, 4, 5]

const RatingStars = (props) => {
    const [ratingStars, setRatingStars] = useState(props.ratingStars)
    const [onHover, setOnHover] = useState(0)
    const [ratingCounter, setRatingCounter] = useState(props.ratingCounter)
    const { addMessage } = useContext(ErrorContext)
    const productId = props.productId

    const onMouseEnter = (indexOfStar) => {
        setOnHover(indexOfStar)
    }

    const onMouseLeave = () => {
        setOnHover(0)
    }

    const onSave = async (indexOfStar) => {
        const response = await setRating(indexOfStar, productId)
       
        if(response.error) {
            addMessage(
                'Set Product Rating', 
                'Something went wrong when trying to rate product. We apologize for the inconvenience!'
            )

            return
        }

        setRatingCounter(response.counter)
        setRatingStars(response.currentRating)
    }

    return (
        <div className={styles.container}>
            <div className={styles['star-container']}  >
                {NUM_INDEX_STARS.map(indexOfStar => {
                    return (
                        <RatingIcon 
                            key={indexOfStar}
                            indexOfStar={indexOfStar}
                            onHover={onHover}
                            onMouseEnter={onMouseEnter}
                            onMouseLeave={onMouseLeave}
                            onSave={onSave}
                            ratingStars={ratingStars}
                        />
                    )
                })}
            </div>
            <div className={styles.counter} data-testid='counter'>
                ({ratingCounter})
            </div>
        </div>
    )
}

export default RatingStars