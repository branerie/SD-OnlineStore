import React from 'react'
import styles from './index.module.css'

const ImageCard = ({ name, preview, dispatch }) => {
    const handleRemove = (event) => {
        event.preventDefault()

        const parentDivElement = event.target.parentElement
        const imgElement = parentDivElement.getElementsByTagName('img')[0]
        const fileSrc = imgElement.attributes['src'].value

        dispatch({ type: 'removeFromList', fileToRemove: fileSrc })
    }

    return (
        <div key={name} className={styles['image-card']}>
            <button
                type="button"
                className={styles['remove-btn']}
                onClick={handleRemove}>x</button>
            <span key={name}>
                <img
                    src={preview}
                    alt=""
                    className={styles.image}
                />
            </span>
        </div>
    )
}

export default ImageCard