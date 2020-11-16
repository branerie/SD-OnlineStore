import React, { useEffect } from 'react'
import styles from './index.module.css'
import UploadButton from '../uploadButton'

const DragAndDrop = (props) => {
    const { data, dispatch } = props

    const handleDragEnter = (event) => {
        event.preventDefault()
        dispatch({ type: 'addToDropZone', inDropZone: true })
    }

    const handleDragOver = (event) => {
        event.preventDefault()
        event.dataTransfer.dropEffect = 'copy'

        dispatch({ type: 'addToDropZone', inDropZone: true })
    }

    const handleDrop = (event) => {
        event.preventDefault()
        let files = [...event.dataTransfer.files]

        files.forEach((file) => {
            file.preview = URL.createObjectURL(file)
        })

        if (files) {
            dispatch({ type: 'addToList', files })
            dispatch({ type: 'addToDropZone', inDropZone: false })
        }
    }

    const handleRemove = (event) => {
        event.preventDefault()

        const parentDivElement = event.target.parentElement
        const imgElement = parentDivElement.getElementsByTagName('img')[0]
        const fileSrc = imgElement.attributes['src'].value

        dispatch({ type: 'removeFromList', fileToRemove: fileSrc })
    }

    return (
        <div
            class={styles.container}
            onDrop={(event) => handleDrop(event)}
            onDragOver={(event) => handleDragOver(event)}
            onDragEnter={(event) => handleDragEnter(event)}
        >
            {
            data.fileList.length === 0
                ? (<p className={styles.placeholder}>Drag your files here</p>)
                : (<div>
                {data.fileList.map((file) => {
                    return (
                        <div key={file.name} className={styles['image-card']}>
                            <button
                                type="button"
                                className={styles['remove-btn']}
                                onClick={handleRemove}>x</button>
                            <span key={file.name}>
                                <img
                                    src={file.preview}
                                    alt=""
                                    className={styles.image}
                                />
                            </span>
                        </div>
                    )
                })}                
            </div>)
            }
            <UploadButton dispatch={dispatch} buttonText="Browse..." />
        </div>
    )
}

export default DragAndDrop