import React from 'react'
import styles from './index.module.css'
import ratingStarEmpty from '../../images/ratingStarEmpty.svg'
import ratingStarFill from '../../images/ratingStarFill.svg'

const RatingStars = () => {

    //TODO rating
    
    return (
        <div className={styles.container}>
            <img src={ratingStarFill} alt={'Rating star'} className={styles['rating-star']} />
            <img src={ratingStarFill} alt={'Rating star'} className={styles['rating-star']} />
            <img src={ratingStarFill} alt={'Rating star'} className={styles['rating-star']} />
            <img src={ratingStarEmpty} alt={'Rating star'} className={styles['rating-star']} />
            <img src={ratingStarEmpty} alt={'Rating star'} className={styles['rating-star']} />
        </div>
    )
}

export default RatingStars