import React from 'react'
import styles from './index.module.css'

const ImageCard = ({ src, handleImageRemove }) => {
    const handleRemove = (event) => {
        event.preventDefault()

        handleImageRemove()
    }

    return (
        <div key={src} className={styles['image-card']}>
            <button
                type="button"
                className={styles['remove-btn']}
                onClick={handleRemove}
            >
                x
            </button>
            <img
                src={src}
                alt=""
                className={styles.image}
            />
        </div>
    )
}

export default ImageCard