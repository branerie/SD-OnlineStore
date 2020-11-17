import React, { useEffect, useReducer, useState } from 'react'
import styles from './index.module.css'
import UploadButton from '../uploadButton'
import ImageCard from '../imageCard'

const DragAndDrop = () => {
    const dropState = {
        inDropZone: false,
        fileList: []
    }

    let widget = null

    const [data, dispatch] = useReducer(reducer, dropState)

    function reducer (state, action) {
        switch (action.type) {
            case 'addToDropZone':
                return { ...state, inDropZone: action.inDropZone }
            case 'addToList':
                return {
                    ...state,
                    fileList: state.fileList.concat(action.files),
                }
            case 'removeFromList':
                return {
                    ...state,
                    fileList: state.fileList.filter(f => f.preview !== action.fileToRemove)
                }
            case 'reset':
                return {
                    inDropZone: false,
                    fileList: []
                }
            default:
                return state
        }
    }

    useEffect(() => {
        const widgetScript = document.createElement('script')
        widgetScript.src = 'https://widget.cloudinary.com/v2.0/global/all.js'
        widgetScript.type = 'text/javascript'

        const htmlHead = document.getElementsByTagName('head')[0]
        htmlHead.appendChild(widgetScript)

        const { cloudinary } = window
        widget = cloudinary.createUploadWidget({
            cloudName: 'drk3sslgq', 
            uploadPreset: 'ww2burxt'}, (error, result) => { 
              if (!error && result && result.event === "success") { 
                console.log('Done! Here is the image info: ', result.info); 
              }
            }
          )
    }, [])

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

    const handleImageSave = () => {
        const cloudinary = window.cloudinary
        console.log(cloudinary)
    }

    const showWidget = () => {
        widget.open()
    }

    return (
        <div
            className={styles.container}
            onDrop={(event) => handleDrop(event)}
            onDragOver={(event) => handleDragOver(event)}
            onDragEnter={(event) => handleDragEnter(event)}
        >
            {/* {
            data.fileList.length === 0
                ? (<p className={styles.placeholder}>Drag your images here</p>)
                : (
                <>
                    <div className={styles['upload-list']}>
                        {data.fileList.map((file) => {
                            return (
                                <ImageCard name={file.name} preview={file.preview} dispatch={dispatch} />
                            )
                        })}
                    </div>
                    <button onClick={handleImageSave}>Upload</button>     
                </>         
                )}
            <UploadButton dispatch={dispatch} buttonText="Browse..." /> */}
            <button onClick={showWidget} >Upload Images</button>
        </div>
    )
}

export default DragAndDrop