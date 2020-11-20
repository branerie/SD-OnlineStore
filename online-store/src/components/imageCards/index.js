import React from 'react'
import styles from './index.module.css'

import ImageCard from '../imageCard'

const ImageCards = ({ imageCards, handleImageRemove }) => {
    const containsImages = imageCards && imageCards.length > 0

    return (
        <div className={styles.container}>
            {
                containsImages
                    ? (<div className={styles['card-container']}>
                        {imageCards.map(imageUrl => {
                            return <ImageCard
                                        key={imageUrl}
                                        src={imageUrl}
                                        handleImageRemove={() => handleImageRemove(imageUrl)} />
                        })}
                    </div>)
                    : <div>No images available</div>
            }
        </div>
    )
}

export default ImageCards