import React, { useReducer } from 'react'
import styles from './index.module.css'
import UploadButton from '../uploadButton'
import ImageCards from '../imageCards'

const DragAndDrop = ({ imageCards, handleImageRemove, handleImageAdd }) => {

    const handleDragEnter = (event) => {
        event.preventDefault()
    }

    const handleDragOver = (event) => {
        event.preventDefault()
        event.dataTransfer.dropEffect = 'copy'
    }

    const handleDrop = (event) => {
        event.preventDefault()
        let files = [...event.dataTransfer.files]

        files.forEach(file => {
            handleImageAdd({ file, url: URL.createObjectURL(file)})
        })
    }

    return (
        <div
            className={styles.container}
            onDrop={(event) => handleDrop(event)}
            onDragOver={(event) => handleDragOver(event)}
            onDragEnter={(event) => handleDragEnter(event)}
        >
            {
            imageCards.length === 0
                ? (<p className={styles.placeholder}>Drag your images here</p>)
                : (
                <>
                    <div className={styles['upload-list']}>
                        <ImageCards
                            imageCards={imageCards}
                            handleImageRemove={handleImageRemove} />
                    </div> 
                </>         
                )}
        </div>
    )
}

export default DragAndDrop