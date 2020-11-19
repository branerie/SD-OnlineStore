import React from 'react'
import styles from './index.module.css'

const ImageCard = ({ src, dispatch }) => {
    const handleRemove = (event) => {
        event.preventDefault()

        const parentDivElement = event.target.parentElement
        const imgElement = parentDivElement.getElementsByTagName('img')[0]
        const fileSrc = imgElement.attributes['src'].value

        dispatch(fileSrc)
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